import AbstractComponent from './abstract-component.js';
import Utils from '../utils.js';
import {SortTypes} from '../const.js';

export const getSortFilterTemplate = (selectedFilter, sortFilter) => {
  const {value, text} = sortFilter;
  const activeClass = selectedFilter === value ? `board__filter--active` : ``;
  return `<a href="#" data-sort="${value}" class="board__filter ${activeClass}">${text}</a>`;
};

export const getSortFiltersTemplate = () => `<div class="board__filter-list"></div>`;

export default class Sort extends AbstractComponent {
  constructor(selectedFilter) {
    super();
    this._selectedFilter = selectedFilter;
    this._sortElements = [];
    this._sortFilters = [
      {value: SortTypes.DEFAULT, text: `SORT BY DEFAULT`},
      {value: SortTypes.DATEUP, text: `SORT BY DATE up`},
      {value: SortTypes.DATEDOWN, text: `SORT BY DATE down`}];
  }

  getTemplate() {
    return getSortFiltersTemplate();
  }

  set selectedFilter(value) {
    this._selectedFilter = value;
  }

  addSortEvent(cb) {
    this._onClickCb = (evt) => {
      evt.preventDefault();
      if (evt.target.classList.contains(`board__filter`)) {
        const selectedFilter = parseInt(evt.target.dataset[`sort`], 10);
        if (this._selectedFilter !== selectedFilter) {
          cb(selectedFilter);
        }
      }
    };

    this._element.addEventListener(`click`, this._onClickCb);
  }

  refreshSortElements() {
    this.removeSortElements();
    this.renderSortElements();
  }

  renderSortElements() {
    this._sortElements = this._sortFilters.map((sortFilter)=>{
      return Utils.createElement(getSortFilterTemplate(this._selectedFilter, sortFilter));
    });

    this._sortElements.forEach((sortElement) => {
      this._element.appendChild(sortElement);
    });
  }

  removeSortElements() {
    this._sortElements.forEach((sortElement)=>{
      sortElement.remove();
    });
  }

  removeSortEvent() {
    this._element.removeEventListener(`click`, this._onClickCb);
    this._onClickCb = null;
  }
}
