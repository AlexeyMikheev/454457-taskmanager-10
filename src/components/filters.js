import {getRandomBoolean} from '../utils.js';

const MIN_ITEMS = 0;

const clearFilters = () =>{
  let filtersContainer = document.querySelector(`.main__filter.filter.container`);
  if (filtersContainer !== null) {
    filtersContainer.remove();
  }
};

const createFilterTemplate = (filter) => {

  const {name, count} = filter;
  let filterChecked = getRandomBoolean();
  const filterDisabled = count <= MIN_ITEMS;

  if (filterDisabled) {
    filterChecked = false;
  }

  return `<input type="radio" id="filter__${name}" class="filter__input visually-hidden" name="filter" ${filterChecked ? `checked` : ``} ${filterDisabled ? `disabled` : ``} />
    <label for="filter__${name}" class="filter__label">${name} <span class="filter__${name}-count">${count}</span></label>`;
};

const createFiltersTemplate = (filters) => {
  clearFilters();

  const filtersTemplate = filters.reduce((template, filter) => {
    template += createFilterTemplate(filter);
    return template;
  }, ``);

  return `<section class="main__filter filter container">${filtersTemplate}</section>`;
};

export {createFiltersTemplate};
