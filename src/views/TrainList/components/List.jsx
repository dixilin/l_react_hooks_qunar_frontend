import React, { useEffect } from "react";
import style from "./List.module.scss";
import ListItem from "./ListItem";
import { connect } from "react-redux";

import { getTrainListAction } from "@/store/Home/action";
const List = (props) => {
  const { getTrainList, params } = props;
  useEffect(() => {
    getTrainList(params);
    // eslint-disable-next-line
  }, []);
  return (
    <ul className={style.list}>
      {params.trainData.trains &&
        params.trainData.trains.map((item, i) => {
          return <ListItem item={item} key={i} />;
        })}
    </ul>
  );
};

const mapStateToProps = (state) => {
  const params = state.home;
  return { params };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTrainList(params) {
      const action = getTrainListAction(params);
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
