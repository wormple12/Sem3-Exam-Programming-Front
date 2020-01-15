import React, { useEffect, useState } from "react";
import { Prompt, Redirect } from "react-router-dom";
import { catchHttpErrors } from "../../utils";

const CreateRecipePage = ({
  recipeFacade,
  editorRecipe,
  setEditorRecipe,
  updateRecipeList,
  ingredients
}) => {
  if (editorRecipe === undefined) return <Redirect to="/browse" />;
  if (editorRecipe.ingredientList === undefined) {
    editorRecipe = { ...editorRecipe, ingredientList: [] };
  }

  const handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.id;
    setEditorRecipe({ ...editorRecipe, [name]: value });
  };

  function handleSubmit(event) {
    event.preventDefault();
    recipeFacade
      .addEditRecipe(editorRecipe)
      .then(() => {
        alert(`You created a new recipe!`);
        updateRecipeList();
      })
      .catch(catchHttpErrors);
    setEditorRecipe({});
    event.target.reset();
  }

  return (
    <div>
      <h2>Add/Edit Recipe</h2>
      <form
        className="form-horizontal"
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      >
        <InputFields
          editorRecipe={editorRecipe}
          setEditorRecipe={setEditorRecipe}
          ingredients={ingredients}
        />
        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <button type="submit" className="btn btn-primary">
              Add/Edit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const InputFields = ({ editorRecipe, setEditorRecipe, ingredients }) => {
  return (
    <div>
      <div className="form-group">
        <div className="col-sm-9">
          <input
            className="form-control"
            type="text"
            id="title"
            placeholder="Enter Title"
            defaultValue={editorRecipe.title}
            required
          />
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-9">
          <input
            className="form-control"
            type="number"
            id="preparationTime"
            placeholder="Enter preparation time (minutes)"
            defaultValue={editorRecipe.preparationTime}
            required
          />
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-9">
          <textarea
            className="form-control"
            id="directions"
            rows="5"
            placeholder="Enter directions"
            defaultValue={editorRecipe.directions}
          />
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-9">
          <h5>Ingredients:</h5>
          {editorRecipe.ingredientList.map(i => {
            return (
              <p>
                {i.item.name}, {i.amount} grams
              </p>
            );
          })}
          <select className="form-control" id="ingrDropdown">
            {ingredients.map(i => {
              return <option>{i.name}</option>;
            })}
          </select>
          <input
            className="form-control"
            type="number"
            id="ingrAmount"
            placeholder="Enter amount (grams)"
            defaultValue={0}
          />
          <button
            onClick={e => {
              e.preventDefault();
              var dropdown = document.getElementById("ingrDropdown");
              var selection = dropdown.options[dropdown.selectedIndex].text;
              setEditorRecipe({
                ...editorRecipe,
                ingredientList: [
                  ...editorRecipe.ingredientList,
                  {
                    item: ingredients.find(i => {
                      return i.name === selection;
                    }),
                    amount: document.getElementById("ingrAmount").value
                  }
                ]
              });
            }}
          >
            Add Ingredient
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipePage;
