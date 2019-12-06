import {COLORS, MIN_TAGS_COUNT, MAX_TAGS_COUNT, DESCRIPTION_ITEMS, TAGS} from '../const.js';
import Utils from '../utils.js';

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
  return tags.filter(Utils.getRandomBoolean).slice(min, max);
};

const createRepeatingDays = () => {
  return Object.assign({}, DefaultRepeatingDays, {'mo': true});
};

const createTask = () => {
  const dueDate = Utils.getRandomBoolean() ? null : Utils.getRandomDate();

  return {
    description: Utils.getRandomItem(DESCRIPTION_ITEMS),
    dueDate,
    repeatingDays: dueDate !== null ? DefaultRepeatingDays : createRepeatingDays(),
    tags: new Set(createTags(TAGS, MIN_TAGS_COUNT, MAX_TAGS_COUNT)),
    color: Utils.getRandomItem(COLORS),
    isFavorite: Utils.getRandomBoolean(),
    isArchive: Utils.getRandomBoolean()
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
