import { useRoute } from '@react-navigation/native';
import React from 'react';
import {
	SafeAreaView,
	Text,
	View,
	StatusBar as StatusBarNative,
} from 'react-native';

export const UserProfileScreen = () => {
	const { params } = useRoute();
	const { name, email }: any = params;

	return (
		<SafeAreaView>
			<View
				style={{
					paddingTop: StatusBarNative.currentHeight,
					backgroundColor: '#48aa48',
				}}></View>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					paddingTop: 200,
				}}>
				<Text>{name}</Text>
				<Text>{email}</Text>
			</View>
		</SafeAreaView>
	);
};
