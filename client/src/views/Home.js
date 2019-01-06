import { html, render } from 'lit-html';

import * as api from '../api';
import View from '../shared/View';
import style from './Home.scss';

const projectTemplate = ({ id, name, taskCount }) => html`
  <div class=${style.card}>
    <div>${name}</div>
    <div>${taskCount}</div>
  </div>
`;

const template = ({ result }) => html`
  <div class="${style.self}">
    Home
    <div>
      ${result.map(p => projectTemplate(p))}
    </div>
  </div>
`;

export default class Home extends View {
  loading = null;

  data = null;

  loadData() {
    this.loading = api.readProjectList();
    return this.loading.then((result) => {
      this.data = result;
      render(template({ result }), this.element);
    }).finally(() => {
      this.loading = null;
    });
  }

  render() {
    this.loadData();
    // render(template(), this.element);
  }
}
