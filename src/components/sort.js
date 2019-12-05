import Utils from '../utils.js';

const getTemplate = () => {
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
  }

  getElement() {
    if (!this._element) {
      this._element = Utils.createElement(getTemplate());
    }
    return this._element;
  }

  remove() {
    this._element = null;
  }
}
