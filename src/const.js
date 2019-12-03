const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];

const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];

const MONTHS = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

const Filters = {
  ALL: `all`,
  OVERDUE: `overdue`,
  TODAY: `today`,
  FAVORITES: `favorites`,
  REPEATING: `repeating`,
  TAGS: `tags`,
  ARCHIVE: `archive`
};

const ALL_TASKS_COUNT = 22;
const ONE_TASKS_PAGE_COUNT = 8;

const RANDOM_LIMIT = 0.5;
const MIN_RANDOM_NUMBER = 0;

const DIRECTION_POSITIVE = 1;
const DIRECTION_NEGATIVE = -1;

const MIN_DAY_LIMIT = 0;
const MAX_DAY_LIMIT = 7;

const MIN_TAGS_COUNT = 0;
const MAX_TAGS_COUNT = 3;

const DESCRIPTION_ITEMS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const TAGS = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`
];

export {COLORS, DAYS, MONTHS, Filters, ALL_TASKS_COUNT, ONE_TASKS_PAGE_COUNT, RANDOM_LIMIT, MIN_RANDOM_NUMBER, DIRECTION_POSITIVE, DIRECTION_NEGATIVE, MIN_DAY_LIMIT, MAX_DAY_LIMIT, MIN_TAGS_COUNT, MAX_TAGS_COUNT, DESCRIPTION_ITEMS, TAGS};
