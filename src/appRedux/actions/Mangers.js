import {GET_MANAGERS, GET_SINGLE_MANAGER, UPDATE_MANAGER, CREATE_MANAGER, DELETE_MANAGER, MANAGER_IMPORT, EXPORT_MANAGER} from "../../constants/ActionTypes";
import {httpClient} from "../../util/Api";
import {history} from '../store';


 export const getallMangers = () => dispatch => {
    httpClient
      .get('managers')
      .then(({ data }) => {
            dispatch({
                type: GET_MANAGERS,
                payload: data.data
              });
      })
  };

  export const CreateManager = (data) => dispatch => {
    httpClient
      .post('manager/create', data)
      .then(({ data }) => {
            dispatch({
                type: CREATE_MANAGER,
              });
              dispatch(getallMangers());
              history.push('/allmanagers');
      })
  };
  
  export const getSingleManger = (id) => dispatch => {
    httpClient
      .get(`/manager/${id}`)
      .then(({ data }) => {
            dispatch({
                type: GET_SINGLE_MANAGER,
                payload: data.data[0]
              });
      })
  };

  export const deleteManger = (data) => dispatch => {
    const value = {"manager_id": data}
    httpClient
      .post('delete/manager', value)
      .then(({ data }) => {
            dispatch({
                type: DELETE_MANAGER,
              });
            dispatch(getallMangers());
      })
  };

  export const updateManager = (data) => dispatch => {
    httpClient
      .post('manager/update', data)
      .then(() => {
        dispatch({
          type: UPDATE_MANAGER,
        });
        dispatch(getallMangers());
        history.push('/allmanagers');
      })
  };

  export const importManagers = (data) => dispatch => {
    httpClient
      .post('import-managers', data, {headers:{
        "Content-Type": "multipart/form-data"
      }})
      .then(({ data }) => {
        dispatch({
          type: MANAGER_IMPORT,
        });
        history.push('/allmanagers');
      })
  };

  export const exportmanagers = () => dispatch => {
    httpClient
      .get('managers/export')
      .then(({ data }) => {
        console.log(data);
        dispatch({
          type: EXPORT_MANAGER,
          payload: data.data
        });
      })
  };