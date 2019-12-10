import AbstractComponent from './abstract-component.js';

export const getNoTasksTemplate = () => `<p class="board__no-tasks">Click «ADD NEW TASK» in menu to create your first task</p>`;

export default class NoFilms extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return getNoTasksTemplate();
  }
}
