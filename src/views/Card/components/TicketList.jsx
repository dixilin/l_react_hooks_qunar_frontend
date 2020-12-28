import React from "react";
import style from "./TicketList.module.scss";

export default (props) => {
  const { ticketInfos } = props;
  return (
    <ul className={style.lists}>
      {ticketInfos.map((item) => {
        return (
          <li className={style.list} key={item.ticketId}>
            <span>{item.type}</span>
            <span>￥{item.price}</span>
            <span>
              {item.action.clickable && !item.remainTicket
                ? ""
                : item.remainTicket}
            </span>
            <button className={!item.action.clickable ? style.disabled : ""}>
              {item.action.menu}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
