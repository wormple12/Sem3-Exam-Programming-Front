import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { catchHttpErrors } from "../../utils";

const WeekMenuPlan = props => {
  const { recipeFacade, currentChoice, setCurrentChoice } = props;

  const match = useRouteMatch();

  // make it possible to display undefined menu plans:
  let plan = [...currentChoice];
  for (let i = 0; i < 7; i++) {
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
              .then(() => {})
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
      <p>You still need {7 - currentChoice.length} recipes.</p>
      <ul className="list-group comConstructionList">
        <li key="monday" className="list-group-item">
          <b>Monday:</b> <RecipeLink match={match} recipe={plan[0]} />
        </li>
        <li key="tuesday" className="list-group-item">
          <b>Tuesday:</b> <RecipeLink match={match} recipe={plan[1]} />
        </li>
        <li key="wednesday" className="list-group-item">
          <b>Wednesday:</b> <RecipeLink match={match} recipe={plan[2]} />
        </li>
        <li key="thursday" className="list-group-item">
          <b>Thursday:</b> <RecipeLink match={match} recipe={plan[3]} />
        </li>
        <li key="friday" className="list-group-item">
          <b>Friday:</b> <RecipeLink match={match} recipe={plan[4]} />
        </li>
        <li key="saturday" className="list-group-item">
          <b>Saturday:</b> <RecipeLink match={match} recipe={plan[5]} />
        </li>
        <li key="sunday" className="list-group-item">
          <b>Sunday:</b> <RecipeLink match={match} recipe={plan[6]} />
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

const RecipeLink = ({ match, recipe }) => {
  return recipe.id !== undefined ? (
    <Link
      to={`${match.url}/${recipe.id}`}
      style={{ color: "black", textDecoration: "none" }}
    >
      {recipe.title}
    </Link>
  ) : (
    ""
  );
};

export default WeekMenuPlan;
