import Utils from '../utils.js';
import {RenderPosition} from "../const.js";

const createSortTemplate = () => {
  return (
    `<div class="board__filter-list">
      <a href="#" class="board__filter">SORT BY DEFAULT</a>
      <a href="#" class="board__filter">SORT BY DATE up</a>
      <a href="#" class="board__filter">SORT BY DATE down</a>
    </div>`
  );
};

export default class Sort {
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
    return createSortTemplate();
  }

  get Element() {
    return this._element;
  }


  render(container) {
    Utils.render(container, this._element, RenderPosition.AFTERBEGIN);
  }

  remove() {
    this._element = null;
  }
}
