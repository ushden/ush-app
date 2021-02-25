import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ChatsSrceen } from '../screens/ChatsSrceen';
import { ChatScreen } from '../screens/ChatScreen';
import { CreateChatScreen } from '../screens/CreateChatScreen';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ChatNavigationStack = createStackNavigator();

export const ChatNavigation = () => {
	const navigation = useNavigation();
	return (
		<ChatNavigationStack.Navigator
			initialRouteName='ChatsSrceen'
			headerMode='screen'>
			<ChatNavigationStack.Screen
				component={ChatsSrceen}
				name='ChatsSrceen'
				options={{ headerShown: false }}
			/>
			<ChatNavigationStack.Screen
				component={ChatScreen}
				name='ChatSrceen'
				options={{
					headerTitleAlign: 'center',
					headerStyle: { backgroundColor: '#aa4848' },
					headerTitleStyle: { color: '#fff' },
					headerLeftContainerStyle: {
						alignItems: 'center',
						justifyContent: 'center',
					},
					headerLeft: () => (
						<TouchableOpacity
							onPress={() => navigation.navigate('ChatsSrceen')}>
							<AntDesign
								name='arrowleft'
								size={25}
								color='#fff'
								style={{ marginLeft: 15 }}
							/>
						</TouchableOpacity>
					),
				}}
			/>
			<ChatNavigationStack.Screen
				component={CreateChatScreen}
				name='CreateChatScreen'
			/>
		</ChatNavigationStack.Navigator>
	);
};
