import React from "react";
import { connect } from "react-redux";
import style from "./CitySearchList.module.scss";
import cs from "classnames";

import {getChangeCityAction} from '@/store/Home/action'

const CitySearchList = (props) => {
  const { searchList, searchVal,changeCity } = props;
  if (!searchList.length && searchVal === "") {
    return null;
  } else if (!searchList.length && searchVal !== "") {
    return <div className={cs(style.citySearchList)}>暂无该城市信息</div>;
  } else{
    return (
      <ul className={cs(style.citySearchList)}>
        {searchList.map((item) => {
          return <li key={item.display} onClick={()=>{
            changeCity({cityName:item.key,search:window.location.hash === '#/cityPage?from=terminal' ? 'terminal' : 'start'})
            window.history.go(-1)
          }}>{item.display}</li>;
        })}
      </ul>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCity(obj) {
      const action = getChangeCityAction(obj);
      dispatch(action);
    },
  };
};

export default connect(null,mapDispatchToProps)(CitySearchList);
