import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  authReducer,
  authState,
  AuthContext,
  authContextValue,
  loadToken
} from '../authentication';

// Layout Types
import { DefaultLayout } from '../layouts';
import Home from '../views/Home';
import TopReferrals from './../components/common/TopReferrals';
import Login from '../components/login/Login';

export default function App() {
  const [state, dispatch] = React.useReducer(authReducer, authState);
  console.log(state);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadInitData();
  }, []);
  const loadInitData = async () => {
    setLoading(true);
    try {
      await loadToken(dispatch);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider value={authContextValue(dispatch)}>
      {loading ? (
        <p>loading...</p>
      ) : (
        <Routes>
          {!state.userToken ? (
            <Route path='/' element={<Login />} />
          ) : (
            <Route element={<DefaultLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/topreferrals' element={<TopReferrals />} />
            </Route>
          )}
          <Route path='*' element={<Login />} />
        </Routes>
      )}
    </AuthContext.Provider>
  );
}
