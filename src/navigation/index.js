import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  authReducer,
  authState,
  AuthContext,
  authContextValue
} from '../authentication';

// Layout Types
import { DefaultLayout } from '../layouts';
import Home from '../views/Home';
import TopReferrals from './../components/common/TopReferrals';

export default function App() {
  const [state, dispatch] = React.useReducer(authReducer, authState);

  return (
    <AuthContext.Provider value={authContextValue(dispatch)}>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path='/home' element={<Home />} />
          <Route path='/topreferrals' element={<TopReferrals />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}
