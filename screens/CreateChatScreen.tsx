import React, { useState } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	View,
	Text,
	StatusBar as StatusBarNative,
	Keyboard,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Button, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useUser } from '../hooks/useUser';
import { serverTime } from '../libs/firebase';
import { addChat } from '../store/chats/chatsActions';
import { Chat } from '../store/types';

export const CreateChatScreen = () => {
	const [chatName, setChatName] = useState('');
	const dispatch = useDispatch();

	const member = useUser();

	const handlePress = () => {
		const payload: Chat = {
			chatName: chatName,
			chatId: member?.uid,
			chatAvatr:
				'https://business.ucr.edu/sites/g/files/rcwecm2116/files/styles/form_preview/public/icon-group.png?itok=3LzNDSRI',
			messages: [
				{
					title: 'Вы создали публичный чат, приятно общения',
					timeStamp: serverTime.toString(),
					id: Date.now().toString(),
					memberName: 'Club 48',
					photoURL: '',
					email: '',
				},
			],
		};

		dispatch(addChat(payload));
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.statusBar}></View>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View style={styles.createChat}>
					<Text style={styles.title}>Введите название чата</Text>
					<TextInput
						mode='outlined'
						label='Название'
						selectionColor='#aa4848'
						onChangeText={(text) => setChatName(text)}
						underlineColor='#aa4848'
					/>
					<Button mode='contained' color='#aa4848' onPress={handlePress}>
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
		alignItems: 'center',
	},
	statusBar: {
		paddingTop: StatusBarNative.currentHeight,
		backgroundColor: '#aa4848',
	},
	createChat: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 25,
		textAlign: 'center',
	},
});
