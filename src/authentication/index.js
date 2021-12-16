import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './reducer';
import authState from './initialState.json';
import authContextValue from './authContext';
import React from 'react';
import { api } from '../utils/api';

const AuthContext = React.createContext();

const loadToken = async dispatch => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      api.defaults.headers['Authorization'] = userToken;

      dispatch({
        type: 'SIGN_IN',
        token: userToken
      });
    }
  } catch (error) {}
};
export { AuthContext, authState, authReducer, authContextValue, loadToken };
