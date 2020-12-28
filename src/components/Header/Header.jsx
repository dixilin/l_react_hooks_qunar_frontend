import React, { Component } from "react";
import style from "./Header.module.scss";
import { withRouter } from "react-router-dom";

import cs from "classnames";

class Header extends Component {
  render() {
    return (
      <div className={style.header}>
        <i
          style={{
            visibility: window.location.hash === "#/" ? "hidden" : "visible",
          }}
          className={cs("iconfont", "icon-left", { [style.headerLeft]: true })}
          onClick={() => {
            this.props.history.go(-1);
          }}></i>
        <h1 className={style.headerCenter}>
          {this.props.title ? this.props.title : "火车票"}
        </h1>
        <span className={style.headerRight}></span>
      </div>
    );
  }
}
export default withRouter(Header);
