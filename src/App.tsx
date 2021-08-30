import React from "react";
import "./App.css";
import { Theme } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { Provider } from "react-redux";
import store from "./redux/store";
import MainPage from "./pages";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import MapPage from "./pages/map";
import URLS from "./routes/urls";

function App() {
  return (
    <Provider store={store}>
      {/*<ThemeProvider theme={Theme}>*/}
      {/*<GlobalStyles />*/}
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path={URLS.MAIN_PAGE} exact component={MainPage} />
            <Route path={URLS.MAP} exact component={MapPage} />
          </Switch>
        </BrowserRouter>
      </div>
      {/*</ThemeProvider>*/}
    </Provider>
  );
}

export default App;
