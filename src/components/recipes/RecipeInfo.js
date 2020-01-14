import React from "react";

const RecipeInfo = ({ match, recipes, recipeDetails, setRecipeDetails }) => {
  const recipe = recipes.find(x => {
    return x.id == match.params.id;
  });
  if (recipeDetails === recipe) {
    // all is good, carry on
  } else {
    if (recipe === undefined) {
      return ""; //<Redirect to="/browse" />;
    } else {
      setRecipeDetails(recipe);
    }
  }
  if (recipeDetails === "") return "";
  return (
    <div>
      <hr />
      <h4>{recipeDetails.title}</h4>
      <p>
        <b>Preparation Time:</b> {recipeDetails.preparationTime} minutes
      </p>
      <p>
        <b>Ingredients:</b>
      </p>
      <ul className="list-group">
        {recipeDetails.ingredientList.map(i => {
          return (
            <li key={i.id} className="list-group-item">
              {i.item.name}, {i.amount} grams
            </li>
          );
        })}
      </ul>
      <br />
      <p>{recipeDetails.directions}</p>
    </div>
  );
};

export default RecipeInfo;
