import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { AuthNavigation } from './AuthNavigation';
import { MainNavigation } from './MainNavigation';
import { useUser } from '../hooks/useUser';
import { ImagePicker } from 'expo';
import { Platform } from 'react-native';
import { showAlert } from '../store/alert/alertActions';
import { ERROR } from '../store/types';
import { useDispatch } from 'react-redux';

const AppNavigationStack = createStackNavigator();

export const AppNavigation = () => {
	const member = useUser();
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			if (Platform.OS !== 'web') {
				const {
					status,
				} = await ImagePicker.requestMediaLibraryPermissionsAsync();

				if (status !== 'granted') {
					dispatch(
						showAlert('Дай доступ к фоткам, для аватарки, спасибо!', ERROR)
					);
				}
			}
		})();
	}, []);

	useEffect(() => {
		(async () => {
			if (Platform.OS !== 'web') {
				const { status } = await ImagePicker.requestCameraPermissionsAsync();
				if (status !== 'granted') {
					dispatch(showAlert('Дай доступ к камере, спасибо!', ERROR));
				}
			}
		})();
	}, []);

	useEffect(() => {
		(async () => {
			if (Platform.OS !== 'web') {
				const { status } = await ImagePicker.requestCameraPermissionsAsync();
				if (status !== 'granted') {
					dispatch(showAlert('Дай доступ к камере, спасибо!', ERROR));
				}
			}
		})();
	}, []);

	return (
		<AppNavigationStack.Navigator headerMode='none'>
			{member ? (
				<AppNavigationStack.Screen name='Main' component={MainNavigation} />
			) : (
				<AppNavigationStack.Screen name='Auth' component={AuthNavigation} />
			)}
		</AppNavigationStack.Navigator>
	);
};
