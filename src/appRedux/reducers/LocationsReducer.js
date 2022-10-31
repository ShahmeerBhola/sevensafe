import {GET_LOCATIONS,  GET_SINGLE_LOCATION, CREATE_LOCATION, UPDATE_LOCATION, DELETE_LOCATION} from "../../constants/ActionTypes";

const inititalState = {
    locations:[],
    location:{},
    loading: true,
    error: "",
  };

  const ManagersReducer = (state = inititalState, action) => {
    switch (action.type) {
      case "GET_LOCATIONS":
        return {
          ...state,
          locations: action.payload,
          loading: false,
        };
        case "CREATE_LOCATION":
            return {...state, loading: false, };
        case "GET_SINGLE_LOCATION":
          return {
              ...state,
              location: action.payload,
              loading: false,
          };  
        case "UPDATE_LOCATION":
            return {
                ...state,
                loading: true,
          };  
        case "DELETE_LOCATION":
            return {
                ...state,
                // users: action.payload,
                loading: false,
        };   
      default:
        return state;
    }
  };
  
  export default ManagersReducer;