import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import boardReducer from './reducers/boardReducer';
import playerReducer from './reducers/playerReducer';

const reducers = combineReducers({
    boardReducer,
    playerReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;