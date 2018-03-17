import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from "./pages/Home";
import City from "./pages/City";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch> //Switch says which ever route matches, show that one
          <Route path="/" exact component={Home} />
          <Route path="/:city" exact component={City} />
        </Switch>
      </BrowserRouter>
    )
  }
}
