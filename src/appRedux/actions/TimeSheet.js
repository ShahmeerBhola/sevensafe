import {GET_SHEETS, GET_SHEET_DATA} from "../../constants/ActionTypes";
import { fetchStart, fetchSuccess } from "./index"
import {httpClient} from "../../util/Api";
import {history} from '../store';

 export const getSheets = () => {

   return (dispatch) => {
    httpClient
      .get('services')
      .then(({ data }) => {
            dispatch({
                type: GET_SHEETS,
                payload: data.data
              });
      })
    }
  };

  export const getSheetdata = (data) => {

    return (dispatch) => {
     httpClient
       .get('rosters/location/1')
       .then(({ data }) => {
             dispatch({
                 type: GET_SHEET_DATA,
                 payload: data.data
               });
       })
     }
   };