import React, { useState } from 'react';

const AuthContext = React.createContext({
   token: '',
   isLoggedIn: false,
   isAdminLoggedIn: false,
   login: function (token, email) { },
   logout: function () { },
});

const ADMIN = 'admin@test.com';

export function AuthContextProvider(props) {
   const [token, setToken] = useState(null);
   const [isAdmin, setIsAdmin] = useState(false);

   const isLoggedIn = !!token;
   const isAdminLoggedIn = isLoggedIn && isAdmin;

   function login(token, email) {
      setToken(token);
      setIsAdmin(email === ADMIN);
   }

   function logout() {
      setToken(null);
      setIsAdmin(false);
   }

   const value = { token, isLoggedIn, isAdminLoggedIn, login, logout };

   return (
      <AuthContext.Provider value={value}>
         {props.children}
      </AuthContext.Provider>
   );
}

export default AuthContext;
