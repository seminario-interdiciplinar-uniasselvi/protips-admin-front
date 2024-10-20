import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import api from '../services/api.js';
import styles from '../styles/listContent.module.css';

const ListContent = () => {
    const [newsletter, setNewsletter] = useState(null);
    const [newCron, setNewCron] = useState('');
    const [message, setMessage] = useState('');
    const userId = '6714131d00eb823fef45b03e';
    const newsletterId = '67142d9c1bc589448ac6a659';

    useEffect(() => {
        const fetchNewsletter = async () => {
            try {
                const response = await api.get(`/v1/users/${userId}/newsletters/${newsletterId}`);
                setNewsletter(response.data);
                setNewCron(response.data.cron);
            } catch (error) {
                setMessage('Error fetching newsletter');
            }
        };
        fetchNewsletter();
    }, [userId, newsletterId]);

    const handleCronChange = (e) => {
        setNewCron(e.target.value);
    };

    const handleCronUpdate = async () => {
        try {
            await api.put(`/v1/users/${userId}/newsletters/${newsletterId}`, {cron: newCron});
            setMessage('Cron updated successfully');
        } catch (error) {
            setMessage('Error updating cron');
        }
    };

    if (!newsletter) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.listContentContainer}>
            <h2>Newsletter</h2>
            <p><strong>Titulo:</strong> {newsletter.title}</p>
            <p><strong>Descrição:</strong> {newsletter.description}</p>
            <p><strong>Status:</strong> {newsletter.active ? 'ATIVA' : 'INATIVA'}</p>
            <div className={styles.editCron}>
                <strong>Cron:</strong>
                <input
                    type="text"
                    value={newCron}
                    onChange={handleCronChange}
                />
                <button className={styles.button} onClick={handleCronUpdate}>Atualizar Cron</button>
            </div>
            <div className={styles.content}>
                <div style={{display: 'flex', justifyContent:'end'}}>
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
                            pathname: `/users/${userId}/newsletters/${newsletterId}/content/${null}`,
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
                                pathname: `/users/${userId}/newsletters/${newsletterId}/content/${content.subject}`,
                            }}
                            state={{isAddMode: false}}
                        >
                            Editar
                        </Link>
                    </div>
                ))}
            </div>
            {message && <p style={{color: 'red'}}>{message}</p>}
        </div>
    );
};

export default ListContent;