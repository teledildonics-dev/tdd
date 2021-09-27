import {Nora} from "../lovense/models.js";
import {AsyncDisposable} from "../common/disposable.js";
export class Lovense extends AsyncDisposable {
  async info() {
    if (!this.cachedInfo) {
      this.cachedInfo = this.info_();
    }
    return this.cachedInfo;
  }
  async setVibration(vibration) {
    this.throwIfDisposeStarted();
    return this.setVibration_(vibration);
  }
  async canRotate() {
    const {model} = await this.info();
    return model === Nora;
  }
  async setRotation(rotation) {
    if (!await this.canRotate()) {
      throw new Error(`This device does not support rotation. Try .canRotate().`);
    }
    this.throwIfDisposeStarted();
    return this.setRotation_(rotation);
  }
  async stop() {
    this.throwIfDisposeStarted();
    return Promise.all([this.setVibration_(0), this.setRotation_(0)]);
  }
  async onDispose() {
    await Promise.all([this.setVibration_(0), this.setRotation_(0)]);
  }
}
export function isRotationLevel(n) {
  return Number.isFinite(n) && -20 <= n && n <= 20;
}
export function isVibrationLevel(n) {
  return Number.isFinite(n) && -20 <= n && n <= 20;
}
