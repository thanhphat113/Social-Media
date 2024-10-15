import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AccountContext } from '../../App';

function Authentication ({ children }) {
    const { token } = useContext(AccountContext);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default Authentication;