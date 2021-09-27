import {LovenseFake} from "./lovense-fake.js";
export const superseded = "superseded";
export class LovenseDevice extends LovenseFake {
  constructor(device) {
    super();
    this.device = device;
  }
}
