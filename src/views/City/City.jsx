import React, { useState } from "react";

import CityHeader from "./components/CityHeader";
import CityList from "./components/CityList";
import CitySearchList from "./components/CitySearchList";

const City = () => {
  const [searchList, setSearchList] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <CityHeader searchList={searchList} setSearchList={setSearchList} setSearchVal={setSearchVal} searchVal={searchVal}/>
      <CityList />
      <CitySearchList searchList={searchList} searchVal={searchVal}/>
    </div>
  );
};

export default City;
