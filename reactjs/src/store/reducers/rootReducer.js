import { combineReducers } from "redux";
import loginReducer from './loginReducer'
import FoundCoordinateReducer from "./mapFoundReducer";
import LostCoordinateReducer from "./mapLostReducer";


const rootReducer = combineReducers({
  loginReducer: loginReducer,
  lost_coordinate: LostCoordinateReducer,
  found_coordinate: FoundCoordinateReducer
});

export default rootReducer;