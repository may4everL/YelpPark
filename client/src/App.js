import React, { Component, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getParks } from './actions/parks'
import Parks from "./components/parks";
import Navbar from "./components/navbar";
import NotFound from "./components/notFound";
import NewPark from "./components/newPark";

class App extends Component {
  render() {
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(getParks);
    }, [dispatch])
    const navBarItem = [
      { label: "parks", to: "/stateparks" },
      { label: "Login", to: "/login" },
      { label: "Signup", to: "/sign" }
    ];
    const brand = "YelpPark";
    return (
      <React.Fragment>
        <Navbar navItems={navBarItem} brand={brand} />
        <Switch>
          <Route path="/not-found" component={NotFound} />
          <Route path="/stateparks/new" component={NewPark} />
          <Route path="/stateparks/:id" />
          <Route path="/stateparks" exact component={Parks} />
          <Redirect to="/stateparks" exact from="/" />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
