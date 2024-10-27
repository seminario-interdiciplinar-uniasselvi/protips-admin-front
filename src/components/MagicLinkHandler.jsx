import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import api from '../services/api.js';
import {useAuth} from "./AuthProvider.jsx";

const MagicLinkHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {setAuthToken, setUser} = useAuth();
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const authenticateUser = async () => {
            const queryParams = new URLSearchParams(location.search);
            const token = queryParams.get('token');

            if (!token) return;

            setIsLoading(true);

            try {
                const authResponse = await api.get(`/v1/auth/authenticate?token=${token}`);

                const userResponse = await api.get('/v1/auth/authenticated-user', {
                    headers: {
                        'Authorization': 'Bearer ' + authResponse.data.value
                    }
                });

                setAuthToken(token);
                setUser(userResponse.data);
                setSuccess(true);
                navigate('/dashboard');
            } catch (error) {
                console.error('Error validating token:', error);
                setSuccess(false);
            } finally {
                setIsLoading(false);
            }
        };

        authenticateUser();
    }, [setAuthToken, setUser, location.search, navigate]);

    return (
        <div>
            {isLoading && <p>Logando...</p>}
            {!isLoading && success && <p>Login Efetuado!</p>}
            {!isLoading && !success && <p>Erro!</p>}
        </div>
    );
};

export default MagicLinkHandler;