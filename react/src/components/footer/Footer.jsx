// import './Footer.module.scss';
import styles from './Footer.module.scss'; // Импортируем стили как объект
// styles — это объект, который содержит все классы, определенные в Footer.module.scss.

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p className={styles.text}>by AsyaAir 2025</p>
        </footer>
    );
};
// styles.footer и styles.text будут соответствовать уникальным классам, сгенерированным во время сборки.

export default Footer;