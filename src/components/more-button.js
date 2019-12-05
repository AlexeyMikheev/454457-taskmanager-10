import Utils from '../utils.js';

const getTemplate = () => `<button class="load-more" type="button">load more</button>`;

export default class MoreButton {

  constructor() {
    this._element = null;
  }

  initClickEvent(cb) {
    this._element.addEventListener(`click`, () => {
      cb();
    });
  }

  getElement() {
    if (!this._element) {
      this._element = Utils.createElement(getTemplate());
    }
    return this._element;
  }

  remove() {
    this._element.remove();
    this._element = null;
  }
}
