import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './reducer';
import authState from './initialState.json';
import authContextValue from './authContext';
import React from 'react';
import { api } from '../utils/api';
const AuthContext = React.createContext();

export { AuthContext, authState, authReducer, authContextValue };
