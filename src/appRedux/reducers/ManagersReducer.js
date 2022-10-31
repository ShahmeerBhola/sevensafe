// import {GET_MANAGERS,  GET_SINGLE_MANAGER, UPDATE_MANAGER, DELETE_MANAGER, CREATE_MANAGER, EXPORT_USERS} from "../../constants/ActionTypes";

const inititalState = {
    managers:[],
    manager:{},
    exportmanagersdata:[],
    loading: true,
    error: "",
  };

  const ManagersReducer = (state = inititalState, action) => {
    switch (action.type) {
      case "GET_MANAGERS":
        return {
          ...state,
          managers: action.payload,
          loading: false,
        };
        case "GET_SINGLE_MANAGER":
          return {
              ...state,
              manager: action.payload,
              loading: false,
          };  
        case "CREATE_MANAGER":
          return {...state, loading: false, };
        case "UPDATE_MANAGER":
            return {
                ...state,
                loading: true,
          };  
        case "DELETE_MANAGER":
            return {
                ...state,
                // users: action.payload,
                loading: false,
        };  
        case "MANAGER_IMPORT":
          return{...state, loading: false, };
        case "EXPORT_MANAGER":
          return{...state, exportmanagersdata: action.payload }; 
      default:
        return state;
    }
  };
  
  export default ManagersReducer;