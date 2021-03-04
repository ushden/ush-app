import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from '../screens/MyProfileScreen';
import { UpdateProfileScreen } from '../screens/UpdateProfileScreen';
import { FontAwesome5 } from '@expo/vector-icons';

const ProfileNavigationStack = createStackNavigator();

export const ProfileNavigation = () => {
	return (
		<ProfileNavigationStack.Navigator>
			<ProfileNavigationStack.Screen
				name='Profile'
				component={ProfileScreen}
				options={{ headerShown: false }}
			/>
			<ProfileNavigationStack.Screen
				name='UpdateProfile'
				component={UpdateProfileScreen}
				options={{
					title: 'Редактировать',
					headerTitleAlign: 'center',
					headerStyle: { backgroundColor: '#6a2c70' },
					headerTitleStyle: { color: '#fff' },
					headerRightContainerStyle: { paddingRight: 10 },
					headerBackImage: () => (
						<FontAwesome5 name='arrow-left' size={24} color='white' />
					),
				}}
			/>
		</ProfileNavigationStack.Navigator>
	);
};
