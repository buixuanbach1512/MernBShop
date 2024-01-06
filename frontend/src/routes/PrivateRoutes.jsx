import { Navigate } from 'react-router-dom';

export const PrivateRoutes = ({ children }) => {
    const getUserFromSessionStorage = sessionStorage.getItem('user')
        ? JSON.parse(sessionStorage.getItem('user'))
        : null;
    return getUserFromSessionStorage?.token !== undefined ? children : <Navigate to="/login" replace={true} />;
};
