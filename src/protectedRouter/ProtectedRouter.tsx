import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const [authState, setAuthState] = useState<{
    loading: boolean;
    isAuth: boolean;
    role: string | null;
  }>({
    loading: true,
    isAuth: false,
    role: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/auth/check', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        console.log('🔍 API Response:', data);

        setAuthState({
          loading: false,
          isAuth: !!data.user,
          role: data.user?.role ? data.user.role.toLowerCase().trim() : null,
        });
      })
      .catch(err => {
        console.error('❌ Error fetching auth check:', err);
        setAuthState({
          loading: false,
          isAuth: false,
          role: null,
        });
      });
  }, []);

  // Handle unauthorized navigation in effect
  useEffect(() => {
    if (!authState.loading && authState.isAuth) {
      const isRoleAllowed = allowedRoles
        .map(r => r.toLowerCase().trim())
        .includes(authState.role || '');

      if (!isRoleAllowed) {
        alert('🚫 You are not authorized to access this page.');
        navigate(-1); // Go back
      }
    }
  }, [authState, allowedRoles, navigate]);

  if (authState.loading) {
    return <div>Loading...</div>;
  }

  if (!authState.isAuth) {
    return <Navigate to="/login" replace />;
  }

  const isRoleAllowed = allowedRoles
    .map(r => r.toLowerCase().trim())
    .includes(authState.role || '');

  if (!isRoleAllowed) {
    return null; // Don't render content while redirecting
  }

  return <>{children}</>;
};

export default ProtectedRoute;
