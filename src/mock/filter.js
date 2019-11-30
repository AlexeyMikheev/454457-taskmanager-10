import {Filters} from '../const.js';

// const FILTERS_COUNT = 10;

const filterNames = [
  Filters.ALL, Filters.OVERDUE, Filters.TODAY, Filters.FAVORITES, Filters.REPEATING, Filters.TAGS, Filters.ARCHIVE
];

const generateFilters = () => {
  return filterNames.map((filter) => {
    return {
      name: filter,
      count: 0// Math.floor(Math.random() * FILTERS_COUNT)
    };
  });
};

export {generateFilters};
