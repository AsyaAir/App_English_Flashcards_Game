import './LoadingIndicator.module.scss'; // Подключим стили для анимации

const LoadingIndicator = () => {
    return (
        <div className="loading-container">
        <div className="loader"></div>
        </div>
    );
};

export default LoadingIndicator;