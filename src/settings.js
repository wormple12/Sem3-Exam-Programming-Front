// for development:
//const URL = "http://localhost:8080/Sem3-Exam-Programming-Back/api";
// actual deployed backend:
const URL = "https://www.helvedesmaskine.dk/Sem3-Exam-Programming-Back/api";

const configuration = (function() {
  return {
    URL: URL
  };
})();

export default configuration;

/*
  Add configuration constants
  Return them as objects
  import configuration from "./settings";
  Const URL = configuration.URL;
*/
