import {COLORS, MIN_TAGS_COUNT, MAX_TAGS_COUNT, DESCRIPTION_ITEMS, TAGS} from '../const.js';
import {getRandomBoolean, getRandomDate, getRandomItem} from '../utils.js';

const DefaultRepeatingDays = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
};

const createTags = (tags, min, max) => {
  return tags.filter(getRandomBoolean).slice(min, max);
};

const createRepeatingDays = () => {
  return Object.assign({}, DefaultRepeatingDays, {'mo': true});
};

const createTask = () => {
  const dueDate = getRandomBoolean() ? null : getRandomDate();

  return {
    description: getRandomItem(DESCRIPTION_ITEMS),
    dueDate,
    repeatingDays: dueDate !== null ? DefaultRepeatingDays : createRepeatingDays(),
    tags: new Set(createTags(TAGS, MIN_TAGS_COUNT, MAX_TAGS_COUNT)),
    color: getRandomItem(COLORS),
    isFavorite: getRandomBoolean(),
    isArchive: getRandomBoolean(),
  };
};

const createTasks = (count) => {
  let tasks = [];
  for (let i = 0; i <= count; i++) {
    tasks.push(createTask());
  }
  return tasks;
};

export {createTasks};
