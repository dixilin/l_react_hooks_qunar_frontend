import { applyMiddleware, createStore, compose } from "redux";
import rootReducer from './rootReducer'

import thunk from "redux-thunk";

//Redux Devtools配置
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

//将Redux Devtools和redux-thunk合并
const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);
export default store