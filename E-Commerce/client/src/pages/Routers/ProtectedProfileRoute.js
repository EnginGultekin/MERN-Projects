import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Profile from '../Profile';

function ProtectedProfileRoute() {

    const { loggedIn } = useAuth();
    if (!loggedIn) {
        return <Navigate to="/" />
    }
    return (
        <Profile />
    )
}

export default ProtectedProfileRoute;