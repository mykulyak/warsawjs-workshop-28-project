export default class History {
  constructor() {
    this.listeners = [];
    global.addEventListener('popstate', (event) => {
      this.notifyAll({
        location: global.document.location,
        state: event.state,
      });
    });
  }

  push(url, state = null) {
    global.history.pushState(state, null, url);
    this.notifyAll({
      location: global.document.location,
      state,
    });
  }

  replace(url, state = null) {
    global.history.replaceState(state, null, url);
    this.notifyAll({
      location: global.document.location,
      state,
    });
  }

  addListener(listener) {
    const index = this.listeners.indexOf(listener);
    if (index < 0) {
      this.listeners.push(listener);
    }
  }

  removeListener(listener) {
    const index = this.listener.indexOf(listener);
    if (index >= 0) {
      this.listeners.splice(index, 1);
    }
  }

  notifyAll(data) {
    this.listeners.forEach((listener) => {
      listener(data);
    });
  }
}
