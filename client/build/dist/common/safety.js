export function assert(condition, message = "assertion failed") {
  if (condition === false || condition === null || condition === void 0) {
    throw new Error(message);
  }
  return true;
}
export const unwrap = (value, message = "unwrapped void value") => {
  if (value === void 0) {
    throw new Error(message);
  }
  return value;
};
export const first = (values) => {
  return values[0];
};
export const only = (values) => {
  assert(values.length === 1, "expected array to only have one value");
  return values[0];
};
export const throwIf = (error) => {
  if (error) {
    throw error;
  }
};
export class Lock {
  constructor() {
    this.tail = Promise.resolve();
    this.destruction = null;
  }
  async use(callback) {
    const result = this.tail.then(() => callback());
    this.tail = this.tail.then(() => result.catch(() => {
    }));
    return result;
  }
  async destroy() {
    if (!this.destruction) {
      this.destruction = new Promise(async (resolve) => {
        try {
          await this.tail;
        } catch (error) {
          return resolve(error);
        }
        return resolve(new Error("Lock destroyed"));
      });
    }
    return this.destruction;
  }
}
export const freeze = Object.freeze;
export const unreachable = () => {
  throw new UnreachableError(`this "can't" happen`);
};
export class UnreachableError extends Error {
}
