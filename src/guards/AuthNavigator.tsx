
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OTP_SCREEN, SIGIN_SCREEN, SIGNUP_SCREEN } from '../routes/Routes';
import SignInScreen from '../screens/SignInScreen';
import OtpScreen from '../screens/OtpScreen';
import SignUpScreen from '../screens/SignUpScreen';

export type RootStackParamList = {
    SignInScreen: any,
    OtpScreen: any,
    SignUpScreen: any,
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

function AuthNavigator(): JSX.Element {
    return (
        <RootStack.Navigator>
            <RootStack.Screen options={{ headerShown: false }} name={SIGIN_SCREEN} component={SignInScreen} />
            <RootStack.Screen name={OTP_SCREEN} options={{ headerShown: false }} component={OtpScreen} />
            <RootStack.Screen name={SIGNUP_SCREEN} options={{ headerShown: false }} component={SignUpScreen} />
        </RootStack.Navigator>
    );
}

export default AuthNavigator;