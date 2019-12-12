import AbstractComponent from './abstract-component.js';
import {MONTHS} from '../const.js';

import Utils from '../utils.js';

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

const getTaskTemplate = (task) => {

  const {description, tags, dueDate, color, repeatingDays, isFavorite, isArchive} = task;

  const isDateShowing = dueDate !== null;
  const isExpired = isDateShowing && dueDate.valueOf() < Date.now().valueOf();

  const date = isDateShowing ? `${dueDate.getDate()} ${MONTHS[dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? Utils.formatTime(dueDate) : ``;

  const hashtags = createHashtagsMarkup(Array.from(tags));
  const repeatClass = Object.values(repeatingDays).some(Boolean) ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  const isFavoriteActiveClass = !isFavorite ? `card__btn--disabled` : ``;
  const isArchiveActiveClass = !isArchive ? `card__btn--disabled` : ``;

  return (
    `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive" ${isFavoriteActiveClass}>
              archive
            </button>
            <button
              type="button" class="card__btn card__btn--favorites" ${isArchiveActiveClass}>
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

export default class Task extends AbstractComponent {

  constructor(task) {
    super();
    this._task = task;
  }

  getTemplate() {
    return getTaskTemplate(this._task);
  }

  addEditClickEvent(cb) {
    const editButton = this._element.querySelector(`.card__btn--edit`);
    editButton.addEventListener(`click`, cb);
  }

  addArchiveClickEvent(cb) {
    const archiveButton = this._element.querySelector(`.card__btn--archive`);
    archiveButton.addEventListener(`click`, cb);
  }

  addFavoriteClickEvent(cb) {
    const favoriteButton = this._element.querySelector(`.card__btn--favorites`);
    favoriteButton.addEventListener(`click`, cb);
  }
}
