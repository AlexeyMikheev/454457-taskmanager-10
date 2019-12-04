import {Filters, DAYS, ONE_TASKS_PAGE_COUNT, RANDOM_LIMIT, MIN_RANDOM_NUMBER, DIRECTION_POSITIVE, DIRECTION_NEGATIVE, MIN_DAY_LIMIT, MAX_DAY_LIMIT, RenderPosition} from './const.js';

const getFormatedValue = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const getRandomNumber = (min, max) => {
  return Math.floor((max - min) * Math.random());
};

const getRandomBoolean = () => {
  return Math.random() > RANDOM_LIMIT;
};

const getRandomDate = () => {
  const currentDate = new Date();

  const directionDay = getRandomBoolean() ? DIRECTION_POSITIVE : DIRECTION_NEGATIVE;
  const day = directionDay * getRandomNumber(MIN_DAY_LIMIT, MAX_DAY_LIMIT);

  currentDate.setDate(currentDate.getDate() + day);

  return currentDate;
};

const getRandomItem = (items) => {
  const index = getRandomNumber(MIN_RANDOM_NUMBER, items.length);
  return items[index];
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

export default class Utils {

  static createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.firstChild;
  }

  static render(container, element, place = RenderPosition.BEFOREEND) {
    switch (place) {
      case RenderPosition.AFTERBEGIN:
        container.prepend(element);
        break;
      case RenderPosition.BEFOREEND:
        container.append(element);
        break;
    }
  }

  static formatTime(date) {
    const hours = getFormatedValue(date.getHours() % 12);
    const minutes = getFormatedValue(date.getMinutes());

    const interval = date.getHours() > 11 ? `pm` : `am`;

    return `${hours}:${minutes} ${interval}`;
  }

  static getTasksByPageNumber(tasks, pageNumber, countTasks = ONE_TASKS_PAGE_COUNT) {
    const startIndex = pageNumber * countTasks;
    const endIndex = startIndex + countTasks;
    return tasks.slice(startIndex, endIndex);
  }

  static getFilterValue(filter, tasks, currentDate) {

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
  }

  static getRandomBoolean() {
    return Math.random() > RANDOM_LIMIT;
  }
}

export {getFilterValue, renderItem, getRandomBoolean, getRandomDate, getRandomItem};
