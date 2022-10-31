import {GET_LOCATIONS, GET_SINGLE_LOCATION, CREATE_LOCATION, UPDATE_LOCATION, DELETE_LOCATION} from "../../constants/ActionTypes";
import {httpClient} from "../../util/Api";
import {history} from '../store';


 export const getallLocations = () => dispatch => {
    httpClient
      .get('locations')
      .then(({ data }) => {
            dispatch({
                type: GET_LOCATIONS,
                payload: data.data
              });
      })
  };

  export const createLocation = (data) => dispatch => {
    httpClient
      .post('location/create', data)
      .then(({ data }) => {
            dispatch({
                type: CREATE_LOCATION,
              });
              dispatch(getallLocations());
              history.push('/alllocations');
      })
  };
  
  export const getSinglelocation = (id) => dispatch => {
    httpClient
      .get(`/location/${id}`)
      .then(({ data }) => {
            dispatch({
                type: GET_SINGLE_LOCATION,
                payload: data.data[0]
              });
      })
  };

  export const deleteLocation = (data) => dispatch => {
    const value = {"location_id": data}
    httpClient
      .post('delete/location', value)
      .then(({ data }) => {
            dispatch({
                type: DELETE_LOCATION,
              });
            dispatch(getallLocations());
      })
  };

  export const updateLocation = (data) => dispatch => {
    httpClient
      .post('location/update', data)
      .then(({ data }) => {
        dispatch({
          type: UPDATE_LOCATION,
        });
        dispatch(getallLocations());
        history.push('/alllocations');
      })
  };