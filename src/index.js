import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles"; // Material helpers
import theme from "./theme"; // Theme
import Routes from "./Routes"; // Routes
import history from "./helpers/history"; // Get browser History
import store from "./redux/store"; // Get Redux store
import httpService from "./helpers/httpService";

// call it afer we create the store and import history and you're good to go!
httpService.setupInterceptors(store, history);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Routes />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
