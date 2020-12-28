import React, { Component } from "react";
import Header from "@/components/Header/Header";
import { Link } from "react-router-dom";

import style from "./Home.module.scss";

import cs from "classnames";

import Station from "./components/Station";
import Time from "./components/Time";
import SpeedRail from "./components/SpeedRail";
class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className={cs(style.homeContent)}>
          <div className={cs(style.bgImage)}></div>
          <div className={cs(style.searchBox)}>
            <Station />
            <Time />
            <SpeedRail />
            <div className={style.searchBtn}>
              <Link to="/trainList">
                <button>搜索</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
