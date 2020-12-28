import React from "react";
import style from "./Content.module.scss";
export default (props) => {
  const {
    aTime,
    trainNumber,
    trainType,
    arrWeek,
    depWeek,
    dTime,
    timeCost,
    startStation,
    endStation,
    depDataValue,
    arrDataValue,
  } = props.content;
  return (
    <div className={style.content} onClick={()=>{
      props.setFlag(false)
    }}>
      <ul className={style.left}>
        <li className={style.city}>{startStation}</li>
        <li className={style.time}>{dTime}</li>
        <li className={style.date}>
          {depDataValue}
          <span>{depWeek}</span>
        </li>
      </ul>
      <ul className={style.middle}>
        <li className={style.trainName}>
          {trainNumber}
          <span>{trainType}</span>
        </li>
        <li className={style.trainMid}>
          <span className={style.trainMidLeft}></span>
          <span className={style.timer}>时刻表</span>
          <span className={style.trainMidRight}></span>
        </li>
        <li className={style.trainTime}>{timeCost}</li>
      </ul>
      <ul className={style.right}>
        <li className={style.city}>{endStation}</li>
        <li className={style.time}>{aTime}</li>
        <li className={style.date}>
          {arrDataValue}
          <span>{arrWeek}</span>
        </li>
      </ul>
    </div>
  );
};
