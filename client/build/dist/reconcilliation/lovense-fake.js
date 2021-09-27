import {Lovense} from "./lovense-abstract.js";
import {Nora} from "../lovense/models.js";
import {sleep} from "../common/async.js";
export class LovenseFake extends Lovense {
  constructor() {
    super(...arguments);
    this.vibration = 0;
    this.rotation = 0;
  }
  async info_() {
    return {
      model: Nora,
      id: "191109" + performance.now().toString(16).slice(6)
    };
  }
  async setVibration_(vibration) {
    await sleep(250);
    this.vibration = vibration;
    return vibration;
  }
  async setRotation_(rotation) {
    await sleep(250);
    this.rotation = rotation;
    return rotation;
  }
}
