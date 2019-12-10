import AbstractComponent from './abstract-component.js';

const getContainerTemplate = () => `<section class="board container"></section>`;

export default class TasksContainer extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return getContainerTemplate();
  }
}
