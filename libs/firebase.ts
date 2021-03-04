import firebase from 'firebase';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

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
