import React from "react";
import { Route, useRouteMatch, Link } from "react-router-dom";
import RecipeInfo from "./RecipeInfo";

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
    updateRecipeList
  } = props;
  const match = useRouteMatch();
  return (
    <div>
      <h3>List of Recipes</h3>
      <RecipeList
        match={match}
        loginFacade={loginFacade}
        recipeFacade={recipeFacade}
        recipes={recipes}
        setEditorRecipe={setEditorRecipe}
        currentChoice={currentChoice}
        setCurrentChoice={setCurrentChoice}
        updateRecipeList={updateRecipeList}
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
  updateRecipeList
}) => {
  const addToPlan = (evt, recipe) => {
    evt.preventDefault();
    if (currentChoice.length <= 7) {
      setCurrentChoice([...currentChoice, recipe]);
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
      <p>
        Number of recipes: <b>{recipes.length}</b>
      </p>
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
