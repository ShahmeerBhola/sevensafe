import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import Settings from "./Settings";
import Common from "./Common";
import UsersReducer from "./UsersReducer";
import ManagersReducer from "./ManagersReducer";
import LocationsReducer from "./LocationsReducer";
import TimeSheetReducer from "./TimeSheetReducer";

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  common: Common,
  users: UsersReducer,
  managers: ManagersReducer,
  locations: LocationsReducer,
  timesheet: TimeSheetReducer,
});

export default createRootReducer;
