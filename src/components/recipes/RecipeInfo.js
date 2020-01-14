import React from "react";

const RecipeInfo = ({ match, recipes, recipeDetails, setRecipeDetails }) => {
  let result;
  const recipe = recipes.find(x => {
    return x.id == match.params.id;
  });
  if (recipeDetails !== "" && recipeDetails === recipe) {
    result = recipeDetails;
  } else {
    if (recipe === undefined) {
      result = ""; //<Redirect to="/browse" />;
    } else {
      setRecipeDetails(recipe);
      result = recipeDetails;
    }
  }
  return (
    <div>
      <hr />
      <h4>{result.title}</h4>
      <b>Preparation Time:</b> {result.preparationTime}
      <br />
      <b>Ingredients:</b>
      <ul className="list-group">
        {result.ingredientList.map(i => {
          return (
            <li key={i.id} className="list-group-item">
              {i.item.name}, {i.amount} grams
            </li>
          );
        })}
      </ul>
      <b>Directions:</b> {result.directions}
    </div>
  );
};

export default RecipeInfo;
