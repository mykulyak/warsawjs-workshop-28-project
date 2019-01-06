import { html, render } from 'lit-html';

import View from '../shared/View';
import style from './ProjectList.scss';

const template = () => html`
  <div class="${style.self}">
    Project List
  </div>
`;

export default class ProjectList extends View {
  render() {
    render(template(), this.element);
  }
}
