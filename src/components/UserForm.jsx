import React, {useState} from 'react';
import styles from '../styles/userForm.module.css';
import api from "../services/api.js";

const UserForm = () => {
    const [formData, setFormData] = useState({
        name: '', email: ''
    });
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/v1/users', formData);
            setMessage('Usuário criado com sucesso!');
            setSuccess(true);
            setFormData({name: '', email: ''});
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setMessage('Erro ao criar usuário!');
            setSuccess(false);
        }
    };

    return (<div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div className={styles.userFormContainer}>
                <h2 className={styles.heading}>Criar Usuário</h2>
                <form onSubmit={handleSubmit}>
                    <label className={styles.label}>
                        Nome:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className={styles.input}
                        />
                    </label>
                    <label className={styles.label}>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className={styles.input}
                        />
                    </label>
                    <button type="submit" className={styles.button}>Enviar</button>
                </form>
                {message && <p style={{color: success ? 'green' : 'red'}}>{message}</p>}
            </div>
        </div>

    );
};

export default UserForm;