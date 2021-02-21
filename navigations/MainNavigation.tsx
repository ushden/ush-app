import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { MainScreen } from '../screens/MainScreen';
import { ProfileScreen } from '../screens/MyProfileScreen';
import { UsersScreen } from '../screens/MembersListScreen';
import { FontAwesome5 } from '@expo/vector-icons';
import { ChatNavigation } from './ChatNavigation';

const MainNavigationStack = createMaterialBottomTabNavigator();

export const MainNavigation = () => {
	return (
		<MainNavigationStack.Navigator initialRouteName='main' shifting={true}>
			<MainNavigationStack.Screen name='main' component={MainScreen} />
			<MainNavigationStack.Screen
				name='chats'
				component={ChatNavigation}
				options={{
					tabBarLabel: 'Чаты',
					tabBarIcon: ({ color }: any) => (
						<FontAwesome5 name='rocketchat' size={20} color={color} />
					),
					tabBarColor: '#aa4848',
				}}
			/>
			<MainNavigationStack.Screen
				name='users'
				component={UsersScreen}
				options={{
					tabBarLabel: 'Члены',
					tabBarIcon: ({ color }: any) => (
						<FontAwesome5 name='users' size={20} color={color} />
					),
					tabBarColor: '#4848aa',
				}}
			/>
			<MainNavigationStack.Screen
				name='profile'
				component={ProfileScreen}
				options={{
					tabBarLabel: 'Профиль',
					tabBarIcon: ({ color }: any) => (
						<FontAwesome5 name='user-tie' size={24} color={color} />
					),
					tabBarColor: '#6a2c70',
				}}
			/>
		</MainNavigationStack.Navigator>
	);
};
