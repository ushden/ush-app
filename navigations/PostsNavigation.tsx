import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from '../screens/MainScreen';
import { CreatePostScreen } from '../screens/CreatePostScreen';

const PostsNavigationStack = createStackNavigator();

export const PostsNavigation = () => {
	return (
		<PostsNavigationStack.Navigator headerMode='none'>
			<PostsNavigationStack.Screen name='MainScreen' component={MainScreen} />
			<PostsNavigationStack.Screen
				name='CreatePostScreen'
				component={CreatePostScreen}
			/>
		</PostsNavigationStack.Navigator>
	);
};
