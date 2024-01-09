import notifee, { AndroidStyle } from "@notifee/react-native";
import { Platform } from "react-native";

export const onDisplayNotification = async (message) => {
    try {
        if (message && message?.notification) {
            const channelId = await notifee.createChannel({
                id: 'default',
                name: 'Default Channel'
            });
            if (Platform.OS === 'ios') {
                delete message.data?.notifee_options;
            }
            await notifee.displayNotification({
                title: message.notification.title,
                body: message.notification.body,
                sound: 'ringtone',
                android: {
                    channelId: channelId,
                    sound: 'ringtone'
                },
            });
        }
    } catch (error) {
        console.log(error)
    }
}

