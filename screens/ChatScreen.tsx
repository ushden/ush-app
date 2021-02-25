import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
} from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { db, serverTime } from '../libs/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { sendMessage } from '../store/chats/messagesActions';
import { ERROR, Message } from '../store/types';
import { showAlert } from '../store/alert/alertActions';
import { SingleMessage } from '../components/SingleMessage';

export const ChatScreen = () => {
	const { params }: any = useRoute();
	const navigation = useNavigation();
	const member = useSelector((state: RootState) => state.members.member);
	const dispatch = useDispatch();

	const scrollView: any = useRef(null);

	const [message, setMessage] = useState('');
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const privateChatName = () => {
		let name = '';

		if (member?.id === params?.membersId[0]) {
			return (name = params?.membersName[1]);
		}

		if (member?.id === params?.membersId[1]) {
			return (name = params?.membersName[0]);
		}

		return name;
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			title: params?.chatName || privateChatName(),
		});
	}, []);

	useEffect(() => {
		const unsubscribe = db
			.collection(params._chatType)
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
		setTimeout(() => setLoading(false), 500);
	}, []);

	const contentSizeChangeHandle = () => {
		scrollView.current.scrollToEnd({ animated: true });
	};

	const handlePress = () => {
		if (message === '') {
			return dispatch(showAlert('Введите сообщение', ERROR));
		}
		Keyboard.dismiss();

		const payload: Message = {
			content: message,
			chatId: params.chatId,
			id: Date.now().toString(),
			sendTime: {
				month: new Date().getMonth().toString(),
				day: new Date().getDay().toString(),
				hours: new Date().getHours().toString(),
				minutes: new Date().getMinutes().toString(),
			},
			serverTime: serverTime,
			memberName: member?.name,
			memberAvatarUrl: member?.photoUrl,
			memberEmail: member?.email,
			memberId: member?.id,
		};

		const chatType: string = params?._chatType;

		dispatch(sendMessage(payload, chatType));
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
						<ScrollView
							style={styles.messageArea}
							ref={scrollView}
							onContentSizeChange={contentSizeChangeHandle}>
							{loading ? (
								<ActivityIndicator size='large' style={{ paddingTop: 100 }} />
							) : (
								<View>
									{data.map((message: Message) => {
										return <SingleMessage {...message} key={message.id} />;
									})}
								</View>
							)}
						</ScrollView>
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
		backgroundColor: '#ede7f6',
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
