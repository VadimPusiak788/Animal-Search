import { combineReducers } from "redux";
import loginReducer from './loginReducer'
import UserReducer from "./userReducer";
import FoundCoordinateReducer from "./mapFoundReducer";
import LostCoordinateReducer from "./mapLostReducer";


const rootReducer = combineReducers({
  loginReducer: loginReducer,
  user: UserReducer,
  lost_coordinate: LostCoordinateReducer,
  found_coordinate: FoundCoordinateReducer
});

export default rootReducer;