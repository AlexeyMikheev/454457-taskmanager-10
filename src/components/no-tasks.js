import Utils from '../utils.js';

export const getNoTasksTemplate = () => `<p class="board__no-tasks">Click «ADD NEW TASK» in menu to create your first task</p>`;

export default class NoFilms {
  constructor() {
    this._element = null;
  }
  getElement() {
    if (!this._element) {
      this._element = Utils.createElement(this.getTemplate());
    }
    return this._element;
  }
  getTemplate() {
    return getNoTasksTemplate();
  }
  remove() {
    this._element = null;
  }
}
