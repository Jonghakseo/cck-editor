import React from "react";
import "./App.css";
import { Theme } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { Provider } from "react-redux";
import store from "./redux/store";
import MainPage from "./pages";

function App() {
  return (
    <Provider store={store}>
      {/*<ThemeProvider theme={Theme}>*/}
        {/*<GlobalStyles />*/}
        <div className="App">
          <MainPage/>
        </div>
      {/*</ThemeProvider>*/}
    </Provider>
  );
}

export default App;
