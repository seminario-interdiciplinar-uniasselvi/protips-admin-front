import { useState } from 'react';
import api from '../services/api.js';
import styles from '../styles/login.module.css';
import StatusModal from "./StatusModal.jsx";
import {Link} from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/v1/auth/magic-link?email=${encodeURIComponent(email)}`);
            setModalMessage('Email enviado, confira seu email');
            setIsSuccess(true);
            setModalIsOpen(true);
        } catch (error) {
            console.error('Error sending magic link:', error);
            setModalMessage('Erro ao enviar email');
        }

    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <h1 style={{textAlign: 'center'}}>Login</h1>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu email"
                    required
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>Enviar</button>
                <Link  to={"/"}>Não tem uma conta? Criar</Link>
            </form>
            <StatusModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                message={modalMessage}
                isSuccess={isSuccess}
            />
        </div>

    );
};

export default Login;