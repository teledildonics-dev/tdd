import {Resolver} from "./async.js";
export class AsyncDisposable {
  constructor() {
    this.disposeStarter = new Resolver();
    this.diposeStarted = this.disposeStarter.readonly();
    this.disposeCompleter = new Resolver();
    this.diposeCompleted = this.disposeCompleter.readonly();
  }
  throwIfDisposeStarted() {
    if (this.diposeStarted.settled) {
      throw new DisposedError(this, `dispose() already called on ${this}`);
    }
  }
  throwIfDisposeComplete() {
    if (this.diposeCompleted.settled) {
      throw new DisposedError(this, `dispose() already completed on ${this}`);
    }
  }
  async dispose() {
    this.throwIfDisposeStarted();
    this.disposeStarter.resolve();
    if (this.disposal) {
      return this.disposal;
    }
    try {
      await this.onDispose();
    } finally {
      this.disposeCompleter.resolve();
    }
  }
  async onDispose() {
  }
}
export class DisposedError extends Error {
  constructor(instance, message = `${instance} already disposed`) {
    super(message);
    this.instance = instance;
  }
}
