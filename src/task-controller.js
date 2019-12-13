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

    this._onArchiveChange = (evt) => {
      const isArchive = !!evt.target.classList.contains(`card__btn--disabled`);
      this._onDataChange(this, this._task, Object.assign({}, this._task, {isArchive}));
    };

    this._onFavoriteChange = (evt) => {
      const isFavorite = !!evt.target.classList.contains(`card__btn--disabled`);
      this._onDataChange(this, this._task, Object.assign({}, this._task, {isFavorite}));
    };
  }

  render(task) {
    this._onCloseEdit = () => {
      if (this._taskEditComponent !== null && this._taskComponent !== null) {
        this._container.replaceChild(this._taskComponent.getElement(), this._taskEditComponent.getElement());
        this._taskEditComponent.removeElement();
        this._taskEditComponent = null;
      }
    };

    this._onFormSubmit = (newValue) =>{
      this._onCloseEdit();
      this._onDataChange(this, this._task, Object.assign({}, this._task, newValue));
    };

    this._onShowEdit = () => {
      this._mode = TaskControllerMode.EDIT;

      this._onViewChange();

      this._taskEditComponent = new TaskEdit(this._task, this._container);
      this._container.replaceChild(this._taskEditComponent.getElement(), this._taskComponent.getElement());
      this._taskEditComponent.initSubmitEvent(this._onFormSubmit);
    };

    this._task = task;
    if (this._taskComponent === null) {
      this._taskComponent = new Task(this._task);
      this._container.appendChild(this._taskComponent.getElement());
    } else {
      const newTaskComponent = new Task(this._task);
      this._container.replaceChild(newTaskComponent.getElement(), this._taskComponent.getElement());
      this._taskComponent = newTaskComponent;
    }

    this._taskComponent.addEditClickEvent(this._onShowEdit);
    this._taskComponent.addArchiveClickEvent(this._onArchiveChange);
    this._taskComponent.addFavoriteClickEvent(this._onFavoriteChange);
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
