import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import api from '../services/api.js';
import styles from '../styles/listContent.module.css';
import CronEditor from "./CronEditor.jsx";
import {useAuth} from "./AuthProvider.jsx";
import Clipboard from "./Clipboard.jsx";

const ListContent = () => {
    const [newsletter, setNewsletter] = useState(null);
    const [newCron, setNewCron] = useState('');
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {user} = useAuth();
    useEffect(() => {
        if (user) {
            api.get(`/v1/users/${user.id}/newsletters`)
                .then(response => {
                    setNewsletter(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching newsletters:', error);
                });
        }
    }, [user]);

    const handleCronChange = (e) => {
        setNewCron(e);
    };

    const handleCronUpdate = async () => {
        try {
            await api.put(`/v1/users/${user.id}/newsletters/${newsletter.id}`, {cron: newCron});
            setMessage('Cron updated successfully');
            setIsModalOpen(false);
        } catch (error) {
            setMessage('Error updating cron');
        }
    };

    useEffect(() => {

        if (!user) {
            return navigate('/login');
        }
    }, [navigate, user]);

    if (loading) {
        return <p>Carregando...</p>
    }

    if (!newsletter) {
        return navigate('/create-newsletter');
    }

    return (
        <div className={styles.listContentContainer}>
            <h2>Newsletter</h2>
            <Clipboard userId={user.id} newsletterId={newsletter.id}/>
            <p><strong>Titulo:</strong> {newsletter.title}</p>
            <p><strong>Descrição:</strong> {newsletter.description}</p>
            <p><strong>Status:</strong> {newsletter.active ? 'ATIVA' : 'INATIVA'}</p>
            <div className={styles.cron}>
                <div>
                    <strong>Cron:</strong>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className={styles.button}
                    >Visualizar Frequência
                    </button>
                </div>

                {isModalOpen && <div className={styles.editCron}>
                    <CronEditor
                        setCron={handleCronChange}
                        currentCron={newsletter.cron}
                    />
                    <div className={styles.actionCron}>
                        <button
                            onClick={handleCronUpdate}
                            className={styles.button}
                        >Atualizar
                        </button>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className={styles.button}
                        >Fechar
                        </button>

                    </div>
                </div>}
            </div>
            <div className={styles.content}>
                <div style={{display: 'flex', justifyContent: 'end'}}>
                    <Link
                        style={{
                            textDecoration: 'none',
                            color: '#4CAF50',
                            backgroundColor: 'white',
                            padding: '10px',
                            borderRadius: '5px',
                            marginLeft: '10px',
                        }}
                        to={{
                            pathname: `/${user.id}/${newsletter.id}/${null}`,
                        }}
                        state={{isAddMode: true}}
                    >
                        Adicionar Conteúdo
                    </Link>
                </div>
                <h3>Conteúdos</h3>
                {newsletter.contents.map((content, index) => (
                    <div key={index} className={styles.contentItem}>
                        <p><span>#{++index}</span> {content.subject}</p>
                        <Link
                            className={styles.button}
                            to={{
                                pathname: `/${user.id}/${newsletter.id}/${encodeURIComponent(content.subject)}`,
                            }}
                            state={{isAddMode: false}}
                        >
                            Editar
                        </Link>
                    </div>
                ))}
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ListContent;