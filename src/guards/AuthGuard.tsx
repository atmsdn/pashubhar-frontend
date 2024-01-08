import React, { ReactNode } from 'react';
import { StatusBar } from 'react-native';
import AuthNavigator from './AuthNavigator';
import { useAuthContext } from '../authContext/AuthContext';

interface AuthGuardProps {
    children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const { state }: any = useAuthContext();
    const isAuthenticated = JSON.parse(state?.isAuthenticated)
    if (isAuthenticated) {
        return <>{children}</>
    } else {
        return (
            <>
                <StatusBar backgroundColor='white' barStyle="dark-content" />
                <AuthNavigator />
            </>
        );
    }
};

export default AuthGuard;