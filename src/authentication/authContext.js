import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../utils/api';
import _, { result } from 'lodash';

// eslint-disable-next-line import/no-anonymous-default-export
export default dispatch => ({
  signIn: async data => {
    let errMsg = '';

    try {
      const res = await api.post('/auth/login/generate_token', data);
      const { tokenType, accessToken } = res.data;
      const userToken = `${tokenType} ${accessToken}`;
      api.defaults.headers['Authorization'] = userToken;

      await AsyncStorage.setItem('userToken', userToken);

      dispatch({
        type: 'SIGN_IN',
        token: userToken
      });
    } catch (err) {
      errMsg = _.get(err, 'response.data.message', 'Something went wrong');
      // Toaster.error("Error", errMsg);
    }
    return errMsg;
  },
  signOut: async () => {
    await AsyncStorage.removeItem('userToken');

    delete api.defaults.headers.Authorization;
    dispatch({ type: 'SIGN_OUT' });
    return true;
  }
});
