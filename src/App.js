import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "./App.css";
import { catchHttpErrors } from "./utils";
import LogIn from "./components/users/LogIn";
import Header from "./components/Header";
import CreateRecipePage from "./components/recipes/CreateRecipePage";
import Main from "./components/Main";

function App({ loginFacade, recipeFacade }) {
  const [loggedIn, setLoggedIn] = useState(loginFacade.loggedIn());
  // recipe browsing hooks:
  const [recipes, setRecipes] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState("");
  // recipe creation hook:
  let [editorRecipe, setEditorRecipe] = useState({});
  // plan calendar hooks:
  const [allPlans, setAllPlans] = useState([]);
  // menu plan hooks:
  const [currentChoice, setCurrentChoice] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      setRecipes([]);
      setRecipeDetails("");
      setEditorRecipe({}); // reset all input fields
      updateRecipeList();
    }
  }, [loggedIn]);

  function updateRecipeList() {
    recipeFacade
      .fetchAllRecipes()
      .then(recipes => setRecipes(recipes))
      .catch(catchHttpErrors);
  }

  /* useEffect(() => {
    recipeFacade
      .fetchAllPlans()
      .then(plans => setAllPlans(plans))
      .catch(catchHttpErrors);
  }, []); */

  const LogOut = () => {
    loginFacade.logout();
    setLoggedIn(false);
    return <Redirect to="/" />;
  };

  const NoMatch = () => {
    return <h3>The page was not found.</h3>;
  };

  const Welcome = () => {
    return (
      <h3>Welcome to the Restaurant Planner. Please log in to continue.</h3>
    );
  };

  return (
    <Router>
      <Header loginFacade={loginFacade} loggedIn={loggedIn} />
      <div className="mainContainer">
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route path="/browse">
            <Main
              loginFacade={loginFacade}
              loggedIn={loggedIn}
              recipeFacade={recipeFacade}
              recipes={recipes}
              recipeDetails={recipeDetails}
              setRecipeDetails={setRecipeDetails}
              setEditorRecipe={setEditorRecipe}
              currentChoice={currentChoice}
              setCurrentChoice={setCurrentChoice}
              updateRecipeList={updateRecipeList}
              /* allPlans={allPlans}
              setAllPlans={setAllPlans} */
            />
          </Route>
          <Route path="/editor">
            <CreateRecipePage
              recipeFacade={recipeFacade}
              editorRecipe={editorRecipe}
              setEditorRecipe={setEditorRecipe}
              updateRecipeList={updateRecipeList}
            />
          </Route>
          <Route path="/login">
            <LogIn
              apiFacade={loginFacade}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
            />
          </Route>
          <Route path="/logout">
            <LogOut />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
