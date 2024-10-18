import { useContext } from 'react';
import { Navigate} from 'react-router-dom';
import { TokenContext } from '../../App';


function Authentication ({ children }) {
    const { user }  = useContext(TokenContext);
    if (user) {
        return children
    }

    return <Navigate to="/login"></Navigate>
    
};

export default Authentication;