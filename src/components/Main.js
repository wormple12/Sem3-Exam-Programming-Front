import React from "react";
import RecipeOverview from "./recipes/RecipeOverview";
import HardwareCategories from "./recipes/HardwareCategories";
import PrebuiltPCList from "./PrebuiltPCList";
import WeekMenuPlan from "./recipes/WeekMenuPlan";
import Svgs from "./recipes/Svgs";

const Home = props => {
  const {
    recipeFacade,
    loginFacade,
    loggedIn,
    recipes,
    recipeDetails,
    setRecipeDetails,
    setEditorRecipe,
    currentChoice,
    setCurrentChoice,
    updateRecipeList
    /* allPlans,
    setAllPlans */
  } = props;

  const userInfo = getUserInfo(loginFacade, loggedIn);

  return (
    <div className="container-fluid">
      <h1>Restaurant Planner</h1>
      {userInfo}
      <hr />
      <div className="row">
        <div className="bordered leftBox col-sm-9 col-md-7 col-lg-8">
          <RecipeOverview
            loginFacade={loginFacade}
            recipeFacade={recipeFacade}
            recipes={recipes}
            recipeDetails={recipeDetails}
            setRecipeDetails={setRecipeDetails}
            setEditorRecipe={setEditorRecipe}
            currentChoice={currentChoice}
            setCurrentChoice={setCurrentChoice}
            updateRecipeList={updateRecipeList}
          />
        </div>
        <div className="col-sm-3 col-md-5 col-lg-4">
          <div className="bordered rightBox">
            <WeekMenuPlan
              recipeFacade={recipeFacade}
              currentChoice={currentChoice}
              setCurrentChoice={setCurrentChoice}
              /* setAllPlans={setAllPlans} */
            />
            {/* <hr />
            <PrebuiltPCList
              allPlans={allPlans}
              setAllPlans={setAllPlans}
              setHardwareType={setHardwareType}
              setCurrentChoice={setCurrentChoice}
              loggedIn={loggedIn}
              recipeFacade={recipeFacade}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

function getUserInfo(loginFacade, loggedIn) {
  let userInfo = "";
  if (loggedIn) {
    const decoder = loginFacade.tokenDecoder();
    userInfo = (
      <div>
        <h5>
          You are logged in as {decoder.sub}, role: ({decoder.roles})
        </h5>
        <hr />
      </div>
    );
  }
  return userInfo;
}

export default Home;
