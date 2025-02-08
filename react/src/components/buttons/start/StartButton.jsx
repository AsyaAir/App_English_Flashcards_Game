import styles from './StartButton.module.scss';
// import { NavLink } from 'react-router'; 

const StartButton = () => {
    return (
        <button type='button' className={styles.startbutton}>
            <p className={styles.text}>Lets START</p>
            </button>
    );
}; 

export default StartButton;