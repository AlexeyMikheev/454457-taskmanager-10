
import {ALL_TASKS_COUNT, ONE_TASKS_PAGE_COUNT} from './const.js';
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
    moreButton.initClickEvent(onMoreButtonClick);
    moreButton.render(parentContainer);
  }
};

const initHeader = (pageTasks) => {
  new Menu().render(mainContainerControl);
  new Sort().render(Tasks.TasksContainer);

  const currentDate = new Date();

  filters.forEach((filter) => {
    filter.count = Utils.getFilterValue(filter, pageTasks, currentDate);
  });

  new MenuFilter(filters).render(mainContainer);
};

const mainContainer = document.querySelector(`.main`);
const mainContainerControl = mainContainer.querySelector(`.main__control`);

const tasks = createTasks(ALL_TASKS_COUNT);
const filters = generateFilters();

Tasks.renderContainer(mainContainer);
let currentPage = 0;

initHeader(tasks);

const firstTasks = Utils.getTasksByPageNumber(tasks, currentPage);
const tasksComponent = Tasks.createInstance(firstTasks);
tasksComponent.render();

addMoreButton(Tasks.TasksContainer);
