import React from "react";
import "./style.scss";

import "@/styles/iconfont.css";

import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Home from "@/views/Home/Home";
import Date from "@/views/Date/Date";
import City from "@/views/City/City";
import TrainList from "@/views/TrainList";
import Card from "@/views/Card";


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/datePage" component={Date}/>
          <Route path="/cityPage" component={City}/>
          <Route path="/trainList" component={TrainList}/>
          <Route path="/card" component={Card}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
