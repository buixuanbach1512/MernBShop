import { Navigate } from 'react-router-dom';

export const OpenRoutes = ({ children }) => {
    const getUserFromSessionStorage = sessionStorage.getItem('customer')
        ? JSON.parse(sessionStorage.getItem('customer'))
        : null;
    return getUserFromSessionStorage?.token === undefined ? children : <Navigate to="/" replace={true} />;
};
