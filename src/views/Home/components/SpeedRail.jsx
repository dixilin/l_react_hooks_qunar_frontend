import React from "react";
import style from "./SpeedRail.module.scss";
import cs from "classnames";

import { connect } from "react-redux";
import {
  getIsOnlyHighSpeedRailAction,
  getTrainTypeAction,
  getFilterTrainType,
} from "@/store/Home/action";

const HomeStation = (props) => {
  const { isOnlyHighSpeedRail, handleClick } = props;
  return (
    <div className={style.speedRail}>
      <div
        onClick={() => {
          handleClick(!isOnlyHighSpeedRail);
        }}>
        <i
          className={cs("iconfont icon-xuanzhong", {
            [style.selected]: isOnlyHighSpeedRail,
          })}></i>
        <span>只看高铁/动车</span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { isOnlyHighSpeedRail } = state.home;
  return {
    isOnlyHighSpeedRail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick(val) {
      const action = getIsOnlyHighSpeedRailAction(val);
      dispatch(action);
      dispatch(getTrainTypeAction([5, 1]));
      dispatch(getFilterTrainType(val ? "5,1" : ""));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeStation);
