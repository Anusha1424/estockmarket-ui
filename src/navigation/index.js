import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  authReducer,
  authState,
  AuthContext,
  authContextValue,
  loadToken,
  UserContext
} from '../authentication';

// Layout Types
import { DefaultLayout } from '../layouts';
import Home from '../views/Home';
import TopReferrals from './../components/common/TopReferrals';
import Login from '../components/login/Login';
import CompanyList from '../views/CompanyList';
import EditCompany from '../views/EditCompany';
import AddStock from '../views/AddStock';
import SearchStocks from '../views/SearchStocks';
import ViewCompanyStocks from '../views/ViewCompanyStocks';
import UserProfileLite from '../views/UserProfileLite';

export default function App() {
  const [state, dispatch] = React.useReducer(authReducer, authState);
  console.log(state);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadInitData();
  }, [state.userToken]);
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
          <UserContext.Provider value={state}>

      {loading ? (
        <p>loading...</p>
      ) : (
        <Routes>
          {!state.userToken ? (
            <Route path="/" element={<Login />} />
          ) : (
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<CompanyList />} />
              <Route path="/addCompany" element={<EditCompany />} />
              <Route path="/editCompany/:id" element={<EditCompany />} />
              <Route path="/addStock" element={<AddStock />} />
              <Route
                path="/viewCompanyStocks/:id"
                element={<ViewCompanyStocks />}
              />
              <Route path="/searchStocks" element={<SearchStocks />} />
              <Route path="/userProfile" element={<UserProfileLite />} />
            </Route>
          )}
          <Route path="*" element={<Login />} />
        </Routes>
      )}
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}
