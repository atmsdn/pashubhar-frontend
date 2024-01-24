
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OTP_SCREEN, SIGIN_SCREEN, SIGNUP_SCREEN } from '../routes/Routes';
import SignInScreen from '../screens/SignInScreen';
import OtpScreen from '../screens/OtpScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { StyleSheet, TouchableOpacity } from 'react-native';
import BackButtonIcon from '../shared/svg/BackButtonIcon';
import { CYAN_BLUE } from '../shared/constant/color';
import { t } from 'i18next';

export type RootStackParamList = {
    SignInScreen: any,
    OtpScreen: any,
    SignUpScreen: any,
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

function AuthNavigator({ navigation }: any): JSX.Element {
    return (
        <RootStack.Navigator>
            <RootStack.Screen
                name={SIGIN_SCREEN}
                component={SignInScreen}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerTitle: t('Sign In'),
                    headerTitleStyle: { fontWeight: 'bold', color: CYAN_BLUE, fontSize: 18 },
                })}
            />
            <RootStack.Screen
                name={OTP_SCREEN}
                component={OtpScreen}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerTitle: t('Otp Verification'),
                    headerTitleStyle: { fontWeight: 'bold', color: CYAN_BLUE, fontSize: 18 },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconStyle}>
                            <BackButtonIcon width={25} height={33} />
                        </TouchableOpacity>
                    ),
                })}
            />
            <RootStack.Screen
                name={SIGNUP_SCREEN}
                component={SignUpScreen}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerTitle: t('Sign Up'),
                    headerTitleStyle: { fontWeight: 'bold', color: CYAN_BLUE, fontSize: 18 },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconStyle}>
                            <BackButtonIcon width={25} height={33} />
                        </TouchableOpacity>
                    ),
                })}
            />
        </RootStack.Navigator>
    );
}

export default AuthNavigator;
const styles = StyleSheet.create({
    backIconStyle: {
        alignItems: 'center',
        marginRight: 10
    }
})