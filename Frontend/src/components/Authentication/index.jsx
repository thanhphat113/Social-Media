import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { TokenContext } from '../../App';

function Authentication ({ children }) {
    const { isHas }  = useContext(TokenContext);


    if (isHas) {
        return children;
    }

    return <Navigate to="/login"></Navigate>
    
};

export default Authentication;