import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AuthNavigation } from './AuthNavigation';
import { MainNavigation } from './MainNavigation';
import { useUser } from '../hooks/useUser';
import { UpdateProfileScreen } from '../screens/UpdateProfileScreen';
import { UserProfileScreen } from '../screens/MemberProfileScreen';
import { CreateChatScreen } from '../screens/CreateChatScreen';
import { ChatScreen } from '../screens/ChatScreen';

const AppNavigationStack = createStackNavigator();

export const AppNavigation = () => {
	const user = useUser();

	return (
		<AppNavigationStack.Navigator headerMode='none'>
			{user ? (
				<AppNavigationStack.Screen name='Main' component={MainNavigation} />
			) : (
				<AppNavigationStack.Screen name='Auth' component={AuthNavigation} />
			)}
			<AppNavigationStack.Screen
				name='UpdateProfile'
				component={UpdateProfileScreen}
			/>
			<AppNavigationStack.Screen
				name='UserProfileScreen'
				component={UserProfileScreen}
			/>
			<AppNavigationStack.Screen
				name='CreateChat'
				component={CreateChatScreen}
			/>
			<AppNavigationStack.Screen name='Chat' component={ChatScreen} />
		</AppNavigationStack.Navigator>
	);
};
