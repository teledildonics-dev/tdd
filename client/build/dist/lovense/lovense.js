import {
  assert,
  first,
  Lock,
  only,
  unwrap
} from "../common/safety.js";
import utf8 from "../common/utf8.js";
import {withEventStream} from "../common/events.js";
import {addTimeout, sleep} from "../common/async.js";
import {
  modelCapabilities,
  modelsById
} from "./models.js";
export default class Lovense {
  constructor(device) {
    this.lock = new Lock();
    this.destroyed = null;
    this.connectionCount = 0;
    this.service = void 0;
    this.characteristics = void 0;
    this.transmitter = void 0;
    this.receiver = void 0;
    this.callTimeout = 4e3;
    this.eventTarget = document.createElement("teledildonics-EventTarget");
    this.cachedInfo = void 0;
    this.device = device;
    this.server = unwrap(device.gatt, "Bluetooth device did not support GATT");
    this.connected = void 0;
  }
  deviceName() {
    return this.device.name || this.device.id;
  }
  logPrefix() {
    return `${this.deviceName().slice(0, 10).padStart(10)}:`;
  }
  addEventListener(type, listener) {
    return this.eventTarget.addEventListener(type, listener);
  }
  removeEventListener(type, listener) {
    return this.removeEventListener(type, listener);
  }
  async connect() {
    if (this.destroyed) {
      throw await this.destroyed;
    }
    if (this.connected) {
      return this.connected;
    }
    console.info(this.logPrefix(), "Connecting.");
    this.connectionCount += 1;
    this.connected = addTimeout((async () => {
      await this.server.connect();
      if (this.destroyed) {
        throw await this.destroyed;
      }
      const onMessage = (event) => {
        assert(event && event.target && event.target.value instanceof DataView);
        const binary = event.target.value;
        const s = utf8.decode(binary);
        console.info(`${this.logPrefix()} got  %c${s}`, "color: #131; font-weight: bold; border: 1px solid #131; padding: 2px 6px; background: #EEE;");
      };
      const onDisconnected = () => {
        console.info(this.logPrefix(), "Disconnected.");
        this.connected = void 0;
        this.device.removeEventListener("gattserverdisconnected", onDisconnected);
        if (this.receiver) {
          this.receiver.removeEventListener("characteristicvaluechanged", onMessage);
        }
        this.eventTarget.dispatchEvent(new Event("disconnect"));
      };
      this.device.addEventListener("gattserverdisconnected", onDisconnected);
      this.service = only(await this.server.getPrimaryServices());
      this.characteristics = await this.service.getCharacteristics();
      this.transmitter = only(this.characteristics.filter((c) => c.properties.write));
      this.receiver = only(this.characteristics.filter((c) => !c.properties.write));
      this.receiver.addEventListener("characteristicvaluechanged", onMessage);
      await this.receiver.startNotifications();
      this.eventTarget.dispatchEvent(new Event("connect"));
      if (this.destroyed) {
        throw await this.destroyed;
      }
    })(), 6e3, new Error("Initial connection to Lovense timed out"));
    this.connected.catch(() => {
      this.connected = void 0;
    });
    return this.connected;
  }
  async disconnect() {
    if (this.connected) {
      try {
        await this.connected;
      } catch (error) {
        return;
      }
    }
    console.info(this.logPrefix(), "Disconnecting");
    await this.server.disconnect();
  }
  async connectAndRetry(f) {
    while (true) {
      while (true) {
        if (this.destroyed) {
          throw await this.destroyed;
        }
        try {
          await this.connect();
          break;
        } catch (error) {
          console.error(this.logPrefix(), "Failed to connect", error);
          await sleep(500);
          continue;
        }
      }
      const connectionCount = this.connectionCount;
      try {
        return f();
      } catch (error) {
        if (this.connected === void 0 || this.connectionCount > connectionCount) {
          console.warn(this.logPrefix(), "disconnected then", error, "was thrown. Retrying in 1s.");
          await sleep(500);
          await this.connect();
          continue;
        } else {
          console.error(this.logPrefix(), "didn't disconnnect but command still failed. Retrying in 10s.", error);
          await sleep(1e4);
          continue;
        }
      }
    }
  }
  async destroy(error = new Error("Lovense::destroy()ed")) {
    if (!this.destroyed) {
      this.destroyed = (async () => {
        try {
          try {
            await this.lock.use(async () => {
              throw new Error("Lovense instance destroyed");
            });
          } catch (_) {
          }
          await this.disconnect();
          this.device = null;
          this.server = null;
          this.transmitter = null;
          this.receiver = null;
        } finally {
          return error;
        }
      })();
    }
    return this.destroyed;
  }
  async call(request, handler, timeout = this.callTimeout) {
    if (this.destroyed) {
      throw await this.destroyed;
    }
    if (handler === void 0) {
      console.warn(this.logPrefix(), "call() handler was null");
      handler = async () => {
      };
    }
    return this.lock.use(async () => this.connectAndRetry(() => {
      let result = withEventStream(this.receiver, "characteristicvaluechanged", (event) => {
        assert(event && event.target && event.target.value instanceof DataView);
        const binary = event.target.value;
        return utf8.decode(binary);
      }, async (responses) => {
        console.info(`${this.logPrefix()} sent %c${request}`, "color: purple; font-weight: bold; border: 1px solid purple; padding: 2px 6px; background: #EEE;");
        await this.transmitter.writeValue(utf8.encode(request));
        return await handler(responses);
      });
      if (timeout !== void 0) {
        result = addTimeout(result, timeout);
      }
      return result;
    }));
  }
  async info() {
    if (this.cachedInfo) {
      return this.cachedInfo;
    }
    return this.call("DeviceType;", async (responses) => {
      const {value} = await responses.read();
      const [id, firmware, serial] = value.slice(0, -1).split(":");
      const model = unwrap(modelsById.get(id));
      const capabilities = unwrap(modelCapabilities.get(model));
      this.cachedInfo = {
        id,
        model,
        firmware: Number(firmware),
        capabilities,
        serial
      };
      return this.cachedInfo;
    });
  }
  async battery() {
    const value = await this.call("Battery;", async (responses) => {
      const {value: value2} = await responses.read();
      return value2;
    });
    let body = unwrap(first(value.split(";")));
    if (body[0] === "s") {
      console.warn(this.logPrefix(), "Got `s` prefix in battery value. Not sure why this happens.");
      body = body.slice(1);
    }
    const level = Number(body);
    if (!(Number.isSafeInteger(level) && 0 <= level && level <= 100)) {
      throw new Error("Battery should be integer from 0-100.");
    }
    return level / 100;
  }
  async batch() {
    return this.call("GetBatch;", async (responses) => {
      const {value} = await responses.read();
      return Number(unwrap(first(value.split(/[;,]/))));
    });
  }
  async vibrate(power) {
    if (!(0 <= power && power <= 1)) {
      throw new Error("Power must be from 0.0-1.0.");
    }
    const level = Math.round(power * 20);
    if (!(Number.isSafeInteger(level) && 0 <= level && level <= 20)) {
      throw new Error("Level must be integer from 0-20.");
    }
    return this.call(`Vibrate:${level};`, async (responses) => {
      const {value} = await responses.read();
      assert(value === "OK;", "Unexpected response to Vibrate command.");
    });
  }
  async rotate(power) {
    if (!(-1 <= power && power <= 1)) {
      throw new Error("Power must be from -1.0 to +1.0.");
    }
    let command;
    if (power > 0) {
      command = "Rotate:True";
    } else if (power < 0) {
      command = "Rotate:False";
    } else {
      command = "Rotate";
    }
    const level = Math.round(Math.abs(power * 20));
    if (!(Number.isSafeInteger(level) && 0 <= level && level <= 20)) {
      throw new Error("Level must be integer from 0-20.");
    }
    return this.call(`${command}:${level};`, async (responses) => {
      const {value} = await responses.read();
      assert(value === "OK;", "Unexpected response to Rotate command.");
    });
  }
  async getPattern(index) {
    return this.call(`GetPatten:${index};`, async (responses) => {
      const powers = [];
      while (true) {
        const {value} = await responses.read();
        if (value === "ER;") {
          throw new Error("Got Error response from device.");
        }
        assert(/^P[0-9]:[0-9]{1,2}\/[0-9]{1,2}:[0-9]+;$/.test(value), "Unexpected response to GetPatten:#");
        const body = unwrap(first(value.split(";")));
        const [tag, part, levels] = body.split(/:/g);
        assert(tag === `P${index}`, "Got pattern response for wrong index!");
        const [partIndex, partCount] = part.split("/");
        powers.push(...[...levels].map((digit) => Number(digit) / 9));
        if (partIndex === partCount) {
          break;
        }
      }
      return powers;
    }, this.callTimeout * 10);
  }
  async patterns() {
    const response = await this.call(`GetPatten;`, async (responses) => {
      const {value} = await responses.read();
      return value;
    });
    assert(/^P:0?1?2?3?4?5?6?7?8?9?;$/.test(response), "Unexpected response to GetPatten");
    const indices = unwrap(first(response.slice(2).split(";")));
    const patterns = [];
    for (const index of indices) {
      patterns.push(await this.getPattern(Number(index)));
    }
    return patterns;
  }
  async startPattern(index) {
    return this.call(`Preset:${index};`, async (responses) => {
      const {value} = await responses.read();
      assert(value === "OK;", "Unexpected response to preset command.");
    });
  }
  async stop() {
    const {capabilities} = await this.info();
    if (capabilities.vibration) {
      await this.vibrate(0);
    }
    if (capabilities.rotation) {
      await this.rotate(0);
    }
  }
}
export const deviceProfile = {
  filters: [{namePrefix: "LVS-"}],
  optionalServices: [
    "0000fff0-0000-1000-8000-00805f9b34fb",
    "6e400001-b5a3-f393-e0a9-e50e24dcca9e",
    ...[..."45"].map((a) => [..."0123456789abcdef"].map((b) => [..."34"].map((c) => `${a}${b}300001-002${c}-4bd4-bbd5-a6920e4c5653`))).flat(3)
  ]
};
