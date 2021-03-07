import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { ChatNavigation } from './ChatNavigation';
import { ProfileNavigation } from './ProfileNavigation';
import { MembersNavigation } from './MembersNavigation';
import { MainScreenNavigation } from './MainScreenNavigation';
import { PostsNavigation } from './postsNavigation';

const MainNavigationStack = createMaterialBottomTabNavigator();

export const MainNavigation = () => {
	return (
		<MainNavigationStack.Navigator initialRouteName='main' shifting={true}>
			<MainNavigationStack.Screen
				name='main'
				component={MainScreenNavigation}
				options={{
					tabBarLabel: 'Главная',
					tabBarIcon: ({ color }: any) => (
						<FontAwesome5 name='home' size={22} color={color} />
					),
					tabBarColor: '#48aa48',
				}}
			/>
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
				name='members'
				component={MembersNavigation}
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
				component={ProfileNavigation}
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
