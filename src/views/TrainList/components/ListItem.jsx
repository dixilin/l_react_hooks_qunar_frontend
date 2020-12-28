import React from "react";
import { withRouter } from "react-router-dom";
import style from "./ListItem.module.scss";
import {connect} from 'react-redux'
import {getSearchAction} from '@/store/Home/action'

const ListItem = (props) => {
  const data = props.item;
  let ticketContent;
  if (data.trainStatus === 3 || data.trainStatus === 2) {
    ticketContent = (
      <span style={{ color: "#ccc" }}>{data.trainStatusDes}</span>
    );
  } else {
    if (data.trainShowDesc === "可抢票") {
      ticketContent = (
        <>
          <span>{data.priceMsg}</span>
          <span style={{ color: "#f90" }}>{data.trainShowDesc}</span>
        </>
      );
    } else {
      ticketContent = (
        <>
          <span>{data.priceMsg}</span>
          <span style={{ color: "#f90" }}>{data.remainTicket}</span>
        </>
      );
    }
  }
  const toCardPage = (data) => {
    if(data.trainStatus === 3 || data.trainStatus === 2) return 
    props.saveSearch(`trainNum=${data.trainNumber}&startCity=${data.dCity}&startStation=${data.dStation}&endCity=${data.aCity}&endStation=${data.aStation}&dptHm=${data.dTime}&date=${data.date}`)
    props.history.push('/card')
  }

  return (
    <li className={style.listItem} onClick={()=>{
      toCardPage(data)
    }}>
      <div className={style.ItemTime}>
        <span className={style.timeStart}>{data.dTime}</span>
        <span className={style.timeEnd}>
          {data.aTime}
          <i>{data.dayAfter}</i>
        </span>
      </div>
      <div className={style.itemStation}>
        <span>
          <i>始</i>
          {data.dStation}
        </span>
        <span>
          <i>终</i>
          {data.aStation}
        </span>
      </div>
      <div className={style.itemTrain}>
        <span>{data.trainNumber}</span>
        <span>{data.time}</span>
      </div>
      <div className={style.itemTicket}>{ticketContent}</div>
    </li>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveSearch(val){
      const action = getSearchAction(val)
      dispatch(action)
    }
  }
}

export default withRouter(connect(null,mapDispatchToProps)(ListItem));
