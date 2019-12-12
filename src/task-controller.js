import Task from './components/task.js';
import TaskEdit from './components/task-edit.js';
import {TaskControllerMode} from './const.js';

export default class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._task = null;
    this._taskComponent = null;
    this._taskEditComponent = null;
    this._mode = TaskControllerMode.DEFAULT;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
  }

  render(task) {
    this._onCloseEdit = () => {
      if (this._taskEditComponent !== null && this._taskComponent !== null) {
        this._container.replaceChild(this._taskComponent.getElement(), this._taskEditComponent.getElement());
        this._taskEditComponent.removeElement();
        this._taskEditComponent = null;
      }
    };

    this._onShowEdit = () => {
      this._mode = TaskControllerMode.EDIT;

      this._onViewChange();

      this._taskEditComponent = new TaskEdit(this._task);
      this._container.replaceChild(this._taskEditComponent.getElement(), this._taskComponent.getElement());
      this._taskEditComponent.initSubmitEvent(this._onCloseEdit);
    };

    this._task = task;
    this._taskComponent = new Task(task);
    this._container.appendChild(this._taskComponent.getElement());
    this._taskComponent.addEditClickEvent(this._onShowEdit);
  }

  removeComponents() {
    this.removeEditComponent();
    this.removeTaskComponent();
  }

  removeTaskComponent() {
    if (this._taskComponent !== null) {
      this._taskComponent.removeElement();
      this._taskComponent = null;
    }
  }

  removeEditComponent() {
    if (this._taskEditComponent !== null) {
      this._taskEditComponent.removeElement();
      this._taskEditComponent = null;
    }
  }

  setDefaultView() {
    if (this._mode !== TaskControllerMode.DEFAULT) {
      this._onCloseEdit();
    }
  }
}
