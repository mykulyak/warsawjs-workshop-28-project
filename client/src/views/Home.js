import { html, render } from 'lit-html';
import dialogPolyfill from 'dialog-polyfill/dialog-polyfill';

import * as api from '../api';
import View from '../shared/View';

import './Home.scss';

const projectTemplate = ({ id, name, taskCount }) => html`
  <div data-project-id="${id}" class="mdl-card mdl-shadow--2dp full-width">
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text">${name}</h2>
    </div>
    <div class="mdl-card__supporting-text">
      ${taskCount} tasks to do.
    </div>
    <div class="mdl-card__actions mdl-card--border full-width">
      <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
        Edit
      </a>
      <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
        Delete
      </a>
    </div>
  </div>
`;

const template = ({ result, onAddProject, onAccept, onCloseModal }) => html`
  <div class="home">
    <div>
      ${result.map(p => projectTemplate(p))}
    </div>
    <button @click=${onAddProject} class="add-project mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
      <i class="material-icons">add</i>
    </button>
    <dialog id="home-add-project-dialog" class="mdl-dialog">
      <h4 class="mdl-dialog__title">Add Project</h4>
      <div class="mdl-dialog__content">
        <form action="#">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" id="field-name">
            <label class="mdl-textfield__label" for="field-name">Project name</label>
          </div>
        </form>
      </div>
      <div class="mdl-dialog__actions">
        <button type="button" class="mdl-button" @click=${onAccept}>Create</button>
        <button type="button" class="mdl-button close" @click=${onCloseModal}>Cancel</button>
      </div>
    </dialog>
  </div>
`;

export default class Home extends View {
  loading = null;

  data = null;

  loadData() {
    this.loading = api.readProjectList();
    return this.loading.then((result) => {
      this.data = result;
      render(template({
        result,
        onAddProject: this.handleAddProject,
        onAccept: this.handleAccept,
        onCloseModal: this.handleCloseModal,
      }), this.element);
    }).finally(() => {
      this.loading = null;
    });
  }

  handleAddProject = () => {
    const dialogEl = this.element.querySelector('#home-add-project-dialog');
    if (!dialogEl.showModal) {
      dialogPolyfill.registerDialog(dialogEl);
    }
    dialogEl.showModal();
  };

  handleAccept = () => {
    const dialogEl = this.element.querySelector('#home-add-project-dialog');
    const fieldValue = dialogEl.querySelector('#field-name').value;
    if (fieldValue) {
      dialogEl.close();
    }
  };

  handleCloseModal = () => {
    const dialogEl = this.element.querySelector('#home-add-project-dialog');
    dialogEl.close();
  };

  render() {
    this.loadData();
    // render(template(), this.element);
  }
}
