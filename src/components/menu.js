
import Utils from "../utils.js";
import {RenderPosition} from "../const.js";

const createMenuTemplate = () =>
  `<section class="control__btn-wrap">
    <input type="radio"
      name="control"
      id="control__new-task"
      class="control__input visually-hidden"/>
    <label for="control__new-task" class="control__label control__label--new-task"
      >+ ADD NEW TASK</label>
    <input
      type="radio"
      name="control"
      id="control__task"
      class="control__input visually-hidden"
      checked/>
    <label for="control__task" class="control__label">TASKS</label>
    <input type="radio"
      name="control"
      id="control__statistic"
      class="control__input visually-hidden"/>
    <label for="control__statistic" class="control__label">STATISTICS</label></section>`;

export default class Menu {
  constructor() {
    this._element = null;
    this.init();
  }

  init() {
    if (!this._element) {
      this._element = Utils.createElement(this.getTemplate());
    }
  }

  getTemplate() {
    return createMenuTemplate();
  }

  get Element() {
    return this._element;
  }

  render(container) {
    Utils.render(container, this._element, RenderPosition.BEFOREEND);
  }

  remove() {
    this._element = null;
  }
}

