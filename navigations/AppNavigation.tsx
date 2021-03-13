import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AuthNavigation } from './AuthNavigation';
import { MainNavigation } from './MainNavigation';
import { useUser } from '../hooks/useUser';

const AppNavigationStack = createStackNavigator();

export const AppNavigation = () => {
	const member = useUser();

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
