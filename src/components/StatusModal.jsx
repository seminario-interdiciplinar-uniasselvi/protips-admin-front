import React from 'react';
import Modal from 'react-modal';
import styles from '../styles/statusModal.module.css';
Modal.setAppElement('#root');

function StatusModal({ isOpen, onRequestClose, message, isSuccess }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Status Modal"
            className={styles.statusModal}
            overlayClassName={styles.statusModalOverlay}
        >
            <div className={styles.statusModalContent}>
                <h2>{isSuccess ? 'Sucesso' : 'Erro'}</h2>
                <p>{message}</p>
                <button
                className={styles.button}
                    onClick={onRequestClose}
                >Fechar</button>
            </div>
        </Modal>
    );
}

export default StatusModal;