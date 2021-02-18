import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';

const AuthNavigationStack = createStackNavigator();

export const AuthNavigation = () => {
	return (
		<AuthNavigationStack.Navigator initialRouteName='SignIn'>
			<AuthNavigationStack.Screen name='SignIn' component={SignInScreen} />
			<AuthNavigationStack.Screen name='SignUp' component={SignUpScreen} />
		</AuthNavigationStack.Navigator>
	);
};
