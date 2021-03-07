import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import firebase from 'firebase';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { Alert, Platform } from 'react-native';

const config = {
	apiKey: 'AIzaSyAubCU9j4t_PkXlI3aVbbqFM1h6erWpwgE',
	authDomain: 'ush-app.firebaseapp.com',
	projectId: 'ush-app',
	storageBucket: 'ush-app.appspot.com',
	messagingSenderId: '665223787718',
	appId: '1:665223787718:web:5504890570353d2583d3c7',
};

if (firebase.apps.length === 0) {
	firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});
interface Data {
	name: string;
	message: string;
}

export const sendPushNotification = async (
	expoPushToken: string,
	data: Data
) => {
	const message = {
		to: expoPushToken,
		sound: 'default',
		title: 'У вас новое сообщение',
		body: `${data.name}: ${data.message}`,
		data: { someData: 'goes here' },
	};

	await fetch('https://exp.host/--/api/v2/push/send', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Accept-encoding': 'gzip, deflate',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(message),
	});
};

export const registerForPushNotificationsAsync = async () => {
	let token;

	if (Constants.isDevice) {
		const {
			status: existingStatus,
		} = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			Alert.alert('Разрешение', 'Нужен доступ к уведомлениям', [
				{ text: 'OK', onPress: () => console.log('OK Pressed') },
			]);
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}

		if (finalStatus !== 'granted') {
			Alert.alert('Разрешение', 'Нужен доступ к уведомлениям', [
				{ text: 'OK', onPress: () => console.log('OK Pressed') },
			]);
			return;
		}

		token = (await Notifications.getExpoPushTokenAsync()).data;
		console.log(token);
	} else {
		Alert.alert('Не устройство', 'На эмуляторах не работают уведомления', [
			{ text: 'OK', onPress: () => console.log('OK Pressed') },
		]);
	}

	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}

	return token;
};
