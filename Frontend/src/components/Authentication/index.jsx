import { useContext,useEffect,createContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { TokenContext } from '../../App';
import axios from 'axios';

export const UserContext = createContext()

function Authentication ({ children }) {
    const {token}  = useContext(TokenContext);
    const [user, setUser] = useState([])

	useEffect( () => {
		const fetchUserData = async () => {
			try{
				const response = await axios.get('http://localhost:5164/api/User/findbyid',{
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				setUser(response.data)
			}catch(error) {
				console.log('Truyền dữ liệu thất bại', error.response?.data || error.message)
			}
		}
		fetchUserData()
	},[token])

    if (token !== null) {
        return children;
    }
    return <Navigate to="/login"></Navigate>
    
};

export default Authentication;