import { MONTHS } from '../const.js';

import Utils from "../utils.js";
import TaskEdit from "./task-edit";

const createHashtagsMarkup = (hashtags) => {
  return hashtags
    .map((hashtag) => {
      return (
        `<span class="card__hashtag-inner">
            <span class="card__hashtag-name">
              #${hashtag}
            </span>
          </span>`
      );
    })
    .join(`\n`);
};

const getTemplate = (task) => {

  const { description, tags, dueDate, color, repeatingDays } = task;

  const isDateShowing = dueDate !== null;
  const isExpired = isDateShowing && dueDate.valueOf() < Date.now().valueOf();

  const date = isDateShowing ? `${dueDate.getDate()} ${MONTHS[dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? Utils.formatTime(dueDate) : ``;

  const hashtags = createHashtagsMarkup(Array.from(tags));
  const repeatClass = Object.values(repeatingDays).some(Boolean) ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  return (
    `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites card__btn--disabled"
            >
              favorites
            </button>
          </div>
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${date}</span>
                    <span class="card__time">${time}</span>
                  </p>
                </div>
              </div>
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${hashtags}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};

export default class Task {

  constructor(task) {
    this._task = task;
    this._element = null;
    this._form = null;
    this._editButton = null; 
    this._parentcontainer = null;
    this._editComponent = null;
  }

  getElement() {
    if (!this._element) {
      this._element = Utils.createElement(getTemplate(this._task));
    }
    return this._element;
  }

  set ParentContainer(value) {
    this._parentcontainer = value;
  }

  initClickEvent() {
    this._editButton = this._element.querySelector(`.card__btn--edit`);
    this._editButton.addEventListener(`click`, this.onShowEdit());
  }

  onShowEdit() {
    return (evt) => {
      this._editComponent = new TaskEdit(this._task);
      this._parentcontainer.replaceChild(this._editComponent.getElement(), this._element);
      this._editComponent.initSubmitEvent(this.onCloseEdit())
      this._editComponent.initCloseEvents(this.onCloseEdit());
    };
  }

  onCloseEdit() {
    return (evt) => {
      this._parentcontainer.replaceChild(this._element, this._editComponent.getElement());
      this._editComponent.removeElement();
      this._editComponent = null;
    };
  }

  remove() {
    this._editButton.removeEventListener(`click`, this.onShowEdit());
    this._element.remove();
    this._element = null;
  }
}
