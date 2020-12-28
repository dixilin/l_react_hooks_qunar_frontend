import React from "react";
import { withRouter } from "react-router-dom";
import style from "./Time.module.scss";

import { connect } from "react-redux";
import {formatDate,formatWeek} from "@/utils/common";
const TimeCpn = (props) => {
  const toDatePage = () => {
    props.history.push("/datePage");
  };

  const { selectedDate } = props;

  return (
    <div className={style.time} onClick={toDatePage}>
      <span>{formatDate(selectedDate)}</span>
      <span>{formatWeek(selectedDate)}</span>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { selectedDate } = state.home;
  return {
    selectedDate,
  };
};

export default withRouter(connect(mapStateToProps)(TimeCpn));
