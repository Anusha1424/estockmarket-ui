import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../utils/api';
import _, { result } from 'lodash';

// eslint-disable-next-line import/no-anonymous-default-export
export default dispatch => ({
  signIn: async data => {
    let errMsg = '';

    try {
      delete api.defaults.headers.Authorization;
      const res = await api.post('/api/signin', data);
      const { accessToken } = res.data;
      const userToken = `Bearer ${accessToken}`;
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
