import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';

export const UpdateProfileScreen = () => {
	const navigation = useNavigation();

	useEffect(() => {
		navigation.setOptions({
			title: 'Редактировать',
			headerTitleAlign: 'center',
			headerRight: () => {
				return (
					<TouchableOpacity>
						<FontAwesome5 name='save' size={24} color='white' />
					</TouchableOpacity>
				);
			},
			headerStyle: { backgroundColor: '#6a2c70' },
			headerTitleStyle: { color: '#fff' },
			headerRightContainerStyle: { paddingRight: 10 },
			headerBackImage: () => (
				<FontAwesome5 name='arrow-left' size={24} color='white' />
			),
		});
	}, [navigation]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar style='light' />
			<Text>Update</Text>
			<ScrollView>
				<TextInput mode='outlined' label='Имя' />
				<TextInput mode='outlined' label='Имя' />
			</ScrollView>
		</SafeAreaView>
	);
};
