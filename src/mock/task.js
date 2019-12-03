import {COLORS, RANDOM_LIMIT, MIN_RANDOM_NUMBER, DIRECTION_POSITIVE, DIRECTION_NEGATIVE, MIN_DAY_LIMIT, MAX_DAY_LIMIT, MIN_TAGS_COUNT, MAX_TAGS_COUNT} from '../const.js';

const DescriptionItems = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const DefaultRepeatingDays = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
};

const Tags = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`
];

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


const createTags = (tags, min, max) => {
  return tags
    .filter(() => getRandomBoolean())
    .slice(min, max);
};

const createRepeatingDays = () => {
  return Object.assign({}, DefaultRepeatingDays, {'mo': true});
};

const createTask = () => {
  const dueDate = getRandomBoolean() ? null : getRandomDate();

  return {
    description: getRandomItem(DescriptionItems),
    dueDate,
    repeatingDays: dueDate !== null ? DefaultRepeatingDays : createRepeatingDays(),
    tags: new Set(createTags(Tags, MIN_TAGS_COUNT, MAX_TAGS_COUNT)),
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
