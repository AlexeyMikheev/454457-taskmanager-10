
import {ALL_TASKS_COUNT} from './const.js';

import {generateFilters} from './mock/filter.js';
import {createTasks} from './mock/task.js';
import BoardController from './board-controller.js';

const tasks = createTasks(ALL_TASKS_COUNT);
const filters = generateFilters();

const mainContainer = document.querySelector(`.main`);
const mainContainerControl = mainContainer.querySelector(`.main__control`);

const pageController = new BoardController(mainContainer, mainContainerControl);
pageController.render(tasks, filters);
