import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { authProvider } from '../auth';

// Layout Types
import { DefaultLayout } from '../layouts';
import Home from '../views/Home';
import TopReferrals from './../components/common/TopReferrals';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/topreferrals" element={<TopReferrals />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

let AuthContext = React.createContext();

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  let signin = (newUser, callback) => {
    return authProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback) => {
    return authProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
