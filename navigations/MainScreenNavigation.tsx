import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { PostsNavigation } from './PostsNavigation';
import { ContactsScreen } from '../screens/ContactsScreen';
import { DeviceScreen } from '../screens/DeviceScreen';

const MainScreenNavigationStack = createMaterialTopTabNavigator();

export const MainScreenNavigation = () => {
	return (
		<MainScreenNavigationStack.Navigator
			initialRouteName='Posts'
			lazy={true}
			tabBarOptions={{
				pressColor: '#48aa48',
				style: { paddingTop: 20 },
				scrollEnabled: true,
				indicatorStyle: { backgroundColor: '#48aa48' },
			}}
			removeClippedSubviews={true}>
			<MainScreenNavigationStack.Screen
				name='Posts'
				component={PostsNavigation}
				options={{
					tabBarLabel: 'Посты',
				}}
			/>
			<MainScreenNavigationStack.Screen
				name='Contacts'
				component={ContactsScreen}
				options={{ tabBarLabel: 'Контакты' }}
			/>
			<MainScreenNavigationStack.Screen
				name='Device'
				component={DeviceScreen}
				options={{ tabBarLabel: 'Устройство' }}
			/>
		</MainScreenNavigationStack.Navigator>
	);
};
