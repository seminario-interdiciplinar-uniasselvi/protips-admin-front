import { useState } from 'react';
import api from '../services/api.js';
import styles from '../styles/login.module.css';
const Login = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/v1/auth/magic-link?email=${encodeURIComponent(email)}`);
            alert('Email enviado!');
        } catch (error) {
            console.error('Error sending magic link:', error);
        }

    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu email"
                    required
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>Enviar</button>
            </form>
        </div>

    );
};

export default Login;