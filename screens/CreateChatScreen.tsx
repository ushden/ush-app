import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	View,
	Text,
	Keyboard,
	TouchableOpacity,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Button, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addChat, fetchChats } from '../store/chats/chatsActions';
import { RootState } from '../store/rootReducer';
import { AntDesign } from '@expo/vector-icons';

export const CreateChatScreen = () => {
	const [chatName, setChatName] = useState('');
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const loading = useSelector((state: RootState) => state.loading.loading);

	const handlePress = () => {
		dispatch(addChat(chatName));
		navigation.goBack();
		dispatch(fetchChats());
	};

	useEffect(() => {
		navigation.setOptions({
			title: 'Создать чат',
			headerTitleAlign: 'center',
			headerStyle: { backgroundColor: '#aa4848' },
			headerTitleStyle: { color: '#fff' },
			headerLeftContainerStyle: {
				alignItems: 'center',
				justifyContent: 'center',
			},
			headerLeft: () => (
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<AntDesign
						name='arrowleft'
						size={25}
						color='#fff'
						style={{ marginLeft: 15 }}
					/>
				</TouchableOpacity>
			),
		});
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style='light' />
			<TouchableWithoutFeedback
				onPress={() => Keyboard.dismiss()}
				style={{ height: '100%' }}>
				<View style={styles.createChat}>
					<Text style={styles.title}>Введите название чата</Text>
					<TextInput
						mode='outlined'
						label='Название'
						selectionColor='#aa4848'
						onChangeText={(text) => setChatName(text)}
						underlineColor='#aa4848'
						style={styles.input}
					/>
					<Button
						mode='contained'
						color='#aa4848'
						onPress={handlePress}
						loading={loading}>
						Создать
					</Button>
				</View>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
	},
	createChat: {
		paddingHorizontal: 10,
		height: '100%',
		justifyContent: 'center',
	},
	title: {
		fontSize: 25,
		textAlign: 'center',
		color: 'black',
	},
	input: {
		marginBottom: 10,
	},
});
