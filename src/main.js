
import {ALL_TASKS_COUNT, ONE_TASKS_PAGE_COUNT} from './const.js';
import {getFilterValue, renderItem, renderTasksByPageNumber} from './utils.js';
import {createMenuTemplate} from './components/menu.js';
import {createFiltersTemplate} from './components/filters.js';
import {createTasksBoardTemplate} from './components/task-board.js';
import {createTaskEditTemplate} from './components/task-edit.js';
import {createMoreTemplate} from './components/more';

import {generateFilters} from './mock/filter.js';
import {createTasks} from './mock/task.js';

const getMoreButtonVisibility = () => {
  return (currentTasksPage + 1) * ONE_TASKS_PAGE_COUNT < tasks.length;
};

const addMoreButton = () => {
  const tasksBoardContainer = mainContainer.querySelector(`.board`);

  if (getMoreButtonVisibility()) {
    renderItem(tasksBoardContainer, createMoreTemplate());

    const moreButton = tasksBoardContainer.querySelector(`.load-more`);
    moreButton.addEventListener(`click`, () => {
      currentTasksPage++;
      renderTasksByPageNumber(tasksContainer, displayedTask, currentTasksPage);

      if (!getMoreButtonVisibility()) {
        moreButton.remove();
      }

    });
  }
};

const refreshFilters = (pageTasks) => {
  const currentDate = new Date();

  filters.forEach((filter) => {
    filter.count = getFilterValue(filter, pageTasks, currentDate);
  });
  renderItem(mainContainer, createFiltersTemplate(filters), `afterBegin`);
};

const mainContainer = document.querySelector(`.main`);

const mainContainerControl = mainContainer.querySelector(`.main__control`);
renderItem(mainContainerControl, createMenuTemplate());

renderItem(mainContainer, createTasksBoardTemplate());
const tasksContainer = mainContainer.querySelector(`.board__tasks`);

let currentTasksPage = 0;

const tasks = createTasks(ALL_TASKS_COUNT);
const filters = generateFilters();

const [editableDisplayedTask, ...displayedTask] = tasks;
refreshFilters(displayedTask);
renderItem(tasksContainer, createTaskEditTemplate(editableDisplayedTask));

renderTasksByPageNumber(tasksContainer, displayedTask, currentTasksPage);

addMoreButton();
