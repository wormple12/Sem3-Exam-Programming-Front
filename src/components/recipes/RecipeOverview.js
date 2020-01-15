import React from "react";
import { Route, useRouteMatch, Link } from "react-router-dom";
import RecipeInfo from "./RecipeInfo";
import comparePlanToStorage from "../../storageCalc";

const RecipeOverview = props => {
  const {
    loginFacade,
    recipeFacade,
    recipes,
    recipeDetails,
    setRecipeDetails,
    setEditorRecipe,
    currentChoice,
    setCurrentChoice,
    updateRecipeList,
    ingredients,
    filterName,
    setFilterName
  } = props;
  const match = useRouteMatch();

  const handleFilterChange = event => {
    const value = event.target.value;
    setFilterName(value);
  };

  return (
    <div>
      <h3>List of Recipes</h3>
      <form className="form-horizontal" onChange={handleFilterChange}>
        <div className="form-group">
          <div className="col-sm-9">
            <input
              className="form-control"
              type="text"
              id="filterName"
              placeholder="Filter Name"
              defaultValue={filterName}
            />
          </div>
        </div>
      </form>
      <RecipeList
        match={match}
        loginFacade={loginFacade}
        recipeFacade={recipeFacade}
        recipes={recipes}
        setEditorRecipe={setEditorRecipe}
        currentChoice={currentChoice}
        setCurrentChoice={setCurrentChoice}
        updateRecipeList={updateRecipeList}
        ingredients={ingredients}
      />

      <Route
        path={`${match.path}/:id`}
        render={({ match }) => (
          <RecipeInfo
            match={match}
            recipes={recipes}
            recipeDetails={recipeDetails}
            setRecipeDetails={setRecipeDetails}
          />
        )}
      />
    </div>
  );
};

const RecipeList = ({
  match,
  loginFacade,
  recipeFacade,
  recipes,
  setEditorRecipe,
  currentChoice,
  setCurrentChoice,
  updateRecipeList,
  ingredients
}) => {
  const addToPlan = (evt, recipe) => {
    evt.preventDefault();
    if (currentChoice.length < 7) {
      let compareMsg = comparePlanToStorage(currentChoice, ingredients, recipe);
      if (compareMsg === "OK") {
        setCurrentChoice([...currentChoice, recipe]);
      } else {
        alert(compareMsg);
      }
    } else {
      alert("There's only seven days in a week!");
    }
  };

  const editDeleteButtons = recipe => {
    if (loginFacade.isAdmin()) {
      return (
        <span>
          <span className="badge">
            <Link to={`/editor`}>
              <button
                onClick={e => {
                  setEditorRecipe(recipe);
                }}
              >
                Edit
              </button>
            </Link>
          </span>
          <span className="badge">
            <button
              onClick={e => {
                e.preventDefault();
                recipeFacade
                  .deleteRecipe(recipe.id)
                  .then(update => updateRecipeList());
              }}
            >
              Delete
            </button>
          </span>
        </span>
      );
    }
  };

  if (recipes.length === 0) return <h5>The list is loading (or empty).</h5>;
  return (
    <ul className="list-group">
      {recipes.map(recipe => {
        return (
          <li key={recipe.id} className="list-group-item">
            {recipe.title}{" "}
            <span className="badge">
              <Link to={`${match.url}/${recipe.id}`}>
                <button>Details</button>
              </Link>
            </span>{" "}
            <span className="badge">
              <button onClick={evt => addToPlan(evt, recipe)} value={recipe.id}>
                Add to this week's menu plan
              </button>
            </span>
            {editDeleteButtons(recipe)}
          </li>
        );
      })}
    </ul>
  );
};

export default RecipeOverview;
