import { html, render } from 'lit-html';

import View from '../shared/View';
import style from './Project.scss';

const template = () => html`
  <div class="${style.self}">
    Project
  </div>
`;

export default class Project extends View {
  render() {
    render(template(), this.element);
  }
}
