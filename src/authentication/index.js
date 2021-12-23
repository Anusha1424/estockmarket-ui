import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './reducer';
import authState from './initialState.json';
import authContextValue from './authContext';
import React from 'react';
import { api } from '../utils/api';

const AuthContext = React.createContext();

const loadToken = async (dispatch) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');

    if (userToken) {
      try {
        api.defaults.headers['Authorization'] = userToken;

        const res = await api.post('/api/valid/token');
        const status = res.data;
        if (!status) {
          dispatch({
            type: 'SIGN_IN',
            token: null,
          });
        } else {
          dispatch({
            type: 'SIGN_IN',
            token: userToken,
          });
        }
      } catch (error) {
        dispatch({
          type: 'SIGN_IN',
          token: null,
        });
      }
    } else {
      dispatch({
        type: 'SIGN_IN',
        token: null,
      });
    }
  } catch (error) {
    dispatch({
      type: 'SIGN_IN',
      token: null,
    });
  }
};
export { AuthContext, authState, authReducer, authContextValue, loadToken };
