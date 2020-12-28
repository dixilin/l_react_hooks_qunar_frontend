import React, { useState, useEffect, useContext, createContext } from "react";
import { withRouter } from "react-router-dom";
import Header from "@/components/Header/Header";

import style from "./Date.module.scss";
import dayjs from "dayjs";

import cs from "classnames";

import { getChangeDateAction, getSearchAction } from "@/store/Home/action";

import { connect } from "react-redux";
import { baseUrl } from "@/config";

const JsonContext = createContext(null);
const DateItem = (props) => {
  const json = useContext(JsonContext);
  if (json) {
    const currentStamp = +dayjs(); //获取当前时间戳
    const currentDate = dayjs().format("YYYY-MM-DD");
    const { work, vacation } = json.WorkHoliday;
    const { HolidayData } = json;
    const { thisMonth, changeSearch, cardSearch } = props;
    const cYear = dayjs().month(thisMonth).year();
    const cMonth = dayjs().month(thisMonth).month() + 1;
    const dateEnd = dayjs().month(thisMonth).endOf("month").date();
    const dayStart = dayjs(`${cYear}-${cMonth}-1`).day();
    const dayEnd = dayjs().month(thisMonth).endOf("month").day();
    //每月总格子数
    const allCells = dateEnd + dayStart + (6 - dayEnd);
    let data = [];
    for (let i = 1; i <= allCells; i++) {
      if (i <= dayStart || i > dateEnd + dayStart) {
        data.push(null);
      } else {
        const val = i - dayStart;
        const day = dayjs(`${cYear}-${cMonth}-${i - dayStart}`).day();
        const date = dayjs(`${cYear}-${cMonth}-${i - dayStart}`).format(
          "YYYY-MM-DD"
        );
        const isPrev =
          +dayjs(`${cYear}-${cMonth}-${i - dayStart}`) - currentStamp <
          -1000 * 60 * 60 * 24;
        const isRest =
          ((day === 0 || day === 6) && !work.find((el) => date === el)) ||
          vacation.find((el) => date === el);

        let name = isRest ? "休" : work.find((el) => date === el) ? "班" : "";

        for (let k in HolidayData) {
          if (k === date) {
            name = HolidayData[k].holidayName;
            break;
          }
        }
        data.push({
          val,
          day,
          date,
          isPrev,
          isRest,
          name,
        });
      }
    }
    return (
      <div className={style.dateCon}>
        {data.map((item, idx) => {
          if (item) {
            return (
              <div
                key={idx}
                className={cs(
                  style.dayItem,
                  {
                    [style.restDay]: item.isRest,
                  },
                  {
                    [style.prevDay]: item.isPrev,
                  },
                  {
                    [style.selected]: item.date === props.selectedDate,
                  }
                )}
                onClick={() => {
                  if (item.isPrev) {
                    return;
                  }
                  if (cardSearch) {
                    let newSearch = cardSearch;
                    const str = "date=";
                    const idx = newSearch.lastIndexOf(str);
                    newSearch =
                      newSearch.slice(0, idx + str.length) + item.date;
                    changeSearch(newSearch);
                  }
                  props.changeDate(item.date);
                  props.history.go(-1);
                }}>
                <span className={style.topTip}>{item.name}</span>
                <span>{item.date === currentDate ? "今天" : item.val}</span>
              </div>
            );
          }
          return <div className={style.dayItem} key={idx}></div>;
        })}
      </div>
    );
  }
  return "";
};

const MonthItem = (props) => {
  const { thisMonth: month } = props;
  return (
    <div className={style.monthContainer}>
      <div className={style.title}>
        {dayjs(`${dayjs().year()}-${month + 1}`).format("YYYY年M月")}
      </div>
      <ul className={style.weekBanner}>
        <li>日</li>
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
      </ul>
      <WrapDateItem thisMonth={month} />
    </div>
  );
};

const Date = () => {
  const [holidayData, setHolidayData] = useState(null);
  useEffect(() => {
    fetch(baseUrl + "/WorkHoliday")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.status === 0) {
          setHolidayData(JSON.parse(json.conf));
        }
      });
  }, []);
  if (holidayData) {
    return (
      <div>
        <Header />
        <div className={style.dateContainer}>
          <JsonContext.Provider value={holidayData}>
            <MonthItem thisMonth={dayjs().month()} />
            <MonthItem thisMonth={dayjs().month() + 1} />
            <MonthItem thisMonth={dayjs().month() + 2} />
          </JsonContext.Provider>
        </div>
      </div>
    );
  }
  return "loading...";
};

const mapStateToProps = (state) => {
  const { selectedDate, cardSearch } = state.home;
  return {
    selectedDate,
    cardSearch,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeDate(date) {
      const action = getChangeDateAction(date);
      dispatch(action);
    },
    changeSearch(val) {
      const action = getSearchAction(val);
      dispatch(action);
    },
  };
};

const WrapDateItem = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DateItem)
);

export default Date;
