import AbstractComponent from './abstract-component.js';

const getMoreButtonTemplate = () => `<button class="load-more" type="button">load more</button>`;

export default class MoreButton extends AbstractComponent {

  constructor() {
    super();
  }

  getTemplate() {
    return getMoreButtonTemplate();
  }

  initClickEvent(cb) {
    this._element.addEventListener(`click`, () => {
      cb();
    });
  }

}

