import React, { useEffect, useState } from 'react';
import api from '../services/api.js';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import { Editor } from './Editor';
import styles from '../styles/editContent.module.css';

const HandleContent = () => {
    const { userId, newsletterId, subject } = useParams();
    const [contentData, setContentData] = useState({ subject: '', bodyHtml: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const location = useLocation();
    console.log(location)

    const isAddMode = location.state?.isAddMode ?? true;
    useEffect(() => {
        if (!isAddMode) {
            const fetchContent = async () => {
                try {
                    const response = await api.get(`/v1/users/${userId}/newsletters/${newsletterId}/content/${subject}`);
                    const content = response.data;
                    setContentData(content);
                } catch (error) {
                    setMessage('Error fetching content');
                }
            };
            fetchContent();
        }
    }, [isAddMode, userId, newsletterId, subject]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContentData({ ...contentData, [name]: value });
    };

    const handleContentUpdate = async () => {
        try {
            if (isAddMode) {
                await api.post(`/v1/users/${userId}/newsletters/${newsletterId}/content`, contentData);
                setMessage('Content added successfully');
            } else {
                await api.put(`/v1/users/${userId}/newsletters/${newsletterId}/content/${subject}`, contentData);
                setMessage('Content updated successfully');
            }
            navigate(`/dashboard`);
        } catch (error) {
            setMessage('Error updating content');
        }
    };

    const handleContentBodyChange = (bodyHtml) => {
        setContentData((prevData) => {
            // Só atualiza se o conteúdo realmente mudou
            if (prevData.bodyHtml !== bodyHtml) {
                return { ...prevData, bodyHtml };
            }
            return prevData; // Não faz nada se o conteúdo for o mesmo
        });
    };

    return (
        <div className={styles.contentContainer}>
            <h2 style={{ textAlign: 'center' }}>{isAddMode ? 'Criar Conteúdo' : 'Editar Conteúdo'}</h2>
            <label>
                Assunto:
                <input
                    type="text"
                    name="subject"
                    value={contentData.subject}
                    onChange={handleInputChange}
                    required
                    className={styles.inputShort}
                />
            </label>
            <label>
                Template:
                <Editor
                    setContent={handleContentBodyChange}
                    initialContent={contentData.bodyHtml}
                />
            </label>
            <button onClick={handleContentUpdate} className={styles.button}>
                {isAddMode ? 'Adicionar' : 'Atualizar'}
            </button>
            {message && <p style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
        </div>
    );
};

export default HandleContent;