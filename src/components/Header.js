import React from "react";
import { NavLink } from "react-router-dom";

const Header = ({ loginFacade, loggedIn }) => {
  const adminHeaders = loginFacade.isAdmin() ? (
    <li>
      <NavLink activeClassName="active" to="/editor">
        Edit/Add Recipe
      </NavLink>
    </li>
  ) : (
    ""
  );
  const headers = loggedIn ? (
    <div>
      <li>
        <NavLink activeClassName="active" to="/browse">
          Browse Recipes
        </NavLink>
      </li>
      {adminHeaders}
      <li>
        <NavLink activeClassName="active" to="/logout">
          Log Out
        </NavLink>
      </li>
    </div>
  ) : (
    <div>
      <li>
        <NavLink activeClassName="active" to="/login">
          Log In
        </NavLink>
      </li>
    </div>
  );
  return <ul className="header">{headers}</ul>;
};

export default Header;
