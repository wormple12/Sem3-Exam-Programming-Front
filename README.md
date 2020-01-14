3. Semester, Exam

Sem3-Exam-Front

Deployment Examples:
=====================
Back end deployed at: https://helvedesmaskine.dk/Sem3-Project

Front end deployed at http://teamone-sem3-exam-project.surge.sh/

Open API: https://helvedesmaskine.dk/Sem3-Project/openapi/

Group: Team One
=======================
Lukas Bjørnvad

Rasmus Prætorius
https://github.com/Rasm-P

Simon Norup

Henning Wiberg

Group Contract
==================
Respect your group members and their work. Try to avoid working on features that other members are currently working on.

If you want to change other members' work, contact them and coordinate.

Whenever you have made a small feature, do the following:

- Test that everything works

- Git add + git commit (with descriptive message)

- Git pull to see if anyone else has pushed, fix possible merge conflicts

- If any changes occured; begin from point 1 again

- Git push

- Tell other members to pull.

- Always wait for other members to finish pushing before pushing a feature yourself.


Instructions
==================
Preconditions:
In order to use this code, you should have a local developer setup + a "matching" droplet on Digital Ocean as described in the 3. semester guidelines^

To set up the project frontend, do the following:
- do "npm install" and "npm install react-router-dom"
- Change the URL in settings.js
- to deploy the project with surge: (1) do "npm install -g surge", (2) do "npm run build", and (3) do "surge --project ./build --domain YourDomainName.surge.sh"

Create-React-App Info
=====================
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
