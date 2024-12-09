import '../../css/Notification.css';

const Notification = ({ type, message, onClose }) => {
    return (
        <div className={`notification ${type}`}>
            <p>{message}</p>
            <button onClick={onClose} className="close-btn">✖</button>
        </div>
    );
};

export default Notification;