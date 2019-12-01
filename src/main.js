
import {Filters, Days} from './const.js';
import {createMenuTemplate} from './components/menu.js';
import {createFiltersTemplate} from './components/filters.js';
import {createTasksBoardTemplate, createTasksTemplate} from './components/task-board.js';
import {createTaskEditTemplate} from './components/task-edit.js';
import {createMoreTemplate} from './components/more';

import {generateFilters} from './mock/filter.js';
import {createTasks} from './mock/task.js';

const ALL_TASKS_COUNT = 22;
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

  refreshFilters(pageTasks);
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

const fillFiltersValues = (filters, tasks) =>{
  filters.forEach((filter)=>{
    if (filter.name === Filters.ALL) {
      filter.count += tasks.length;
    }

    const currentDate = new Date();

    if (filter.name === Filters.OVERDUE) {
      filter.count = tasks.reduce((total, task) =>{
        if (task.dueDate !== null && task.dueDate.valueOf() < currentDate.valueOf()) {
          total++;
        }
        return total;
      }, filter.count);
    }

    if (filter.name === Filters.TODAY) {
      filter.count = tasks.reduce((total, task) =>{
        if (task.dueDate !== null && task.dueDate.getDate() === currentDate.getDate()) {
          total++;
        }
        return total;
      }, filter.count);
    }

    if (filter.name === Filters.FAVORITES) {
      filter.count = tasks.reduce((total, task) =>{
        if (task.isFavorite) {
          total++;
        }
        return total;
      }, filter.count);
    }

    if (filter.name === Filters.REPEATING) {
      filter.count = tasks.reduce((total, task) =>{
        Days.forEach((day)=>{
          if (task.repeatingDays !== null && task.repeatingDays[day] !== null) {
            if (task.repeatingDays[day]) {
              total++;
            }
          }
        });

        return total;
      }, filter.count);
    }

    if (filter.name === Filters.TAGS) {
      filter.count = tasks.reduce((total, task) =>{
        if (task.tags !== null && task.tags.size > 0) {
          total++;
        }
        return total;
      }, filter.count);
    }

    if (filter.name === Filters.ARCHIVE) {
      filter.count = tasks.reduce((total, task) =>{
        if (task.isArchive) {
          total++;
        }
        return total;
      }, filter.count);
    }
  });
};

const refreshFilters = (pageTasks) =>{
  fillFiltersValues(filters, pageTasks);
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
renderItem(tasksContainer, createTaskEditTemplate(editableDisplayedTask));

renderTasksByPageNumber(displayedTask, currentTasksPage);

addMoreButton();
