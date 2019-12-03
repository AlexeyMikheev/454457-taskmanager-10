import {Filters} from '../const.js';

const filterNames = [
  Filters.ALL, Filters.OVERDUE, Filters.TODAY, Filters.FAVORITES, Filters.REPEATING, Filters.TAGS, Filters.ARCHIVE
];

const generateFilters = () => {
  return filterNames.map((filter) => {
    return {
      name: filter,
      count: 0
    };
  });
};

export {generateFilters};
