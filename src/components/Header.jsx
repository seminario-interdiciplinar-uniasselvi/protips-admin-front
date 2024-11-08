import styles from '../styles/header.module.css';
import {Link} from "react-router-dom";

const Header = () => {
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
        </header>
    );
};

export default Header;