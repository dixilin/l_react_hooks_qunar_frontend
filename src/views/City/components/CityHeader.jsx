import React from "react";
import style from "./CityHeader.module.scss";

import cs from "classnames";
import {baseUrl} from '@/config'

const CityHeader = (props) => {
  return (
    <div className={"cityHeader " + style.header}>
      <i
        className={cs("iconfont", "icon-left", { [style.headerLeft]: true })}
        onClick={() => {
          window.history.go(-1);
        }}></i>
      <div className={style.headerCenter}>
        <input
          type='text'
          placeholder='城市、车站的中文或拼音'
          value={props.searchVal}
          onChange={(e) => {
            const val = e.target.value.trim();
            props.setSearchVal(val);
            fetch(`${baseUrl}/getCitySearch?keyword=${val}`)
              .then((res) => res.json())
              .then((json) => {
                if (json.status === 200) {
                  props.setSearchList(json.data);
                }
              });
          }}
        />
      </div>
    </div>
  );
};


export default CityHeader;
