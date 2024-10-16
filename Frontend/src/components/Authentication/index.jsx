import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AccountContext } from '../../App';

function Authentication ({ children }) {
    const token  = useContext(AccountContext);

    if (token !== null) {
        return children;
    }
    return <Navigate to="/login"></Navigate>
    
};

export default Authentication;