import {ONE_TASKS_PAGE_COUNT, RenderPosition, SortTypes, ESC_KEY} from './const.js';
import Menu from './components/menu.js';
import MenuFilter from './components/menu-filter';
import Tasks from './components/tasks.js';
import TasksContainer from './components/tasks-container.js';
import MoreButton from './components/more-button.js';
import Sort from './components/sort.js';
import NoFilms from './components/no-tasks.js';
import Utils from './utils.js';
import TaskController from './task-controller.js';

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
    this._tasksComponentElement = null;
    this._menuFilter = null;
    this._moreButton = null;
    this._tasksControllers = [];

    this._onDataChange = (taskController, oldValue, newValue) => {
      const taskToUpdate = Utils.getTaskyId(this._tasks, oldValue.id);

      if (taskToUpdate !== null) {
        Object.assign(taskToUpdate, newValue);
        taskController.render(taskToUpdate);

        this.initMenuFilters();
      }
    };

    this._onViewChange = () => {
      this.setDefaultView();
    };

    this._getMoreButtonVisibility = () => {
      return (this._currentPage + 1) * ONE_TASKS_PAGE_COUNT < this._tasks.length;
    };

    this._onMoreButtonClick = () => {
      this.setDefaultView();

      this._currentPage++;

      const sortedTasks = this.getTasks();

      this.renderListTasks(this._tasksComponentElement, sortedTasks);

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

        this.renderListTasks(this._tasksComponentElement, sortedTasks);
      }
    };
  }
  render(tasks, filters) {
    this._tasks = tasks;
    this._filters = filters;

    this.initHeader();
    this.initContent();
    this.addDocumentEvents();
  }

  renderListTasks(container, films) {
    this.clearTasks(this._tasksControllers);
    this._tasksControllers = [];
    this.renderTasks(container, films, this._tasksControllers);
  }

  renderTasks(container, films, filmsControllers) {
    films.forEach((film) => {
      const taskController = new TaskController(container, this._onDataChange, this._onViewChange);
      taskController.render(film);

      filmsControllers.push(taskController);
    });
  }

  clearTasks() {
    this._tasksControllers.forEach((taskController) => {
      taskController.removeComponents();
      taskController = null;
    });
  }

  setDefaultView() {
    this._tasksControllers.forEach((filmController) => {
      filmController.setDefaultView();
    });
  }

  initHeader() {
    this.initMenuFilters();

    const menu = new Menu();
    Utils.render(this._mainContainerControl, menu.getElement(), RenderPosition.BEFOREEND);
  }

  initMenuFilters() {
    const currentDate = new Date();

    this._filters.forEach((filter) => {
      filter.count = Utils.getFilterValue(filter, this._tasks, currentDate);
    });

    if (this._menuFilter === null) {
      this._menuFilter = new MenuFilter(this._filters);
      this._menuFilter.removeExist();
      Utils.render(this._mainContainer, this._menuFilter.getElement(), RenderPosition.BEFOREEND);
    } else {
      const newMenuFilter = new MenuFilter(this._filters);
      this._mainContainer.replaceChild(newMenuFilter.getElement(), this._menuFilter.getElement());
      this._menuFilter = newMenuFilter;
    }
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

    this._tasksComponent = new Tasks();
    this._tasksComponentElement = this._tasksComponent.getElement();
    Utils.render(tasksContainer, this._tasksComponentElement, RenderPosition.BEFOREEND);

    this.renderListTasks(this._tasksComponentElement, startPageTasks);

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
        this._tasksControllers.forEach((taskController) => {
          taskController.setDefaultView();
        });
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
