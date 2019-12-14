import AbstractComponent from './abstract-component.js';

const MIN_ITEMS = 0;

const createFilterContentTemplate = (filter) => {

  const {name, count} = filter;
  let filterChecked = false;
  const filterDisabled = count <= MIN_ITEMS;

  if (filterDisabled) {
    filterChecked = false;
  }

  return `<input type="radio" id="filter__${name}" class="filter__input visually-hidden" name="filter" ${filterChecked ? `checked` : ``} ${filterDisabled ? `disabled` : ``} />
    <label for="filter__${name}" class="filter__label">${name} <span class="filter__${name}-count">${count}</span></label>`;
};

const getFilterTemplate = (filters) => {

  const filterContentTemplate = filters.reduce((template, filter) => {
    template += createFilterContentTemplate(filter);
    return template;
  }, ``);

  return `<section class="main__filter filter container">${filterContentTemplate}</section>`;
};

export default class MenuFilter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return getFilterTemplate(this._filters);
  }

  removeExist() {
    let filtersContainer = document.querySelector(`.main__filter.filter.container`);
    if (filtersContainer !== null) {
      filtersContainer.remove();
    }
  }
}
