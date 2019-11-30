
import {createMenuTemplate} from './components/menu.js';
import {createFiltersTemplate} from './components/filters.js';
import {createTasksBoardTemplate, createTasksTemplate} from './components/task-board.js';
import {createTaskEditTemplate} from './components/task-edit.js';
import {createMoreTemplate} from './components/more';

import {generateFilters} from './mock/filter.js';
import {createTasks} from './mock/task.js';

const ALL_TASKS_COUNT = 10;
const ONE_TASKS_PAGE_COUNT = 8;

const renderItem = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const getTasksByPageNumber = (tasks, pageNumber, countTasks = ONE_TASKS_PAGE_COUNT) =>{
  const startIndex = pageNumber * countTasks;
  const endIndex = startIndex + countTasks;
  return tasks.slice(startIndex, endIndex);
};

const renderTasksByPageNumber = (tasks, currentTasksPage) =>{
  const pageTasks = getTasksByPageNumber(tasks, currentTasksPage);
  renderItem(tasksContainer, createTasksTemplate(pageTasks));
};

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
      renderTasksByPageNumber(displayedTask, currentTasksPage);

      if (!getMoreButtonVisibility()) {
        moreButton.remove();
      }

    });
  }
};

const mainContainer = document.querySelector(`.main`);

const mainContainerControl = mainContainer.querySelector(`.main__control`);
renderItem(mainContainerControl, createMenuTemplate());

const filters = generateFilters();
renderItem(mainContainer, createFiltersTemplate(filters));

renderItem(mainContainer, createTasksBoardTemplate());
const tasksContainer = mainContainer.querySelector(`.board__tasks`);

let currentTasksPage = 0;

const tasks = createTasks(ALL_TASKS_COUNT);

const [editableDisplayedTask, ...displayedTask] = tasks;
renderItem(tasksContainer, createTaskEditTemplate(editableDisplayedTask));

renderTasksByPageNumber(displayedTask, currentTasksPage);

addMoreButton();
