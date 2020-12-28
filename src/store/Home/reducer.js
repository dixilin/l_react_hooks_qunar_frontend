import dayjs from 'dayjs';
import {
  CHANGE_CITY,
  CHANGE_DATE,
  SWITCH_CITY,
  SWITCH_MENU_STATE,
  GET_TRAIN_LIST,
  GET_TICKET_TYPE,
  GET_TRAIN_TYPE,
  GET_DEP_STATION,
  GET_ARR_STATION,
  GET_ONLY_HIGH_SPEED_RAIL,
  FILTER_TRAIN_TYPE,
  GET_SEARCH
} from "./actionType";

const defaultState = {
  startCity: '北京',
  terminalCity: '上海',
  selectedDate: dayjs().format("YYYY-MM-DD"),
  menuShow: false,
  isMenuEmpty: true,
  isOnlyHighSpeedRail: false,
  ticketTypeSelected: [],
  trainTypeSelected: [],
  depStationSelected: [],
  arrStationSelected: [],
  query: {
    sort: 7,
    onlyTickets: 0, //是否只看有票 1
    filterTicketType: '',//坐席类型
    filterTrainType: '',//车次类型
    filterDepStation: '', //始发站
    filterArrStation: '', //到站
  },
  trainData: {},
  cardSearch: ''
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_CITY: {
      if (action.obj.search.indexOf('start') === -1) {
        return { ...state, terminalCity: action.obj.cityName };
      }
      return { ...state, startCity: action.obj.cityName };
    }
    case CHANGE_DATE: {
      return { ...state, selectedDate: action.val }
    }
    case SWITCH_CITY: {
      return { ...state, startCity: state.terminalCity, terminalCity: state.startCity }
    }
    case SWITCH_MENU_STATE: {
      return { ...state, menuShow: action.val }
    }
    case GET_TRAIN_LIST: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.trainData = action.jsonData
      newState.query = action.val.query
      newState.selectedDate = action.val.selectedDate
      return newState
    }
    case GET_TICKET_TYPE: {
      return { ...state, ticketTypeSelected: action.val }
    }

    case GET_TRAIN_TYPE: {
      return { ...state, trainTypeSelected: action.val }
    }

    case GET_DEP_STATION: {
      return { ...state, depStationSelected: action.val }
    }

    case GET_ARR_STATION: {
      return { ...state, arrStationSelected: action.val }
    }

    case GET_ONLY_HIGH_SPEED_RAIL: {
      return { ...state, isOnlyHighSpeedRail: action.val }
    }
    case FILTER_TRAIN_TYPE: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.query.filterTrainType = action.val
      return newState
    }

    case GET_SEARCH: {
      return {...state,cardSearch:action.val}
    }

    default:
      return state;
  }
};

export default reducer;