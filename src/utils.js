import {Filters, DAYS, ONE_TASKS_PAGE_COUNT, RANDOM_LIMIT, MIN_RANDOM_NUMBER, DIRECTION_POSITIVE, DIRECTION_NEGATIVE, MIN_DAY_LIMIT, MAX_DAY_LIMIT, RenderPosition} from './const.js';

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


  static getFormatedValue(value) {
    return value < 10 ? `0${value}` : String(value);
  }

  static getRandomNumber(min, max) {
    return Math.floor((max - min) * Math.random());
  }

  static getRandomBoolean() {
    return Math.random() > RANDOM_LIMIT;
  }

  static getRandomDate() {
    const currentDate = new Date();

    const directionDay = this.getRandomBoolean() ? DIRECTION_POSITIVE : DIRECTION_NEGATIVE;
    const day = directionDay * this.getRandomNumber(MIN_DAY_LIMIT, MAX_DAY_LIMIT);

    currentDate.setDate(currentDate.getDate() + day);

    return currentDate;
  }

  static getRandomItem(items) {
    const index = this.getRandomNumber(MIN_RANDOM_NUMBER, items.length);
    return items[index];
  }

  static formatTime(date) {
    const hours = this.getFormatedValue(date.getHours() % 12);
    const minutes = this.getFormatedValue(date.getMinutes());

    const interval = date.getHours() > 11 ? `pm` : `am`;

    return `${hours}:${minutes} ${interval}`;
  }

  static getTasksByPageNumber(tasks, pageNumber, countTasks = ONE_TASKS_PAGE_COUNT) {
    const startIndex = pageNumber * countTasks;
    const endIndex = startIndex + countTasks;
    return tasks.slice(0, endIndex);
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
        }, 0);

      case Filters.TODAY:
        return tasks.reduce((total, task) => {
          if (task.dueDate !== null && task.dueDate.getDate() === currentDate.getDate()) {
            total++;
          }
          return total;
        }, 0);

      case Filters.FAVORITES:
        return tasks.reduce((total, task) => {
          if (task.isFavorite) {
            total++;
          }
          return total;
        }, 0);

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
        }, 0);

      case Filters.TAGS:
        return tasks.reduce((total, task) => {
          if (task.tags !== null && task.tags.size > 0) {
            total++;
          }
          return total;
        }, 0);

      case Filters.ARCHIVE:
        return tasks.reduce((total, task) => {
          if (task.isArchive) {
            total++;
          }
          return total;
        }, 0);

      default: return filter.count;
    }
  }

  static getRandomBoolean() {
    return Math.random() > RANDOM_LIMIT;
  }

  static getSortedTasks(tasks, propertyName, byDesc = false) {
    return tasks.slice().sort((prevFilm, nextFilm) => {
      if (prevFilm[propertyName] === null) {
        return byDesc ? 1 : -1;
      }
      if (nextFilm[propertyName] === null) {
        return byDesc ? -1 : 1;
      }
      if (prevFilm[propertyName] > nextFilm[propertyName]) {
        return byDesc ? 1 : -1;
      }
      if (prevFilm[propertyName] < nextFilm[propertyName]) {
        return byDesc ? -1 : 1;
      }
      return 0;
    });
  }

  static getTaskyId(tasks, id) {
    return tasks.find((task) => {
      return task.id === id;
    });
  }
}
