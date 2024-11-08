import React, { createContext, useState, useContext, useEffect } from 'react';
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
    }, [authToken]);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    return (
        <AuthContext.Provider value={{ authToken, setAuthToken, user, setUser }}>
            <Header/>
            {children}
            <Footer/>
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);