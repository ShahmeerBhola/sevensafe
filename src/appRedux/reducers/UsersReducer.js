import {GET_USERS, GET_SINGLE_USER, CREATE_USERS, UPDATE_USER,DELETE_USERS, GET_COUNTRIES, GET_CITIES, GET_STATES, EXPORT_USERS} from "../../constants/ActionTypes";

const inititalState = {
    users:[],
    exportusers:[],
    user:{},
    cities:[],
    states:[],
    loading: true,
    error: "",
  };

  const UsersReducer = (state = inititalState, action) => {
    switch (action.type) {
      case "GET_USERS":
        return {...state, users: action.payload, user: {}, loading: false, };
      case "CREATE_USERS":
        return {...state, loading: false, };
      case "GET_SINGLE_USER":
        return {...state, user: action.payload, loading: false, };  
      case "UPDATE_USER":
        return {...state, loading: true, };   
      case "DELETE_USERS":
        return {...state, loading: false, };   
      case "FILE_IMPORT":
        return{...state, loading: false, };
      case "GET_STATES":
          return{...state, states: action.payload };
      case "GET_CITIES":
        return{...state, cities: action.payload };
      case "EXPORT_USERS":
        return{...state, exportusers: action.payload };
      case "BULK_DELETE":
          return {...state, loading: false, };   
      default:
        return state;
    }
  };
  
  export default UsersReducer;