const FILTERS_COUNT = 10;

const filterNames = [
  `all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`
];

const generateFilters = () => {
  return filterNames.map((filter) => {
    return {
      name: filter,
      count: Math.floor(Math.random() * FILTERS_COUNT)
    };
  });
};

export {generateFilters};
