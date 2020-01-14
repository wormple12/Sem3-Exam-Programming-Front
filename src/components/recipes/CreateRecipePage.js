import React, { useState } from "react";
import { Prompt, Redirect } from "react-router-dom";
import { catchHttpErrors } from "../../utils";

const CreateRecipePage = ({
  recipeFacade,
  editorRecipe,
  setEditorRecipe,
  updateRecipeList
}) => {
  let [isBlocking, setIsBlocking] = useState(false);
  if (editorRecipe === undefined) return <Redirect to="/browse" />;

  const handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.id;
    setEditorRecipe({ ...editorRecipe, [name]: value });
    setIsBlocking(true);
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
    setIsBlocking(false);
  }

  return (
    <div>
      <h2>Add/Edit Recipe</h2>
      <form
        className="form-horizontal"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <Prompt
          when={isBlocking}
          message={location =>
            `Are you sure you want to go to ${location.pathname}`
          }
        />
        <InputFields editorRecipe={editorRecipe} />
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

const InputFields = ({ editorRecipe }) => {
  return (
    <div>
      <div className="form-group">
        <div className="col-sm-9">
          <input
            className="form-control"
            id="title"
            placeholder="Enter Title"
            defaultValue={editorRecipe.title}
          />
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-9">
          <input
            className="form-control"
            id="preparationTime"
            placeholder="Enter preparation time"
            defaultValue={editorRecipe.preparationTime}
          />
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-9">
          <input
            className="form-control"
            id="directions"
            placeholder="Enter directions"
            defaultValue={editorRecipe.directions}
          />
        </div>
      </div>
      {/* dropdown menus with all items + input fields with amount */}
    </div>
  );
};

export default CreateRecipePage;
