import { PermissionsAndroid, Platform } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';

export const requestExternalStoragePermission = async () => {
    try {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'External Storage Permission',
                    message: 'This app needs access to your external storage to save screenshots.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true
            } else {
                return false
            }
        } else if (Platform.OS === 'ios') {
            const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
            if (result === 'granted') {
                return true
            } else {
                return false
            }
        }
    } catch (error) {
        console.error('Error requesting external storage permission:', error);
    }
};
