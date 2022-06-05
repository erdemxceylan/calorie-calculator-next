import React, { useState } from 'react';
import { CONSTANTS } from '../constants';

const AuthContext = React.createContext({
   token: '',
   isLoggingIn: true,
   isLoggedIn: false,
   isAdminLoggedIn: false,
   login: function (token, email) { },
   logout: function () { },
   switchToSignup: function () { }
});

export function AuthContextProvider(props) {
   const [token, setToken] = useState(null);
   const [isLoggingIn, setIsLoggingIn] = useState(true);
   const [isAdmin, setIsAdmin] = useState(false);

   const isLoggedIn = !!token;
   const isAdminLoggedIn = isLoggedIn && isAdmin;

   function login(token, email) {
      setToken(token);
      setIsAdmin(email === CONSTANTS.ADMIN);
   }

   function logout() {
      setToken(null);
      setIsAdmin(false);
   }

   function switchToSignup() {
      setIsLoggingIn(!isLoggingIn);
   }

   const value = { token, isLoggingIn, isLoggedIn, isAdminLoggedIn, login, logout, switchToSignup };

   return (
      <AuthContext.Provider value={value}>
         {props.children}
      </AuthContext.Provider>
   );
}

export default AuthContext;
