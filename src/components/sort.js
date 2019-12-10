import AbstractComponent from './abstract-component.js';
import {SortTypes} from '../const.js';
import Utils from '../utils.js';

const getSortTemplate = () => {
  return (
    `<div class="board__filter-list">
      <a href="#" class="board__filter">SORT BY DEFAULT</a>
      <a href="#" class="board__filter">SORT BY DATE up</a>
      <a href="#" class="board__filter">SORT BY DATE down</a>
    </div>`
  );
};

export const getSortFilterTemplate = (selectedFilter, sortFilter) => {
  const {value, text} = sortFilter;
  const activeClass = selectedFilter === value ? `board__filter--active` : ``;
  return `<li><a href="#" data-sort="${value}" class="board__filter ${activeClass}">${text}</a></li>`;
};

export const getSortFiltersTemplate = () => `<div class="board__filter-list"></div>`;

export default class Sort extends AbstractComponent {
  constructor(selectedFilter) {
    super();
    this._selectedFilter = selectedFilter;
    this._sortElements = [];
    this._sortFilters = [
      {value: SortTypes.DEFAULT, text: `SORT BY DEFAULT`},
      {value: SortTypes.UPDATE, text: `SORT BY DATE up`},
      {value: SortTypes.DOWNDATE, text: `SORT BY DATE down`}];
  }

  getTemplate() {
    return getSortTemplate();
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
