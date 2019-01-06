import { html, render } from 'lit-html';

import View from '../shared/View';
import style from './Settings.scss';

const template = () => html`
  <div class="${style.self}">
    Settings
  </div>
`;

export default class Settings extends View {
  render() {
    render(template(), this.element);
  }
}
