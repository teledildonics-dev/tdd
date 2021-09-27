export const sleep = async (ms) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};
export const addTimeout = async (value, timeout, error = new TimeoutError(`Timed out (${timeout} ms)`)) => {
  return Promise.race([
    value,
    sleep(timeout).then(() => Promise.reject(error))
  ]);
};
export class TimeoutError extends Error {
}
export class Resolver {
  constructor(promise = new Promise((resolve, reject) => {
    this.resolve_ = resolve;
    this.reject_ = reject;
  })) {
    this.promise = promise;
    this.settled_ = false;
    this.resolve_ = void 0;
    this.reject_ = void 0;
    this.then((_value) => {
      this.settled_ = "resolved";
    }, (_error) => {
      this.settled_ = "rejected";
    });
  }
  then(onfulfilled, onrejected) {
    return this.promise.then(onfulfilled, onrejected);
  }
  get settled() {
    return this.settled_;
  }
  get resolve() {
    return this.resolve_;
  }
  get reject() {
    return this.reject_;
  }
  readonly() {
    return this;
  }
}
