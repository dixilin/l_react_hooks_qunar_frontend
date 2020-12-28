import React from "react";
import style from "./DateNav.module.scss";
import { connect } from "react-redux";
import { formatDate, formatWeek } from "@/utils/common";
import { getTrainListAction ,getSearchAction} from "@/store/Home/action";
import { getNextDate, getPrevDate } from "@/utils/common";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
const DateNav = (props) => {
  const { selectedDate, changeDate, params,changeSearch,cardSearch } = props;

  const getNewSearch = (date,cb) => {
    if(cardSearch){
      let newSearch = cardSearch;
      const str = 'date='
      const idx = newSearch.lastIndexOf(str)
      newSearch = newSearch.slice(0,idx+str.length) + date
      cb(newSearch)
    }
  };
  return (
    <div className={style.dateNav}>
      <span
        className={
          selectedDate === dayjs().format("YYYY-MM-DD") ? style.disabled : ""
        }
        onClick={() => {
          if (selectedDate === dayjs().format("YYYY-MM-DD")) {
            return;
          }
          const newParams = JSON.parse(JSON.stringify(params));
          newParams.selectedDate = getPrevDate(selectedDate);
          changeDate(newParams);
          getNewSearch(getPrevDate(selectedDate),changeSearch)
        }}>
        前一天
      </span>
      <Link to='/datePage'>
        <span>{`${formatDate(selectedDate)} ${formatWeek(selectedDate)}`}</span>
      </Link>
      <span
        onClick={() => {
          const newParams = JSON.parse(JSON.stringify(params));
          newParams.selectedDate = getNextDate(selectedDate);
          changeDate(newParams);
          getNewSearch(getNextDate(selectedDate),changeSearch)
        }}>
        后一天
      </span>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { selectedDate,cardSearch } = state.home;
  return {
    selectedDate,
    params: state.home,
    cardSearch
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeDate(newParams) {
      const action = getTrainListAction(newParams);
      dispatch(action);
    },
    changeSearch(val){
      const action = getSearchAction(val)
      dispatch(action)
    }
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(DateNav);
