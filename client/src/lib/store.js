export default class Store {
  constructor() {
    this.data = {};
    this.listeners = [];
  }

  addListener(listener) {
    const index = this.listeners.indexOf(listener);
    if (index < 0) {
      this.listeners.push(listener);
    }
  }

  removeListener(listener) {
    const index = this.listeners.indexOf(listener);
    if (index >= 0) {
      this.listeners.splice(index, 1);
    }
  }

  notifyAll(params) {
    this.listeners.forEach((listener) => {
      listener(params);
    });
  }
}
