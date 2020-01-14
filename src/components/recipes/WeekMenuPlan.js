import React from "react";
import { catchHttpErrors } from "../../utils";

const WeekMenuPlan = props => {
  const {
    recipeFacade,
    currentChoice,
    setCurrentChoice
    /* setAllPlans */
  } = props;

  // make it possible to display undefined menu plans:
  let plan = [...currentChoice];
  for (let i = 0; i < plan.length; i++) {
    if (plan[i] === undefined) {
      plan[i] = { title: "" };
    }
  }

  const SaveButton = () => {
    return (
      <div>
        <button
          onClick={() => {
            recipeFacade
              .savePlan(currentChoice)
              .then(() => {
                /* recipeFacade
                  .fetchAllPlans()
                  .then(plans => setAllPlans(plans))
                  .catch(catchHttpErrors); */
              })
              .catch(catchHttpErrors);
          }}
        >
          Save this menu plan
        </button>
      </div>
    );
  };

  return (
    <div>
      <h3>This Week's Menu Plan</h3>
      {/* DISPLAY CURRENT WEEK AND YEAR */}
      <br />
      <ul className="list-group com ConstructionList">
        <li key="monday" className="list-group-item">
          <b>Monday:</b> <RecipeLink recipe={plan[0]} />
        </li>
        <li key="tuesday" className="list-group-item">
          <b>Tuesday:</b> <RecipeLink recipe={plan[1]} />
        </li>
        <li key="wednesday" className="list-group-item">
          <b>Wednesday:</b> <RecipeLink recipe={plan[2]} />
        </li>
        <li key="thursday" className="list-group-item">
          <b>Thursday:</b> <RecipeLink recipe={plan[3]} />
        </li>
        <li key="friday" className="list-group-item">
          <b>Friday:</b> <RecipeLink recipe={plan[4]} />
        </li>
        <li key="saturday" className="list-group-item">
          <b>Saturday:</b> <RecipeLink recipe={plan[5]} />
        </li>
        <li key="sunday" className="list-group-item">
          <b>Sunday:</b> <RecipeLink recipe={plan[6]} />
        </li>
      </ul>
      <br />
      <button
        onClick={() => {
          setCurrentChoice([]);
        }}
      >
        Clear the plan
      </button>
      <SaveButton />
    </div>
  );
};

const RecipeLink = ({ recipe }) => {
  return (
    <li>
      <Link to={`${match.url}/${recipe.id}`} style={{ textDecoration: "none" }}>
        {recipe.title}
      </Link>
    </li>
  );
};

export default WeekMenuPlan;
