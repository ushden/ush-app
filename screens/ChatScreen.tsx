import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
	SafeAreaView,
	View,
	TouchableWithoutFeedback,
	Keyboard,
	TouchableOpacity,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	Platform,
	Text,
} from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { db, serverTime } from '../libs/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { sendMessage, fetchMessages } from '../store/chats/messagesActions';
import { ERROR, Message } from '../store/types';
import { showAlert } from '../store/alert/alertActions';
import { SingleMessage } from '../components/SingleMessage';

export const ChatScreen = () => {
	const { params }: any = useRoute();
	const navigation = useNavigation();
	const member = useSelector((state: RootState) => state.members.member);

	const dispatch = useDispatch();
	const [message, setMessage] = useState('');
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		navigation.setOptions({
			title: params?.chatName,
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

	useEffect(() => {
		dispatch(fetchMessages(params.chatId));
	}, [params]);

	useEffect(() => {
		const unsubscribe = db
			.collection('chats')
			.doc(params.chatId)
			.collection('messages')
			.orderBy('sendTime', 'asc')
			.onSnapshot(
				(querySnapshot) => {
					const data: any = [];

					querySnapshot.forEach((doc) => {
						data.push(doc.data());
					});

					setData(data);
				},
				(error) => dispatch(showAlert(error.message, ERROR))
			);

		return () => unsubscribe();
	}, []);

	useLayoutEffect(() => {
		setTimeout(() => setLoading(false), 2000);
	}, []);

	const handlePress = () => {
		if (message === '') {
			return dispatch(showAlert('Введите сообщение', ERROR));
		}
		Keyboard.dismiss();

		const payload: Message = {
			content: message,
			chatId: params.chatId,
			id: Date.now().toString(),
			sendTime: serverTime,
			memberName: member?.name,
			memberAvatarUrl: member?.photoUrl,
			memberEmail: member?.email,
			memberId: member?.id,
		};

		dispatch(sendMessage(payload));
		setMessage('');
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style='light' />
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<KeyboardAvoidingView
					keyboardVerticalOffset={90}
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					style={styles.container}>
					<>
						{loading ? (
							<ScrollView style={styles.messageArea}>
								<ActivityIndicator size='large' style={{ paddingTop: 100 }} />
							</ScrollView>
						) : (
							<ScrollView style={styles.messageArea}>
								{data.map((message: Message) => {
									if (data.length === 0) {
										return <Text>Сообщений пока нету, напиши что-то</Text>;
									}
									return <SingleMessage {...message} key={message.id} />;
								})}
							</ScrollView>
						)}
						<View style={styles.inputContainer}>
							<TextInput
								mode='flat'
								label='Сообщение'
								style={styles.input}
								underlineColor='transparent'
								value={message}
								onChangeText={(text) => setMessage(text)}
							/>
							<TouchableOpacity onPress={handlePress}>
								<FontAwesome name='send-o' size={30} color='blue' />
							</TouchableOpacity>
						</View>
					</>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	messageArea: {
		flex: 1,
		width: '100%',
	},
	inputContainer: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		alignItems: 'center',
		width: '100%',
		justifyContent: 'space-between',
		paddingRight: 15,
	},
	input: {
		bottom: 0,
		flex: 1,
		marginRight: 15,
		borderColor: 'transparent',
		backgroundColor: '#fff',
		borderWidth: 1,
		borderRadius: 30,
	},
});
