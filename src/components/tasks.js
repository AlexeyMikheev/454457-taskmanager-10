import Task from "./task.js";
import AbstractComponent from './abstract-component.js';

const getTasksTemplate = () => `<div class="board__tasks"></div>`;

export default class Tasks extends AbstractComponent {
  constructor(tasks) {
    super();
    this._tasksComponents = null;
    this._tasks = tasks;
  }

  getTemplate() {
    return getTasksTemplate();
  }

  set tasks(value) {
    this._tasks = value;
  }

  refreshComponents(cb) {
    this.clearComponents();
    this.initComponets(cb);
  }

  initComponets(cb) {
    this._tasksComponents = this._tasks.map((t) => {
      return new Task(t);
    });

    this._tasksComponents.forEach((component) => {
      this._element.appendChild(component.getElement());
      component.addClickEvent(cb);
    });
  }

  clearComponents() {
    this._tasksComponents.forEach((component) => {
      component.removeClickEvent();
      component.removeElement();
    });

    this._tasksComponents = null;
  }
}
