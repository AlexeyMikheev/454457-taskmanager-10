import {COLORS, DAYS, DUE_DATE_EDIT_FORMAT} from '../const.js';
import AbstractSmartComponent from './abstract-smart-component.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import moment from 'moment';

const createColorsMarkup = (colors, currentColor) => {
  return colors
    .map((color) => {
      return (
        `<input
          type="radio"
          id="color-${color}-4"
          class="card__color-input card__color-input--${color} visually-hidden"
          name="color"
          value="${color}"
          ${currentColor === color ? `checked` : ``}
        />
        <label
          for="color-${color}-4"
          class="card__color card__color--${color}"
          >${color}</label
        >`
      );
    })
    .join(`\n`);
};

const createRepeatingDaysMarkup = (days, repeatingDays) => {
  return days
    .map((day) => {
      const isChecked = repeatingDays[day];
      return (
        `<input
          class="visually-hidden card__repeat-day-input"
          type="checkbox"
          id="repeat-${day}-4"
          name="repeat"
          value="${day}"
          ${isChecked ? `checked` : ``}
        />
        <label class="card__repeat-day" for="repeat-${day}-4"
          >${day}</label
        >`
      );
    })
    .join(`\n`);
};

const createHashtags = (tags) => {
  return Array.from(tags).map((tag) => {
    return (
      `<span class="card__hashtag-inner">
          <input
            type="hidden"
            name="hashtag"
            value=${tag}
            class="card__hashtag-hidden-input"
          />
          <p class="card__hashtag-name">
            #${tag}
          </p>
          <button
              type="button"
              class="card__hashtag-delete"
          >
            delete
          </button>
        </span>`
    );
  }).join(`\n`);
};

const isRepeating = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean);
};

export const getTaskEditTemplate = (task, options = {}) => {
  const {description, tags, color} = task;
  let {dueDate} = task;
  const {isDateShowing, isRepeatingTask, activeRepeatingDays} = options;

  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isBlockSaveButton = (isDateShowing && isRepeatingTask) || (isRepeatingTask && !isRepeating(activeRepeatingDays));

  const repeatClass = isRepeatingTask ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  const tagsMarkup = createHashtags(tags);
  const colorsMarkup = createColorsMarkup(COLORS, color);
  const repeatingDaysMarkup = createRepeatingDaysMarkup(DAYS, activeRepeatingDays);

  return (
    `<article class="card card--edit card--${color} ${repeatClass} ${deadlineClass}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>

            <div class="card__textarea-wrap">
              <label>
                <textarea
                  class="card__text"
                  placeholder="Start typing your text here..."
                  name="text"
                >${description}</textarea>
              </label>
            </div>

            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <button class="card__date-deadline-toggle" type="button">
                    date: <span class="card__date-status">${isDateShowing ? `yes` : `no`}</span>
                  </button>

                  ${isDateShowing && !isRepeatingTask ? `<fieldset class="card__date-deadline">
                                      <label class="card__input-deadline-wrap">
                                        <input
                                          class="card__date"
                                          type="text"
                                          placeholder=""
                                          name="date"
                                        />
                                      </label>
                                    </fieldset>` : ``}
                  <button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">${isRepeatingTask ? `yes` : `no`}</span>
                  </button>

                  ${isRepeatingTask && !isDateShowing ? `<fieldset class="card__repeat-days">
                      <div class="card__repeat-days-inner">
                        ${repeatingDaysMarkup}
                      </div>
                    </fieldset>` : ``}
                </div>

                <div class="card__hashtag">
                  <div class="card__hashtag-list">
                    ${tagsMarkup}
                  </div>

                  <label>
                    <input
                      type="text"
                      class="card__hashtag-input"
                      name="hashtag-input"
                      placeholder="Type new hashtag here"
                    />
                  </label>
                </div>
              </div>

              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                  ${colorsMarkup}
                </div>
              </div>
            </div>

            <div class="card__status-btns">
              <button class="card__save" type="submit" ${isBlockSaveButton ? `disabled` : ``}>save</button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>`
  );
};

export default class TaskEdit extends AbstractSmartComponent {
  constructor(task, container) {
    super();

    this._container = container;

    this._dueDate = task.dueDate;
    this._isDateShowing = !!task.dueDate;
    this._isRepeatingTask = Object.values(task.repeatingDays).some(Boolean);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);

    this._task = task;
    this._form = null;

    this._initEvents();
  }

  getTemplate() {
    return getTaskEditTemplate(this._task, {
      isDateShowing: this._isDateShowing,
      isRepeatingTask: this._isRepeatingTask,
      activeRepeatingDays: this._activeRepeatingDays,
    });
  }

  initSubmitEvent(cb) {
    this._onSubmitFormCb = (evt) =>{
      evt.preventDefault();

      if (this._flatpickr !== null) {
        const dueDateMoment = moment(this._flatpickr.selectedDates[0].valueOf());

        if (dueDateMoment.isValid()) {
          this._dueDate = dueDateMoment.valueOf();
        }
      }

      const dueDate = this._dueDate;
      const isDateShowing = this._isDateShowing;
      const isRepeatingTask = this._isRepeatingTask;
      const repeatingDays = this._activeRepeatingDays;

      cb(Object.assign(this._task, {}, {dueDate, isDateShowing, isRepeatingTask, repeatingDays}));
    };

    this._initFormEvents();
  }

  rerender() {
    super.rerender();
  }

  recoveryListeners() {
    this._initEvents();
    this._initFormEvents();
  }

  _initFormEvents() {
    this._form = this._element.querySelector(`form`);
    this._form.addEventListener(`submit`, this._onSubmitFormCb);
  }

  _initEvents() {
    const element = this.getElement();

    element.querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, () => {
        this._isDateShowing = !this._isDateShowing;

        if (this._isDateShowing) {
          this._dueDate = new Date();

          this._isRepeatingTask = false;
          this._resetRepeatingDays();
        } else {
          this._dueDate = null;
        }

        this.rerender();
      });

    element.querySelector(`.card__repeat-toggle`)
      .addEventListener(`click`, () => {
        this._isRepeatingTask = !this._isRepeatingTask;

        if (this._isRepeatingTask) {
          this._isDateShowing = false;
          this._dueDate = null;
        } else {
          this._resetRepeatingDays();
        }

        this.rerender();
      });

    const repeatDays = element.querySelector(`.card__repeat-days`);
    if (repeatDays) {
      repeatDays.addEventListener(`change`, (evt) => {
        this._activeRepeatingDays[evt.target.value] = evt.target.checked;

        this.rerender();
      });
    }

    this._initFlatpickr();
  }

  _initFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    if (this._isDateShowing) {
      const dateElement = this.getElement().querySelector(`.card__date`);

      this._flatpickr = flatpickr(dateElement, {
        altInput: true,
        allowInput: true,
        enableTime: true,
        dateFormat: DUE_DATE_EDIT_FORMAT,
        defaultDate: this._task.dueDate !== null ? this._task.dueDate : new Date(),
      });

    }
  }

  _resetRepeatingDays() {
    Array.from(Object.keys(this._activeRepeatingDays)).forEach((key) => {
      this._activeRepeatingDays[key] = false;
    });
  }
}
