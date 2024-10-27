import React from 'react';

const Clipboard = ({ userId, newsletterId }) => {
    const handleCopy = () => {
        const link = `http://localhost:5174/${userId}/${newsletterId}`;
        navigator.clipboard.writeText(link).then(() => {
            alert('Link copiado para a área de transferência!');
        }).catch(err => {
            console.error('Erro ao copiar o link: ', err);
        });
    };

    return (
        <button onClick={handleCopy} style={{
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
        }}>
            Copiar Link
        </button>
    );
};

export default Clipboard;