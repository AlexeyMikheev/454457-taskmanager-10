
import {ALL_TASKS_COUNT, ONE_TASKS_PAGE_COUNT, RenderPosition} from './const.js';
import Menu from './components/menu.js';
import MenuFilter from './components/menu-filter';
import Tasks from './components/tasks.js';
import MoreButton from './components/more-button.js';
import Sort from './components/sort.js';
import Utils from "./utils.js";

import {generateFilters} from './mock/filter.js';
import {createTasks} from './mock/task.js';


const getMoreButtonVisibility = () => {
  return (currentPage + 1) * ONE_TASKS_PAGE_COUNT < tasks.length;
};

const addMoreButton = (parentContainer) => {
  if (getMoreButtonVisibility()) {

    const onMoreButtonClick = () => {
      currentPage++;

      const pageTasks = Utils.getTasksByPageNumber(tasks, currentPage);
      tasksComponent.addTasks(pageTasks);

      if (!getMoreButtonVisibility()) {
        moreButton.remove();
      }
    };

    let moreButton = new MoreButton();
    Utils.render(parentContainer, moreButton.getElement());
    moreButton.initClickEvent(onMoreButtonClick);
  }
};

const initHeader = (pageTasks) => {
  const menu = new Menu();
  Utils.render(mainContainerControl, menu.getElement(), RenderPosition.BEFOREEND);

  const sort = new Sort();
  Utils.render(tasksContainer, sort.getElement(), RenderPosition.AFTERBEGIN);

  const currentDate = new Date();

  filters.forEach((filter) => {
    filter.count = Utils.getFilterValue(filter, pageTasks, currentDate);
  });

  const menuFilter = new MenuFilter(filters);
  menuFilter.removeExist();
  Utils.render(mainContainer, menuFilter.getElement(), RenderPosition.AFTERBEGIN);
};

const mainContainer = document.querySelector(`.main`);
const mainContainerControl = mainContainer.querySelector(`.main__control`);

const tasks = createTasks(ALL_TASKS_COUNT);
const filters = generateFilters();

const tasksContainer = Tasks.getTasksContainer();
Utils.render(mainContainer, tasksContainer);

let currentPage = 0;

initHeader(tasks);

const startTasks = Utils.getTasksByPageNumber(tasks, currentPage);
const tasksComponent = Tasks.createInstance(startTasks);
Utils.render(tasksContainer, tasksComponent.getElement(), RenderPosition.BEFOREEND);
tasksComponent.initComponets();

addMoreButton(tasksContainer);
