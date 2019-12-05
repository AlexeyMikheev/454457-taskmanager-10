import Utils from "../utils.js";
import Task from "./task.js";

const getContainerTemplate = () => `<section class="board container"></section>`;

const getTemplate = () => `<div class="board__tasks"></div>`;

export default class Tasks {
  constructor(tasks, parentContainer) {
    this._element = null;
    this._tasksComponents = null;
    this._tasks = tasks;
    this._parentContainer = parentContainer;
  }

  static getTasksContainer() {
    if (!this._tasksContainer) {
      this._tasksContainer = Utils.createElement(getContainerTemplate());
    }
    return this._tasksContainer;
  }

  static createInstance(tasks) {
    return new this(tasks, this._tasksContainer);
  }

  addTasks(tasks) {
    this._tasks.push(...tasks);
    this.clearComponents();
    this.initComponets();
  }

  initComponets() {
    this._tasksComponents = this._tasks.map((t) => {
      return new Task(t);
    });

    this._tasksComponents.forEach((component) => {
      this._element.appendChild(component.getElement());
    });
  }

  clearComponents() {
    this._tasksComponents.forEach((component) => {
      component.remove();
    });

    this._tasksComponents = null;
  }

  getElement() {
    if (!this._element) {
      this._element = Utils.createElement(getTemplate());
    }
    return this._element;
  }

  remove() {
    this._element = null;
    this._tasksContainer = null;
    this.clearComponents();
  }
}
