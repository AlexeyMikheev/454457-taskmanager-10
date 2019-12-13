import AbstractComponent from './abstract-component.js';

export default class AbstractSmartComponent extends AbstractComponent {
  constructor(container) {
    super();
    this._container = container;
  }

  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();

    const newElement = this.getElement(true);

    this._container.replaceChild(newElement, oldElement);

    this._element = newElement;

    this.recoveryListeners();
  }
}
