import {GET_USERS, CREATE_USERS, DELETE_USERS, GET_SINGLE_USER, UPDATE_USER, FILE_IMPORT,BULK_DELETE, GET_COUNTRIES, GET_CITIES, GET_STATES, EXPORT_USERS} from "../../constants/ActionTypes";
import { fetchStart, fetchSuccess } from "./index"
import {httpClient} from "../../util/Api";
import {history} from '../store';
import {message} from "antd";

 export const getallUsers = () => {

   return (dispatch) => {
    dispatch(fetchStart());
    httpClient
      .get('employees')
      .then(({ data }) => {
            dispatch({
                type: GET_USERS,
                payload: data.data
              });
        
        if (data) {
          dispatch(fetchSuccess());
        } else {
          // fetchError(data.error);
        }
      })
      .catch(function (error) {
        // httpClient.defaults.headers.common['Authorization'] = '';
        // fetchError(error.message);
      });
    }
  };

  export const createUser = (data) => dispatch => {
    httpClient
      .post('employee/create', data)
      .then(({ data }) => {
            dispatch({
                type: CREATE_USERS,
                // payload: data.data
              });
              dispatch(getallUsers());
              history.push('/resources');
      })
  };

  export const getSingleUser = (id) => dispatch => {
    httpClient
      .get(`/employee/${id}`)
      .then(({ data }) => {
            dispatch({
                type: GET_SINGLE_USER,
                payload: data.data[0]
              });
      })
  };

  export const deleteUser = (data) => dispatch => {
    const value = {"employee_id": data}
    httpClient
      .post('delete/employee', value)
      .then(({ data }) => {
            dispatch({
                type: DELETE_USERS,
              });
            dispatch(getallUsers());
      })
  };

  export const updateUser = (data) => dispatch => {
    dispatch(fetchStart());
    httpClient
      .post('employee/update', data)
      .then(({ data }) => {
        dispatch({
          type: UPDATE_USER,
        });
        dispatch(getallUsers());
        history.push('/resources');
      })
  };

  export const fileupload = (data) => dispatch => {
    dispatch(fetchStart());
    httpClient
      .post('import-employees', data, {headers:{
        "Content-Type": "multipart/form-data"
      }})
      .then(({ data }) => {
        dispatch({
          type: FILE_IMPORT,
        });
        history.push('/resources');
      })
  };

  export const getstates = () => dispatch => {
    dispatch(fetchStart());
    httpClient
      .get('states/25')
      .then(({ data }) => {
          dispatch({
            type: GET_STATES,
            payload: data.data
          });
      })
  };

  export const getcities = (id) => dispatch => {
    dispatch(fetchStart());
    httpClient
      .get(`cities/${id}`)
      .then(({ data }) => {
        dispatch({
          type: GET_CITIES,
          payload: data.data
        });
      })
  };

  export const exportCSV = () => dispatch => {
    httpClient
      .get('employees/export')
      .then(({ data }) => {
        dispatch({
          type: EXPORT_USERS,
          payload: data.data
        });
      })
  };

  export const BulkDeleteRecords = (data, type) => dispatch => {
    console.log(type);
    httpClient
      .post('delete/records', data)
      .then(() => {
        dispatch({
          type: BULK_DELETE,
        });
        if(type == "employee"){
          history.push('/resources');
        }else{
          history.push('/allmanagers');
        }
      })
  };