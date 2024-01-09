import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useMemo } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { MyContextProvider, useAuthContext } from './src/authContext/AuthContext';
import AuthGuard from './src/guards/AuthGuard';
import AppRouter from './src/routes/AppRouter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from "@notifee/react-native";
import { onDisplayNotification } from './src/NotificationManager';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from './src/assets/locales/en.json';
import hi from './src/assets/locales/hi.json';
import mr from './src/assets/locales/mr.json';

function App(): JSX.Element {
  const { state }: any = useAuthContext();

  useEffect(() => {
    onAppBootstrap()
    setTimeout(() => SplashScreen.hide(), 1000)
    messaging().onMessage(onMessageReceived);
  }, []);

  const onAppBootstrap = async () => {
    const permission = await notifee.requestPermission();
    if (permission) {
      if (Platform.OS == "android") {
        await messaging().registerDeviceForRemoteMessages();
      }
      const token = await messaging().getToken();
      await AsyncStorage.setItem('token', token);
    }
  }

  const onMessageReceived = (message: any) => {
    onDisplayNotification(message);
  }
  const resources = {
    en: { translation: en },
    hi: { translation: hi },
    mr: { translation: mr },
  };

  const languageDetector: any = {
    type: 'languageDetector',
    async: true,
    detect: (cb: (language: string) => void) => {
      cb(state?.selectedLanguage || RNLocalize.getLocales()[0].languageCode);
    },
    init: () => { },
    cacheUserLanguage: () => { },
  };

  useMemo(() =>
    i18n
      .use(initReactI18next)
      .use(languageDetector)
      .init({
        resources,
        compatibilityJSON: 'v3',
        fallbackLng: 'en', // Fallback language
        interpolation: {
          escapeValue: false, // React already escapes values
        },
      })
    , [state?.selectedLanguage])

  return (
    <NavigationContainer>
      <AuthGuard>
        <AppRouter />
      </AuthGuard>
    </NavigationContainer>
  );
}
export default () => (
  <MyContextProvider>
    <App />
  </MyContextProvider>
);