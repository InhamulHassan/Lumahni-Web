import React, { Component } from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { ThemeProvider } from "@material-ui/styles"; // Material helpers
import theme from "./theme"; // Theme
import Routes from "./Routes"; // Routes
import store from "./redux/store"; // Get Redux store

// Browser history
const browserHistory = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={browserHistory}>
            <Routes />
          </Router>
        </ThemeProvider>
      </Provider>
    );
  }
}
