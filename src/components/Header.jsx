import styles from '../styles/header.module.css';
import {useAuth} from "./AuthProvider.jsx";

const Header = ({resetAuth}) => {
    const {user} = useAuth();
    const handleLogout = () => {
        resetAuth();
    };
    return (
        <header className={styles.header}>
            <a
                style={{
                    textDecoration: 'none',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    padding: '10px',
                }}
                href={'/dashboard'}
            >ProTips</a>

            {user && <button
                className={styles.button}
                onClick={handleLogout}
            >Sair</button>}
        </header>
    );
};

export default Header;