import Utils from '../utils.js';

export default class AbstractComponent {
  constructor(container) {
    this._container = container;

    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }
    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement(withOutReplace = false) {
    if (withOutReplace) {
      return Utils.createElement(this.getTemplate());
    }

    if (!this._element) {
      this._element = Utils.createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element.remove();
    this._element = null;
  }
}
