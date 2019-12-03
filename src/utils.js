import {Filters, DAYS, ONE_TASKS_PAGE_COUNT} from './const.js';
import {createTasksTemplate} from './components/task-board.js';

const getFormatedValue = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = getFormatedValue(date.getHours() % 12);
  const minutes = getFormatedValue(date.getMinutes());

  const interval = date.getHours() > 11 ? `pm` : `am`;

  return `${hours}:${minutes} ${interval}`;
};

const getFilterValue = (filter, tasks, currentDate) => {

  switch (filter.name) {
    case Filters.ALL: return tasks.length;

    case Filters.OVERDUE:
      return tasks.reduce((total, task) => {
        if (task.dueDate !== null && task.dueDate.valueOf() < currentDate.valueOf()) {
          total++;
        }
        return total;
      }, filter.count);

    case Filters.TODAY:
      return tasks.reduce((total, task) => {
        if (task.dueDate !== null && task.dueDate.getDate() === currentDate.getDate()) {
          total++;
        }
        return total;
      }, filter.count);

    case Filters.FAVORITES:
      return tasks.reduce((total, task) => {
        if (task.isFavorite) {
          total++;
        }
        return total;
      }, filter.count);

    case Filters.REPEATING:
      return tasks.reduce((total, task) => {
        DAYS.forEach((day) => {
          if (task.repeatingDays !== null && task.repeatingDays[day] !== null) {
            if (task.repeatingDays[day]) {
              total++;
            }
          }
        });

        return total;
      }, filter.count);

    case Filters.TAGS:
      return tasks.reduce((total, task) => {
        if (task.tags !== null && task.tags.size > 0) {
          total++;
        }
        return total;
      }, filter.count);

    case Filters.ARCHIVE:
      return tasks.reduce((total, task) => {
        if (task.isArchive) {
          total++;
        }
        return total;
      }, filter.count);

    default: return filter.count;
  }
};

const renderItem = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const getTasksByPageNumber = (tasks, pageNumber, countTasks = ONE_TASKS_PAGE_COUNT) =>{
  const startIndex = pageNumber * countTasks;
  const endIndex = startIndex + countTasks;
  return tasks.slice(startIndex, endIndex);
};

const renderTasksByPageNumber = (container, tasks, currentTasksPage) =>{
  const pageTasks = getTasksByPageNumber(tasks, currentTasksPage);

  renderItem(container, createTasksTemplate(pageTasks));
};

export {formatTime, getFilterValue, renderItem, renderTasksByPageNumber};
