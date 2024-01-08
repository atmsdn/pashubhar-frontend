import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
messaging().setBackgroundMessageHandler(async _remoteMessage => {
    console.log(_remoteMessage, 'setBackgroundMessageHandler');
    await onMessageReceived(_remoteMessage)
});
AppRegistry.registerComponent(appName, () => App);
