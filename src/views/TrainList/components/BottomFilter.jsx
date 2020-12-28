import React from "react";
import style from "./BottomFilter.module.scss";

import { connect } from "react-redux";

import {
  getSwitchMenuStateAction,
  getTrainListAction,
  getTicketTypeAction,
  getTrainTypeAction,
  getDepStationAction,
  getArrStationAction,
} from "@/store/Home/action";
import cs from "classnames";

const BottomFilter = (props) => {
  const {
    params: { isOnlyHighSpeedRail },
    params,
    filterQuery,
    switchMenuState,
  } = props;
  const {
    sort,
    onlyTickets,
    filterStation,
    filterTicketType,
    filterTrainType,
  } = params.query;
  return (
    <div className={style.filterCon}>
      <div
        onClick={() => {
          const newParams = JSON.parse(JSON.stringify(params));
          newParams.query.sort = sort * 1 === 7 ? 0 : 7;
          filterQuery(newParams);
        }}>
        <i className='iconfont icon-shizhong'></i>
        {sort * 1 !== 7 ? "耗时 短→长" : "出发 早→晚"}
      </div>
      <div
        onClick={() => {
          const newParams = JSON.parse(JSON.stringify(params));
          if(!isOnlyHighSpeedRail){
            newParams.query.filterTrainType = "5,1";
            newParams.trainTypeSelected = [5, 1];
            newParams.isOnlyHighSpeedRail = true
          }else{
            newParams.query.filterTrainType = "";
            newParams.trainTypeSelected = [];
            newParams.isOnlyHighSpeedRail = false
          }
          filterQuery(newParams);
        }}
        className={cs({ [style.selected]: isOnlyHighSpeedRail})}>
        <i className='iconfont icon-jt_gaotie'></i>
        只看高铁动车
      </div>
      <div
        onClick={() => {
          const newParams = JSON.parse(JSON.stringify(params));
          newParams.query.onlyTickets = onlyTickets === 1 ? 0 : 1;
          filterQuery(newParams);
        }}
        className={cs({ [style.selected]: onlyTickets === 1 })}>
        <i className='iconfont icon-piao'></i>
        只看有票
      </div>
      <div
        className={cs({
          [style.selected]:
            filterStation || filterTicketType || filterTrainType,
        })}
        onClick={() => {
          switchMenuState(!params.menuShow, params.query);
        }}>
        <i className='iconfont icon-funnel'></i>
        综合筛选
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const params = state.home;
  return {
    params,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterQuery(newParams) {
      const action = getTrainListAction(newParams);
      dispatch(action);
    },
    switchMenuState(flag, query) {
      const action = getSwitchMenuStateAction(flag);
      if (!flag) {
        const oldTicketTypeSelected = query.filterTicketType
          ? query.filterTicketType.split(",").map((item) => item * 1)
          : [];
        const oldTrainTypeSelected = query.filterTrainType
          ? query.filterTrainType.split(",").map((item) => item * 1)
          : [];
        const oldDepStationSelected = query.filterDepStation
          ? query.filterDepStation.split(",")
          : [];
        const oldArrStationSelected = query.filterArrStation
          ? query.filterArrStation.split(",")
          : [];
        dispatch(getTicketTypeAction(oldTicketTypeSelected));
        dispatch(getTrainTypeAction(oldTrainTypeSelected));
        dispatch(getDepStationAction(oldDepStationSelected));
        dispatch(getArrStationAction(oldArrStationSelected));
      }
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomFilter);
