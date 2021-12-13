import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './reducer';
import authState from './initialState.json';
import authContextValue from './authContext';
import React from 'react';
import { onecodeAPI } from '../../utils/api';
import * as Updates from 'expo-updates';
import _ from 'lodash';
import { Alert } from 'react-native';
const AuthContext = React.createContext();

const bootstrapAsync = async dispatch => {
  let userToken, onecoder;
  console.log(' retrieving token from storage');
  try {
    // checkForUpdateAsync();
    userToken = await AsyncStorage.getItem('userToken');

    onecodeAPI.defaults.headers['Authorization'] = userToken;
    if (userToken != null && userToken != '') {
      onecoder = await retrieveOnecodeUser(dispatch);
      if (onecoder?.isSignedOut) {
        userToken = null;
        onecoder = null;
        //  AsyncStorage.removeItem("userToken");
        //  AsyncStorage.removeItem("onecoder");
        //  AsyncStorage.removeItem("pushToken");
        // delete onecodeAPI.defaults.headers.Authorization;
        // userToken = null
        // dispatch({type:"SIGN_OUT"})
      }
      let userPcTrainings = await getUserPcTraining();
      onecoder = { ...onecoder, userPcTrainings: userPcTrainings };
      setInitialUserPropertiesToMoengage(onecoder);
      i18n.locale = onecoder.locale;

      await AsyncStorage.setItem('locale', onecoder.locale);
    }
    if (!onecoder) {
      userToken = null;
    }
    const pushToken = await AsyncStorage.getItem('pushToken');
    const deviceToken = await AsyncStorage.getItem('deviceToken');
    ReactMoE.passFcmPushToken(deviceToken);
    // Alert.alert("localStotage "+ deviceToken);
    if (onecoder && (pushToken == null || deviceToken == null)) {
      try {
        // Alert.alert("fetching and updating device token")
        registerForPushNotificationsAsync().then(res => {
          AsyncStorage.setItem('pushToken', res.pushToken);
          AsyncStorage.setItem('deviceToken', res.deviceToken);

          onecoder['pushToken'] = res.pushToken;
          onecoder['deviceToken'] = res.deviceToken;
          onecoder['deviceType'] = res.type;
          // Alert.alert(JSON.stringify(res));

          ReactMoE.passFcmPushToken(res.deviceToken);

          onecodeAPI.put('/user/token', onecoder);
          dispatch({ type: 'UPDATE_PUSHTOKEN', pushToken: res.pushToken });
        });
      } catch (err) {
        console.log('Error registering pushToken');
      }
    }
  } catch (e) {
    // Restoring token failed
    console.log('Restoring token failed');
    let isAccBlocked = await getIsAccBlocked();
    if (isAccBlocked != null) onecoder = { isAccBlocked: isAccBlocked };
  }

  // After restoring token, we may need to validate it in production apps

  // This will switch to the App screen or Auth screen and this loading
  // screen will be unmounted and thrown away.
  dispatch({ type: 'RESTORE_TOKEN', token: userToken, onecoder });
};

async function checkForUpdate() {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      // NOTIFY USER HERE
      Updates.reloadAsync();
    }
  } catch (e) {
    console.log(e);
    // HANDLE ERROR HERE
  }
}

function checkForUpdateAsync() {
  Updates.checkForUpdateAsync().then(update => {
    if (update.isAvailable) {
      Updates.fetchUpdateAsync().then(res => {
        // NOTIFY USER HERE
        // Alert("reload");
        Alert.alert(
          'App Update',
          'Update requires restart.',
          [{ text: 'OK', onPress: () => Updates.reloadAsync() }],
          { cancelable: false }
        );
      });
    }
  });
}

async function retrieveOnecodeUser(dispatch) {
  let onecoder = null;
  try {
    const res = await onecodeAPI.get('/app/onecodeUser');
    // const data = JSON.parse(res.data);
    onecoder = _.get(res, 'data.data.onecodeUser', null);
    return onecoder;
  } catch (e) {
    let statusText = e?.message || '';
    if (statusText.includes('401')) {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('onecoder');
      await AsyncStorage.removeItem('pushToken');
      await AsyncStorage.setItem('userLoggedOut', 'true');
      delete onecodeAPI.defaults.headers.Authorization;
      dispatch({ type: 'SIGN_OUT' });
      onecoder = { isSignedOut: true };

      ReactMoE.logout();
      //  userToken = null
    }
    return onecoder;
  }
}
const getIsAccBlocked = async () => {
  try {
    const res = await onecodeAPI.get('/user/isAccBlocked', false);
    let status = _.get(res, 'data.data.isAccBlocked');
    return status;
  } catch (er) {
    console.log(er, 'err');
    return null;
  }
};

const getUserPcTraining = async () => {
  try {
    const res = await onecodeAPI.get('/user/userPCTraining', false);
    let result = _.get(res, 'data.data.userPCTrainings', []);
    return result;
  } catch (er) {
    console.log(er, 'err while retrieving the userPCTraining data');
    return null;
  }
};

export {
  AuthContext,
  authState,
  authReducer,
  bootstrapAsync,
  checkForUpdateAsync,
  authContextValue
};
