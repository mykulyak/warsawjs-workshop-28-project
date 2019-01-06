import AppShell from './AppShell';

if ('serviceWorker' in navigator) {
  global.addEventListener('load', () => {
    navigator.serviceWorker.register('/assets/sw.js');
  });
}

const rootEl = global.document.querySelector('body');
const app = new AppShell(rootEl);
app.start();
