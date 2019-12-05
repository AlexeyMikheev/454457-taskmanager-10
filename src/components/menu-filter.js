import Utils from '../utils.js';

const MIN_ITEMS = 0;

const createFilterContentTemplate = (filter) => {

  const {name, count} = filter;
  let filterChecked = Utils.getRandomBoolean();
  const filterDisabled = count <= MIN_ITEMS;

  if (filterDisabled) {
    filterChecked = false;
  }

  return `<input type="radio" id="filter__${name}" class="filter__input visually-hidden" name="filter" ${filterChecked ? `checked` : ``} ${filterDisabled ? `disabled` : ``} />
    <label for="filter__${name}" class="filter__label">${name} <span class="filter__${name}-count">${count}</span></label>`;
};

const getTemplate = (filters) => {

  const filterContentTemplate = filters.reduce((template, filter) => {
    template += createFilterContentTemplate(filter);
    return template;
  }, ``);

  return `<section class="main__filter filter container">${filterContentTemplate}</section>`;
};

export default class MenuFilter {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }

  getElement() {
    if (!this._element) {
      this._element = Utils.createElement(getTemplate(this._filters));
    }
    return this._element;
  }

  removeExist() {
    let filtersContainer = document.querySelector(`.main__filter.filter.container`);
    if (filtersContainer !== null) {
      filtersContainer.remove();
    }
  }

  remove() {
    this._element = null;
  }
}
