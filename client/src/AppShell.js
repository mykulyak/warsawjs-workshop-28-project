import { html, render } from 'lit-html';
import 'material-design-lite';

import History from './lib/history';
import Store from './lib/store';

import Login from './views/Login';
import Home from './views/Home';
import ProjectList from './views/ProjectList';
import Project from './views/Project';
import Task from './views/Task';
import Settings from './views/Settings';

import './AppShell.scss';

const template = () => html`
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <div class="mdl-layout-title">PWA Todoist</div>
        <div class="mdl-layout-spacer"></div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
          <label class="mdl-button mdl-js-button mdl-button--icon" for="fixed-header-drawer-exp">
            <i class="material-icons">search</i>
          </label>
          <div class="mdl-textfield__expandable-holder">
            <input class="mdl-textfield__input" type="text" name="sample" id="fixed-header-drawer-exp">
          </div>
        </div>
      </div>
    </header>
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">PWA Todoist</span>
      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" href="/">Home</a>
        <a class="mdl-navigation__link" href="/projects">Projects</a>
        <a class="mdl-navigation__link" href="/settings">Settings</a>
      </nav>
    </div>
    <main class="mdl-layout__content">
      <div id="content" class="page-content"></div>
    </main>
  </div>
`;

const routes = [
  { url: /^\/login$/, view: Login },
  { url: /^\/$/, view: Home },
  { url: /^\/projects$/, view: ProjectList },
  { url: /^\/projects\/(.+)$/, view: Project },
  { url: /^\/tasks\/(.+)$/, view: Task },
  { url: /^\/settings$/, view: Settings },
];

const history = new History();
const store = new Store();

export default class AppShell {
  constructor(rootEl) {
    this.rootEl = rootEl;
    this.viewClass = Home;
    history.addListener(this.handleHistoryChange);
    store.addListener(this.handleStoreChange);
  }

  handleStoreChange = () => {
    global.console.log(this);
  };

  handleHistoryChange = ({ location, state }) => {
    global.console.warn({ location, state });
    const { pathname } = location;
    const route = routes.find(({ url }) => pathname.match(url));
    if (route) {
      if (this.view) {
        this.view.dispose();
      }
      this.viewClass = route.view;
      const ViewClass = this.viewClass;
      this.view = new ViewClass(this.contentEl);
      this.view.render();
    }
  };

  handleToggleDrawer = (event) => {
    global.console.warn(event, this);
  };

  start() {
    render(template({ onClick: this.handleToggleDrawer }), this.rootEl);

    const linkEls = this.rootEl.querySelectorAll('a');
    linkEls.forEach(((linkEl) => {
      linkEl.addEventListener('click', (event) => {
        event.preventDefault();
        history.push(event.target.href);
      });
    }));

    this.contentEl = this.rootEl.querySelector('#content');
    const ViewClass = this.viewClass;
    this.view = new ViewClass(this.contentEl);
    this.view.render();
  }
}
