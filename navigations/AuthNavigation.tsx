import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AuthNavigationStack = createStackNavigator();

export const AuthNavigation = () => {
	const navigation = useNavigation();

	return (
		<AuthNavigationStack.Navigator initialRouteName='SignIn'>
			<AuthNavigationStack.Screen name='SignIn' component={SignInScreen} />
			<AuthNavigationStack.Screen
				name='SignUp'
				component={SignUpScreen}
				options={{
					title: 'Регистрация',
					headerTitleAlign: 'center',
					headerStyle: {
						backgroundColor: 'black',
					},
					headerTitleStyle: {
						color: 'white',
					},
					headerBackTitleStyle: {
						color: 'white',
					},
					headerLeft: () => (
						<AntDesign
							name='arrowleft'
							size={30}
							color='white'
							onPress={() => navigation.goBack()}
							style={{ paddingLeft: 10 }}
						/>
					),
				}}
			/>
		</AuthNavigationStack.Navigator>
	);
};
