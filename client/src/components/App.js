import React, { Component } from "react";
import gql from "graphql-tag";
import TacoIndex from './tacos/TacoIndex';
import Login from "./Login";
import Register from "./Register";
import RestuarantIndex from './restaurants/RestaurantIndex';
import TacoShow from './tacos/TacoShow';
import { Route, HashRouter, Switch } from 'react-router-dom';


const App = () => {
  return (
      <HashRouter>
        <Route exact path="/restaurants" component={RestuarantIndex} />
        <Route exact path="/" component={TacoIndex} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/tacoshow/:id" component={TacoShow} />
      </HashRouter>
  );
};

export default App;
