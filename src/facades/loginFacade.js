import configuration from "../settings";
import { handleHttpErrors } from "../utils";
import jwt_decode from "jwt-decode";

const URL = configuration.URL;

function loginFacade() {
  // SHOULDN'T BE HERE, BUT RATHER BE IMPORTED FROM UTILS.JS
  // CAN'T BECAUSE UTILS ALSO IMPORTS LOGINFACADE
  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  const tokenDecoder = () => {
    let decodedToken = jwt_decode(localStorage.getItem("jwtToken"));
    return decodedToken;
  };

  const isAdmin = () => {
    if (!loggedIn()) return false;
    const decoder = tokenDecoder();
    return decoder.roles.includes("admin");
  };

  const setToken = token => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  const login = (user, pass) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: pass
    });
    return fetch(URL + "/login", options)
      .then(handleHttpErrors)
      .then(res => {
        setToken(res.token);
      });
  };

  return {
    setToken: setToken,
    getToken: getToken,
    makeOptions: makeOptions,
    tokenDecoder: tokenDecoder,
    isAdmin: isAdmin,
    loggedIn: loggedIn,
    login: login,
    logout: logout
  };
}

let facade = loginFacade();
export default facade;
