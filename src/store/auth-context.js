import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: () => { },
    logout: () => { },
});

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
        setTimeout(() => {
            localStorage.removeItem('token');
        }, 300000);  // Token will be deleted from local storage after 5 min
    }
    const logoutHandler = () => {
        localStorage.removeItem('token');
        setToken(null);
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;