import axios from 'axios';

import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';

const ClientActions = {
  fetchSettings: (property) => {
    return axios.get('/client/settings', {params: {property}})
      .then((json = {}) => {
        return json.data;
      })
      .then((data) => {
        AppDispatcher.dispatchServerAction({
          type: ActionTypes.CLIENT_SETTINGS_FETCH_REQUEST_SUCCESS,
          data
        });
      })
      .catch((error) => {
        AppDispatcher.dispatchServerAction({
          type: ActionTypes.CLIENT_SETTINGS_FETCH_REQUEST_ERROR,
          error
        });
      });
  },

  saveSettings: (settings, options) => {
    return axios.patch('/client/settings', settings)
      .then((json = {}) => {
        return json.data;
      })
      .then((data) => {
        AppDispatcher.dispatchServerAction({
          type: ActionTypes.CLIENT_SETTINGS_SAVE_SUCCESS,
          data,
          options
        });
      })
      .catch((error) => {
        AppDispatcher.dispatchServerAction({
          type: ActionTypes.CLIENT_SETTINGS_SAVE_ERROR,
          error,
          options
        });
      });
  },

  setThrottle: (direction, throttle) => {
    return axios.put('/client/settings/speed-limits', {
        direction,
        throttle
      })
      .then((json = {}) => {
        return json.data;
      })
      .then((transferData) => {
        AppDispatcher.dispatchServerAction({
          type: ActionTypes.CLIENT_SET_THROTTLE_SUCCESS,
          data: {
            transferData
          }
        });
      })
      .catch((error) => {
        AppDispatcher.dispatchServerAction({
          type: ActionTypes.CLIENT_SET_THROTTLE_ERROR,
          data: {
            error
          }
        });
      });
  }
};

export default ClientActions;
