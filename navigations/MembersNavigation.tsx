import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MembersScreen } from '../screens/MembersListScreen';
import { MemberProfileScreen } from '../screens/MemberProfileScreen';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const MembersNavigationStack = createStackNavigator();

export const MembersNavigation = () => {
	const navigation = useNavigation();

	return (
		<MembersNavigationStack.Navigator>
			<MembersNavigationStack.Screen
				name='Members'
				component={MembersScreen}
				options={{ headerShown: false }}
			/>
			<MembersNavigationStack.Screen
				name='MemberProfile'
				component={MemberProfileScreen}
				options={{
					headerStatusBarHeight: 10,
					headerTitle: '',
					headerStyle: {
						backgroundColor: '#4848aa',
					},
					headerLeft: () => (
						<TouchableOpacity onPress={() => navigation.navigate('Members')}>
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
		</MembersNavigationStack.Navigator>
	);
};
