import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/**** GLOBAL STATE OF THE APP ****
- Search Object
- Current Recipe object
- Shopping List object
- Liked recipes
*********************************/
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
  // 1. Get query from the view
  const query = searchView.getInput(); //TODO

  if (query) {
    // 2. New search object and add to state
    state.search = new Search(query);

    // 3. Prepare UI for Results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
        // 4. Search for recipes
        await state.search.getResults();

        // 5. Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    } catch (error) {
        alert('Something went wrong...');
        clearLoader();
    }
  }
};

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});


elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

/**
 * RECIPE CONTROLLER
 */

const controlRecipe = async () => {
  // Get ID from URL
  const id = window.location.hash.replace('#', '');
  console.log(id);

  if (id) {
    // Prepare UI for changes

    // Create new Recipe object
    state.recipe = new Recipe(id);

    try {
      // Get recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // Calc servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      console.log(state.recipe);
    } catch (error) {
      alert('Error processing recipe');
    }
  }
};

/* window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe); 
* can use loop for both below
*/

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe)
);
