import { handleHttpErrors, makeOptions } from "../utils";
import configuration from "../settings";

const URL = configuration.URL + "/recipe";

const recipeFacade = (function() {
  function fetchAllRecipes() {
    const options = makeOptions("GET", true);
    const result = fetch(URL + "/all/", options).then(handleHttpErrors);
    return result;
  }

  function addEditRecipe(recipe) {
    let options;
    if (typeof recipe.id === "undefined") {
      options = makeOptions("POST", true, recipe);
    } else {
      options = makeOptions("PUT", true, recipe);
    }
    return fetch(URL, options).then(handleHttpErrors);
  }

  function deleteRecipe(id) {
    const options = makeOptions("DELETE", true);
    return fetch(URL + "/" + id, options).then(handleHttpErrors);
  }

  function fetchAllIngredientItems() {
    const options = makeOptions("GET", true);
    const result = fetch(URL + "/items/", options).then(handleHttpErrors);
    return result;
  }

  /* function fetchAllPlans() {
    const result = fetch(URL + "/plans/", options).then(
      handleHttpErrors
    );
    return result;
  } */

  function savePlan(plan) {
    const fullPlan = { weekNo: 3, yearNo: 2020, recipeList: plan };
    const options = makeOptions("POST", true, fullPlan);
    const result = fetch(URL + "/plans/", options).then(handleHttpErrors);
    return result;
  }

  return {
    fetchAllRecipes: fetchAllRecipes,
    addEditRecipe: addEditRecipe,
    deleteRecipe: deleteRecipe,
    fetchAllIngredientItems: fetchAllIngredientItems,
    savePlan: savePlan
  };
})();

export default recipeFacade;
