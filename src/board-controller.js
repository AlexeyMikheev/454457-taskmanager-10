import {ONE_TASKS_PAGE_COUNT, RenderPosition, SortTypes, ESC_KEY} from './const.js';
import Menu from './components/menu.js';
import MenuFilter from './components/menu-filter';
import Tasks from './components/tasks.js';
import TaskEdit from './components/task-edit';
import TasksContainer from './components/tasks-container.js';
import MoreButton from './components/more-button.js';
import Sort from './components/sort.js';
import NoFilms from './components/no-tasks.js';
import Utils from './utils.js';

export default class BoardController {
  constructor(mainContainer, mainContainerControl) {
    this._mainContainer = mainContainer;
    this._mainContainerControl = mainContainerControl;
    this._tasks = null;
    this._filters = null;
    this._currentPage = 0;

    this._sortType = SortTypes.DEFAULT;

    this._sortComponent = new Sort(this._sortType);
    this._tasksComponent = null;
    this._taskEditComponent = null;
    this._taskEditableComponent = null;
    this._moreButton = null;
  }
  render(tasks, filters) {
    this._tasks = tasks;
    this._filters = filters;

    this._onCloseEdit = () => {
      if (this._taskEditComponent !== null && this._taskEditableComponent !== null) {
        this._tasksComponent.getElement().replaceChild(this._taskEditableComponent.getElement(), this._taskEditComponent.getElement());
        this._taskEditComponent.removeCloseEvents();
        this._taskEditComponent.removeElement();
        this._taskEditComponent = null;
        this._taskEditableComponent = null;
      }
    };

    this._onShowEdit = (taskComponent) => {
      this._onCloseEdit();
      this._taskEditComponent = new TaskEdit(taskComponent.task);

      this._taskEditableComponent = taskComponent;

      this._tasksComponent.getElement().replaceChild(this._taskEditComponent.getElement(), this._taskEditableComponent.getElement());
      this._taskEditComponent.initSubmitEvent(this._onCloseEdit);
      this._taskEditComponent.addCloseEvents(this._onCloseEdit);
    };

    this._getMoreButtonVisibility = () => {
      return (this._currentPage + 1) * ONE_TASKS_PAGE_COUNT < tasks.length;
    };

    this._onMoreButtonClick = () => {
      this._onCloseEdit();

      this._currentPage++;

      const sortedTasks = this.getTasks();

      this._tasksComponent.tasks = sortedTasks;
      this._tasksComponent.refreshComponents(this._onShowEdit);

      if (!this._getMoreButtonVisibility()) {
        this._moreButton.removeElement();
      }
    };

    this._onSortButtonClick = (sortType) => {
      this._sortType = sortType;

      if (this._sortComponent !== null) {
        this._sortComponent.selectedFilter = this._sortType;
        this._sortComponent.refreshSortElements();

        const sortedTasks = this.getTasks();

        this._tasksComponent.tasks = sortedTasks;
        this._tasksComponent.refreshComponents(this._onShowEdit);
      }
    };

    this.initHeader();
    this.initContent();
    this.addDocumentEvents();
  }

  initHeader() {
    const currentDate = new Date();

    this._filters.forEach((filter) => {
      filter.count = Utils.getFilterValue(filter, this._tasks, currentDate);
    });

    const menuFilter = new MenuFilter(this._filters);
    menuFilter.removeExist();
    Utils.render(this._mainContainer, menuFilter.getElement(), RenderPosition.BEFOREEND);

    const menu = new Menu();
    Utils.render(this._mainContainerControl, menu.getElement(), RenderPosition.BEFOREEND);
  }

  initContent() {
    const tasksContainer = new TasksContainer().getElement();
    Utils.render(this._mainContainer, tasksContainer);

    this.initSort(tasksContainer);

    const hasActiveTasks = this._tasks.some((f) => {
      return !f.isArchive;
    });

    if (!hasActiveTasks) {
      Utils.render(tasksContainer, new NoFilms().getElement(), RenderPosition.BEFOREEND);
      return;
    }

    const sort = new Sort();
    Utils.render(tasksContainer, sort.getElement(), RenderPosition.AFTERBEGIN);

    const startPageTasks = Utils.getTasksByPageNumber(this._tasks, this._currentPage);

    this._tasksComponent = new Tasks(startPageTasks);
    Utils.render(tasksContainer, this._tasksComponent.getElement(), RenderPosition.BEFOREEND);
    this._tasksComponent.initComponets(this._onShowEdit);

    this.initMoreButton(tasksContainer, this._tasksComponent);
  }

  initMoreButton(parentContainer) {
    if (this._getMoreButtonVisibility()) {

      this._moreButton = new MoreButton();
      Utils.render(parentContainer, this._moreButton.getElement());
      this._moreButton.initClickEvent(this._onMoreButtonClick);
    }
  }

  initSort(parentContainer) {
    Utils.render(parentContainer, this._sortComponent.getElement());
    this._sortComponent.renderSortElements();
    this._sortComponent.addSortEvent(this._onSortButtonClick);
  }

  addDocumentEvents() {
    document.addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === ESC_KEY) {
        this._onCloseEdit();
      }
    });
  }

  getSortedTasks(sortType, tasks) {
    switch (sortType) {
      case SortTypes.DEFAULT:
        return tasks;
      case SortTypes.DATEDOWN:
        return Utils.getSortedTasks(tasks, `dueDate`);
      case SortTypes.DATEUP:
        return Utils.getSortedTasks(tasks, `dueDate`, true);
      default: return tasks;
    }
  }

  getTasks() {
    const pageFilms = Utils.getTasksByPageNumber(this._tasks, this._currentPage);
    return this.getSortedTasks(this._sortType, pageFilms);
  }
}
