
import {createMenuTemplate} from './components/menu.js';
import {createFiltersTemplate} from './components/filters.js';
import {generateFilters} from './mock/filter.js';
import {createTasksBoardTemplate, createTaskTemplate, createNewTaskTemplate} from './components/task-board.js';
import {createMoreTemplate} from './components/more.js';

const COUNT_TASKS = 3;

const renderItem = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const mainContainer = document.querySelector(`.main`);

const mainContainerControl = mainContainer.querySelector(`.main__control`);
renderItem(mainContainerControl, createMenuTemplate());

const filtersItems = generateFilters();
renderItem(mainContainer, createFiltersTemplate(filtersItems));

renderItem(mainContainer, createTasksBoardTemplate());

const tasksBoardContainer = mainContainer.querySelector(`.board`);
const tasksContainer = tasksBoardContainer.querySelector(`.board__tasks`);

renderItem(tasksContainer, createNewTaskTemplate());

for (let i = 0; i < COUNT_TASKS; i++) {
  renderItem(tasksContainer, createTaskTemplate());
}

renderItem(tasksBoardContainer, createMoreTemplate());
