import React, { Component } from "react";
import { withRouter} from "react-router-dom";
import style from "./Station.module.scss";
import cs from "classnames";

import { connect } from "react-redux";
import {getSwitchCityAction} from '@/store/Home/action'

class HomeStation extends Component {
  render() {
    const { startCity, terminalCity } = this.props;
    return (
      <div className={style.station}>
        <div
          onClick={() => {
            this.toCityPage("start");
          }}>
          {startCity}
        </div>
        <i className={cs("iconfont icon-switch")} onClick={this.props.switchCity}></i>
        <div
          onClick={() => {
            this.toCityPage("terminal");
          }}>
          {terminalCity}
        </div>
      </div>
    );
  }
  toCityPage = (query) => {
    this.props.history.push("/cityPage?from=" + query);
  };
}

const mapStateToProps = (state) => {
  const { startCity, terminalCity } = state.home;
  return {
    startCity,
    terminalCity,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    switchCity(){
      const action = getSwitchCityAction()
      dispatch(action)
    }
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HomeStation));
