import { html, render } from 'lit-html';

import View from '../shared/View';
import style from './Task.scss';

const template = () => html`
  <div class="${style.self}">
    Task
  </div>
`;

export default class Task extends View {
  render() {
    render(template(), this.element);
  }
}
