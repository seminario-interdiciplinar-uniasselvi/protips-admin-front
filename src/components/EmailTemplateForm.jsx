import {useState} from 'react';
import api from '../services/api.js';
import {Editor} from './Editor';
import styles from '../styles/emailTemplateForm.module.css';

const EmailTemplateForm = () => {
    const [template, setTemplate] = useState({
        title: '',
        description: '',
        cron: ''
    });
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setTemplate((prevTemplate) => ({...prevTemplate, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = '6714131d00eb823fef45b03e';
        try {
            const response = await api.post(`/v1/users/${userId}/newsletters`, {...template});
            setMessage('Template criado com sucesso!');
            setTemplate({
                title: '',
                description: '',
                cron: ''
            });
            setSuccess(true);
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Erro ao criar o template!';
            setMessage(errorMsg);
            setSuccess(false);
        }
    };


    return (
        <div className={styles.emailTemplateFormContainer}>
            <h2 className={styles.h2}>Criar Newsletter</h2>
            <form onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Título:
                    <input
                        type="text"
                        name="title"
                        value={template.title}
                        onChange={handleInputChange}
                        required
                        className={styles.input}
                    />
                </label>
                <label>
                    Descrição:
                    <input
                        type="text"
                        name="description"
                        value={template.description}
                        onChange={handleInputChange}
                        required
                        className={styles.input}
                    />
                </label>
                <label className={styles.label}>
                    Cron:
                    <input
                        type="text"
                        name="cron"
                        value={template.cron}
                        onChange={handleInputChange}
                        required
                        className={styles.input}
                    />
                </label>
                <button className={styles.button} type="submit">Criar Newsletter</button>
            </form>
            {message && <p style={{color: success ? 'green' : 'red'}}>{message}</p>}
        </div>
    );
};

export default EmailTemplateForm;