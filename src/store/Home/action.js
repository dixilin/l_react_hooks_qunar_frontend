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

import {baseUrl} from '@/config'

export const getChangeCityAction = (obj) => {
  return {
    type: CHANGE_CITY,
    obj
  };
};
export const getChangeDateAction = (val) => {
  return {
    type: CHANGE_DATE,
    val
  };
};

export const getSwitchCityAction = () => {
  return {
    type: SWITCH_CITY
  };
}

export const getSwitchMenuStateAction = (val) => {
  return {
    type: SWITCH_MENU_STATE,
    val
  };
}

const trainListAction = (jsonData, val) => {
  return {
    type: GET_TRAIN_LIST,
    jsonData,
    val
  }
}

export const getIsOnlyHighSpeedRailAction = (val) => {
  return {
    type: GET_ONLY_HIGH_SPEED_RAIL,
    val
  }
}

export const getTrainListAction = (val) => (dispatch) => {
  const { startCity: startStation, terminalCity: endStation, selectedDate: date, query } = val
  const { onlyTickets, sort, filterTicketType, filterTrainType, filterDepStation,filterArrStation } = query
  fetch(
    `${baseUrl}/getTickets?startStation=${startStation}&endStation=${endStation}&date=${date}&onlyTickets=${onlyTickets}&sort=${sort}&filterTicketType=${filterTicketType}&filterTrainType=${filterTrainType}&filterDepStation=${filterDepStation}&filterArrStation=${filterArrStation}`
  )
    .then((res) => res.json())
    .then((json) => {
      if (json.status === 0) {
        return alert(json.message)
      }
      if (json.status === 200) {
        const action = trainListAction(json.data, val)
        dispatch(action)
        dispatch(getIsOnlyHighSpeedRailAction(val.isOnlyHighSpeedRail))
        dispatch(getSwitchMenuStateAction(false))
        dispatch(getTicketTypeAction(val.ticketTypeSelected))
        dispatch(getTrainTypeAction(val.trainTypeSelected))
        dispatch(getDepStationAction(val.depStationSelected))
        dispatch(getArrStationAction(val.arrStationSelected))
      }
    });
}

export const getTicketTypeAction = (val) => {
  return {
    type: GET_TICKET_TYPE,
    val
  }
}

export const getTrainTypeAction = (val) => {
  return {
    type: GET_TRAIN_TYPE,
    val
  }
}

export const getDepStationAction = (val) => {
  return {
    type: GET_DEP_STATION,
    val
  }
}

export const getArrStationAction = (val) => {
  return {
    type: GET_ARR_STATION,
    val
  }
}

export const getFilterTrainType = (val) => {
  return {
    type: FILTER_TRAIN_TYPE,
    val
  }
}

export const getSearchAction = (val) => {
  return {
    type: GET_SEARCH,
    val
  }
}
