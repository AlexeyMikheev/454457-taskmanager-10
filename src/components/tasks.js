import AbstractComponent from './abstract-component.js';

const getTasksTemplate = () => `<div class="board__tasks"></div>`;

export default class Tasks extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return getTasksTemplate();
  }
}
