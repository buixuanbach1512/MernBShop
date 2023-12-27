import { Navigate } from 'react-router-dom';

export const PrivateRoutes = ({ children }) => {
    const getUserFromSessionStorage = sessionStorage.getItem('customer')
        ? JSON.parse(sessionStorage.getItem('customer'))
        : null;
    return getUserFromSessionStorage?.token !== undefined ? children : <Navigate to="/login" replace={true} />;
};
