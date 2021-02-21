import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ChatsSrceen } from '../screens/ChatsSrceen';
import { ChatScreen } from '../screens/ChatScreen';
import { CreateChatScreen } from '../screens/CreateChatScreen';

const ChatNavigationStack = createStackNavigator();

export const ChatNavigation = () => {
	return (
		<ChatNavigationStack.Navigator
			initialRouteName='ChatsSrceen'
			headerMode='screen'>
			<ChatNavigationStack.Screen
				component={ChatsSrceen}
				name='ChatsSrceen'
				options={{ headerShown: false }}
			/>
			<ChatNavigationStack.Screen component={ChatScreen} name='ChatSrceen' />
			<ChatNavigationStack.Screen
				component={CreateChatScreen}
				name='CreateChatScreen'
			/>
		</ChatNavigationStack.Navigator>
	);
};
