// Создание компонента для отображения ошибок, 
// если они возникнут

import './ErrorMessage.module.scss';
import PropTypes from 'prop-types';

function ErrorMessage({ message }) {
    return <div className="error-message">{message}</div>;
}
ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
};

export default ErrorMessage;