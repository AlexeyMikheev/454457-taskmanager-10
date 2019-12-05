import {MONTHS} from '../const.js';

import Utils from "../utils.js";

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

  const {description, tags, dueDate, color, repeatingDays} = task;

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
  }

  getElement() {
    if (!this._element) {
      this._element = Utils.createElement(getTemplate(this._task));
    }
    return this._element;
  }

  // isClickAvaliable(classList) {
  //   return classList.contains(`film-card__poster`) ||
  //   classList.contains(`film-card__comments`) ||
  //   classList.contains(`film-card__title`);
  // }

  // onShowDetail() {
  //   return (evt) => {
  //     if (this.isClickAvaliable(evt.target.classList)) {
  //       new FilmDeatil(this._film).render(document.body);
  //     }
  //   };
  // }

  remove() {
    // this._element.removeEventListener(`click`, this.onShowDetail());
    this._element.remove();
    this._element = null;
  }
}
