import { html, render } from 'lit-html';

import View from '../shared/View';
import style from './Login.scss';

const template = () => html`
  <div class="${style.self}">
    Login
  </div>
`;

export default class Login extends View {
  render() {
    render(template(), this.element);
  }
}
