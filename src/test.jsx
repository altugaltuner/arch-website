import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider'; // useAuth hook'unu içe aktar

const ProtectedRoute = ({ children, adminOnly }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (adminOnly && user.access.role !== 'Admin') {
        return <Navigate to="/not-authorized" />; // Yetkisiz kullanıcılar için yönlendirme
    }

    return children;
};

export default ProtectedRoute;
