import React from "react";
import style from "./Calender.module.scss";
import cs from "classnames";
const Calender = (props) => {
  const { stations, flag, setFlag } = props;
  return (
    <div
      className={cs(style.mask, { hidden: flag })}
      onClick={() => {
        setFlag(true);
      }}>
      <div
        className={style.pop}
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <h2>列车时刻表</h2>
        <div className={style.title}>
          <div className={style.titleLeft}></div>
          <div className={style.titleRight}>
            <div>车站</div>
            <div>到达</div>
            <div>发车</div>
            <div>停留时间</div>
          </div>
        </div>
        {stations &&
          stations.map((item) => {
            return (
              <div className={style.lists} key={item.no}>
                <div className={style.left}>
                  <span>{item.no}</span>
                </div>
                <div className={style.right}>
                  <div>{item.name}</div>
                  <div>{item.arrTime}</div>
                  <div>{item.depTime}</div>
                  <div>{!item.stayTime ? "-" : item.stayTime}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Calender;
