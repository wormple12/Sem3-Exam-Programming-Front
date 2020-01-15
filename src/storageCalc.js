//
function comparePlanToStorage(currentChoice, items, addedRecipe) {
  let chosenIngredients = [];

  currentChoice = [...currentChoice, addedRecipe];
  currentChoice.forEach(recipe => {
    recipe.ingredientList.forEach(ingr => {
      if (chosenIngredients[ingr.item.name] === undefined)
        chosenIngredients[ingr.item.name] = ingr.amount;
      else chosenIngredients[ingr.item.name] += ingr.amount;
    });
  });

  var key;
  for (key in chosenIngredients) {
    const ingrName = key;
    const ingrAmount = chosenIngredients[key];
    const matchingItem = items.find(item => item.name === ingrName);
    const storageAmount = matchingItem.storageAmount;
    if (ingrAmount > storageAmount) {
      return (
        "There's not enough of the required ingredient (" +
        key +
        ") in storage. Current amount in storage: " +
        storageAmount
      );
    }
  }

  return "OK";
}

export default comparePlanToStorage;
