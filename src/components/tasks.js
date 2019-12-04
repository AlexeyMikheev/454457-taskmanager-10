import {RenderPosition} from '../const.js';

import Utils from "../utils.js";
import Task from "./task.js";

const createTasksContainerTemplate = () => `<section class="board container"></section>`;

const createTasksTemplate = () => `<div class="board__tasks"></div>`;

export default class Tasks {
  constructor(tasks, parentContainer) {
    this._element = null;
    this._tasksComponents = null;
    this._tasks = tasks;
    this._parentContainer = parentContainer;

    this.init();
  }

  static renderContainer(container) {
    if (!this._tasksContainer) {
      this._tasksContainer = Utils.createElement(createTasksContainerTemplate());
    }
    Utils.render(container, this._tasksContainer);
  }

  static get TasksContainer() {
    return this._tasksContainer;
  }

  static createInstance(tasks) {
    return new this(tasks, this._tasksContainer);
  }

  init() {
    this.initElement();
    this.initComponets();
  }

  initElement() {
    if (!this._element) {
      this._element = Utils.createElement(this.getTemplate());
    }
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
      this._element.appendChild(component.Element);
    });
  }

  clearComponents() {
    this._tasksComponents.forEach((component) => {
      component.remove();
    });

    this._tasksComponents = null;
  }


  getTemplate() {
    return createTasksTemplate();
  }

  get Element() {
    return this._element;
  }

  render() {
    Utils.render(this._parentContainer, this._element, RenderPosition.BEFOREEND);
  }

  remove() {
    this._element = null;
    this._tasksContainer = null;
    this.clearComponents();
  }
}
