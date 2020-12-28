import React from "react";
import { connect } from "react-redux";
import Header from "@/components/Header/Header";
import DateNav from "@/components/DateNav/DateNav";
import List from "./components/List";
import BottomFilter from './components/BottomFilter'
import FilterMenu from './components/FilterMenu'

const mapStateToProps = (state) => {
  const { startCity, terminalCity } = state.home;
  return {
    startCity,
    terminalCity,
  };
};

export default connect(mapStateToProps)((props) => {
  const { startCity, terminalCity } = props;
  return (
    <div>
      <Header title={`${startCity} ⇀ ${terminalCity}`} />
      <DateNav />
      <List />
      <BottomFilter />
      <FilterMenu />
    </div>
  );
});
