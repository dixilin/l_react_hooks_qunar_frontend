import React, { useState, useEffect, useRef } from "react";

import cityData from "@/lib/cities.json";
import style from "./cityList.module.scss";

import CityAsideBar from "./CityAsideBar";

import { withRouter, Link } from "react-router-dom";

import { connect } from "react-redux";

import { getChangeCityAction } from "@/store/Home/action";

const SameLetterCities = (props) => {
  const { item } = props;
  const search = props.history.location.search;
  if (!item.citys || !item.citys.length) {
    return (
      <div className={style.itemsList}>
        <h3 className={style.title} data-title={item.title}>
          {item.title}
        </h3>
      </div>
    );
  }
  return (
    <div className={style.itemsList}>
      <h3 className={style.title} data-title={item.title}>
        {item.title}
      </h3>
      <ul>
        {item.citys.map((cItem, i) => {
          return (
            <Link to='/' key={i}>
              <li
                className={style.cItemName}
                onClick={() => {
                  props.changeCity({ cityName: cItem.name, search });
                }}>
                {cItem.name}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

const CityList = () => {
  const [YData, setYData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [areaHeight, setAreaHeight] = useState(null);

  const wrapperRef = useRef(null);
  const cityConRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    setAreaHeight(wrapper.offsetHeight);
    let tempData = [0];
    let initY = 0;
    Array.from(cityConRef.current.children).forEach((item) => {
      initY += item.offsetHeight;
      tempData.push(initY);
    });
    setYData(tempData);
  }, []);

  const changeIndex = (i) => {
    wrapperRef.current.scrollTop = YData[i];
    setCurrentIndex(i);
  };

  const watchScroll = (e) => {
    const y = e.target.scrollTop;
    const index = YData.findIndex(
      (item, idx) => y >= item && y < YData[idx + 1]
    );
    setCurrentIndex(index);
  };

  return (
    <div className={style.containerOutside}>
      <div
        className={style.contentWrapper}
        ref={wrapperRef}
        onScroll={watchScroll}>
        <div className={style.cityContent} ref={cityConRef}>
          {cityData.map((item) => {
            return <WrapperSameLetterCities item={item} key={item.title} />;
          })}
        </div>
        <CityAsideBar
          getCurrentIndex={changeIndex}
          currIdx={currentIndex}
          areaHeight={areaHeight}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCity(obj) {
      const action = getChangeCityAction(obj);
      dispatch(action);
    },
  };
};

const WrapperSameLetterCities = withRouter(
  connect(null, mapDispatchToProps)(SameLetterCities)
);

export default CityList;
