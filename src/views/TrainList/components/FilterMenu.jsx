import React, { useCallback } from "react";
import style from "./FilterMenu.module.scss";
import cs from "classnames";
import { connect } from "react-redux";

import {
  getTicketTypeAction,
  getTrainTypeAction,
  getDepStationAction,
  getArrStationAction,
  getTrainListAction,
} from "@/store/Home/action";

const FilterMenu = (props) => {
  const {
    menuShow,
    trainData,
    confirmMenu,
    resetMenu,
    params,
    ticketTypeSelected,
    selectedTicketTypeItem,
    trainTypeSelected,
    selectedTrainTypeItem,
    depStationSelected,
    selectedDepStationItem,
    arrStationSelected,
    selectedArrStationItem,
    
  } = props;

  let ticketType = [],
    trainType = [],
    depStation = [],
    arrStation = [];
  if (trainData.filter) {
    ticketType = trainData.filter.ticketType;
    trainType = trainData.filter.trainType;
    depStation = trainData.filter.depStation;
    arrStation = trainData.filter.arrStation;
  }

  const handleClick = useCallback((item, tempArr, cb, isNum) => {
    const val = isNum ? item.value * 1 : item.value;
    const idx = tempArr.findIndex((k) => k === val);
    idx === -1 ? tempArr.push(val) : tempArr.splice(idx, 1);
    cb(tempArr);
  }, []);

  return (
    <div
      className={cs(style.filterModel, {
        hidden: !menuShow,
      })}>
      <div className={cs(style.filterMenu)}>
        <div className={style.title}>
          <span
            onClick={() => {
              resetMenu(JSON.parse(JSON.stringify(params)));
            }}>
            重置
          </span>
          <span
            onClick={() => {
              const newParams = JSON.parse(JSON.stringify(params));
              newParams.query.filterTicketType = [...ticketTypeSelected].join(",");
              newParams.query.filterTrainType = [...trainTypeSelected].join(",");
              newParams.query.filterDepStation = [...depStationSelected].join(",");
              newParams.query.filterArrStation = [...arrStationSelected].join(',');
              confirmMenu(newParams);
            }}>
            确定
          </span>
        </div>
        <div className={style.options}>
          <div className={style.optionItem}>
            <h3>坐席类型</h3>
            <ul>
              {ticketType.length &&
                ticketType.map((item) => {
                  return (
                    <li
                      key={item.value}
                      className={
                        ticketTypeSelected.includes(item.value * 1)
                          ? style.selected
                          : ""
                      }
                      onClick={() => {
                        handleClick(
                          item,
                          [...ticketTypeSelected],
                          selectedTicketTypeItem,
                          true
                        );
                      }}>
                      {item.name}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className={style.optionItem}>
            <h3>车次类型</h3>
            <ul>
              {trainType.length &&
                trainType.map((item) => {
                  return (
                    <li
                      key={item.value}
                      className={
                        trainTypeSelected.includes(item.value * 1)
                          ? style.selected
                          : ""
                      }
                      onClick={() => {
                        handleClick(
                          item,
                          [...trainTypeSelected],
                          selectedTrainTypeItem,
                          true
                        );
                      }}>
                      {item.name}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className={style.optionItem}>
            <h3>出发车站</h3>
            <ul>
              {depStation.length &&
                depStation.map((item) => {
                  return (
                    <li
                      key={item.value}
                      className={
                        depStationSelected.includes(item.value)
                          ? style.selected
                          : ""
                      }
                      onClick={() => {
                        handleClick(
                          item,
                          [...depStationSelected],
                          selectedDepStationItem
                        );
                      }}>
                      {item.name}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className={style.optionItem}>
            <h3>到达车站</h3>
            <ul>
              {arrStation.length &&
                arrStation.map((item) => {
                  return (
                    <li
                      key={item.value}
                      className={
                        arrStationSelected.includes(item.value)
                          ? style.selected
                          : ""
                      }
                      onClick={() => {
                        handleClick(
                          item,
                          [...arrStationSelected],
                          selectedArrStationItem
                        );
                      }}>
                      {item.name}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    menuShow,
    trainData,
    ticketTypeSelected,
    trainTypeSelected,
    depStationSelected,
    arrStationSelected,
  } = state.home;
  return {
    menuShow,
    trainData,
    ticketTypeSelected,
    trainTypeSelected,
    depStationSelected,
    arrStationSelected,
    params: state.home,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectedTicketTypeItem(val) {
      const action = getTicketTypeAction(val);
      dispatch(action);
    },
    selectedTrainTypeItem(val) {
      const action = getTrainTypeAction(val);
      dispatch(action);
    },
    selectedDepStationItem(val) {
      const action = getDepStationAction(val);
      dispatch(action);
    },
    selectedArrStationItem(val) {
      const action = getArrStationAction(val);
      dispatch(action);
    },
    confirmMenu(params) {
      const action = getTrainListAction(params);
      dispatch(action);
    },
    resetMenu(params) {
      params.arrStationSelected = params.depStationSelected = params.ticketTypeSelected = params.trainTypeSelected = [];
      params.query.filterDepStation =  params.query.filterArrStation = params.query.filterTicketType = params.query.filterTrainType =
        "";
      params.isOnlyHighSpeedRail = false
      const action = getTrainListAction(params);
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterMenu);
