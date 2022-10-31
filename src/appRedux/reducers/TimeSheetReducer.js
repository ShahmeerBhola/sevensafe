
const inititalState = {
    sheets:[],
    sheetsdata:[],
    loading: true,
    error: "",
  };

  const UsersReducer = (state = inititalState, action) => {
    switch (action.type) {
      case "GET_SHEETS":
        return {...state, sheets: action.payload, loading: false, };
      case "GET_SHEET_DATA":
        return {...state, sheetsdata: action.payload, loading: false, };
      default:
        return state;
    }
  };
  
  export default UsersReducer;