import PropTypes from 'prop-types';
import './Alert.css'

export default function Alert({ alert }) {
    const capitalize = (word) => {
        if (word) {
            const lower = word.toLowerCase();
            return lower.charAt(0).toUpperCase() + lower.slice(1);
        }
        return '';
    };

    return (
        alert && (
            <div className={`alert alert-${alert.type} alert-relative`} role="alert">
                <strong>{capitalize(alert.type)}</strong>: {alert.msg}
            </div>
        )
    );
}

// PropTypes validation
Alert.propTypes = {
    alert: PropTypes.shape({
        type: PropTypes.string.isRequired,
        msg: PropTypes.string.isRequired,
    }),
};
