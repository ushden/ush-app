import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import React, {
	useEffect,
	useLayoutEffect,
	useState,
	useCallback,
} from 'react';
import {
	SafeAreaView,
	TouchableWithoutFeedback,
	Keyboard,
	KeyboardAvoidingView,
	StyleSheet,
	Platform,
	View,
	Text,
	TouchableOpacity,
	Image,
} from 'react-native';
import { db, sendPushNotification } from '../libs/firebase';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { sendImage, sendMessage } from '../store/chats/chatsActions';
import {
	ERROR,
	Message,
	MESSAGES,
	PUBLIC_CHATS,
	SUCCSSES,
} from '../store/types';
import { showAlert } from '../store/alert/alertActions';
import {
	Bubble,
	GiftedChat,
	IMessage,
	Send,
	User,
} from 'react-native-gifted-chat';
import { ActivityIndicator, Button, Modal, Portal } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const ChatScreen = () => {
	const { params }: any = useRoute();

	const navigation = useNavigation();
	const member = useSelector((state: RootState) => state.members.member);
	const dispatch = useDispatch();

	const [messages, setMessages] = useState([]);
	const [img, setImg] = useState('');
	const [visible, setVisible] = useState(false);

	const getName = () => {
		let name = '';

		if (member?.id === params?.membersId[0]) {
			return (name = params?.membersName[1]);
		}

		if (member?.id === params?.membersId[1]) {
			return (name = params?.membersName[0]);
		}

		return name;
	};

	const getToken = () => {
		let token = '';

		if (member?.id === params?.membersId[0]) {
			return (token = params?.membersToken[1]);
		}

		if (member?.id === params?.membersId[1]) {
			return (token = params?.membersToken[0]);
		}

		return token;
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			title: params?._chatType === PUBLIC_CHATS ? params?.chatName : getName(),
		});
	}, []);
	console.log(img);

	// useEffect(() => {
	// 	if (img) {
	// 		onSendImage();
	// 	}
	// }, [img]);

	useEffect(() => {
		const unsubscribe = db
			.collection(params._chatType)
			.doc(params.chatId)
			.collection(MESSAGES)
			.orderBy('createdAt', 'desc')
			.limit(50)
			.onSnapshot(
				(querySnapshot) => {
					const data: any = [];

					querySnapshot.forEach((doc) => {
						data.push(doc.data());
					});

					let messages = data.map((message: Message) => {
						return {
							_id: message.id,
							text: message.content || ' ',
							createdAt: +message.createdAt,
							image: message.image || null,
							user: {
								_id: message.member?.id,
								name: message.member?.name,
								avatar: message.member?.photoUrl,
							},
						};
					});

					setMessages(messages);
				},
				(error) => dispatch(showAlert(error.message, ERROR))
			);

		return () => unsubscribe();
	}, []);

	const onSendImage = () => {
		const chatType: string = params?._chatType;
		const payload: Message = {
			chatId: params.chatId,
			id: `Image_${Date.now()}`,
			createdAt: Date.now().toString(),
			image: img,
			member: {
				name: member?.name,
				id: member?.id,
				photoUrl: member?.photoUrl,
				email: member?.email,
			},
		};
		const pushData = {
			name: member?.name,
			message: 'Изображение',
		};

		dispatch(sendImage(payload, chatType));
		setImg('');

		if (params?._chatType === PUBLIC_CHATS) {
			return;
		} else {
			sendPushNotification(getToken(), pushData).then(() => {
				console.log(`Уведомление ушло ${getName()}. Push token ${getToken()}`);
			});
		}
	};

	const onSend = useCallback((messages = []) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, messages)
		);
		messages.forEach((message: IMessage) => {
			const chatType: string = params?._chatType;
			const payload: Message = {
				content: message.text,
				chatId: params.chatId,
				id: message._id,
				createdAt: Date.now().toString(),
				member: {
					name: member?.name,
					id: member?.id,
					photoUrl: member?.photoUrl,
					email: member?.email,
				},
			};

			const pushData = {
				name: member?.name,
				message: message.text,
			};

			dispatch(sendMessage(payload, chatType));

			if (params?._chatType === PUBLIC_CHATS) {
				return;
			} else {
				sendPushNotification(getToken(), pushData).then(() => {
					console.log(
						`Уведомление ушло ${getName()}. Push token ${getToken()}`
					);
				});
			}
		});
	}, []);

	const onPressAvatar = (user: User) => dispatch(showAlert('KEK', SUCCSSES));

	const renderSend = (props: any) => {
		return (
			<Send {...props}>
				<View style={{ marginRight: 10, marginBottom: 10 }}>
					<FontAwesome name='send-o' size={24} color='#aa4848' />
				</View>
			</Send>
		);
	};

	const openCamera = async () => {
		setVisible(false);

		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
		});

		if (!result.cancelled) {
			setImg(result.uri);
		}
	};

	const openMediaLibrary = async () => {
		setVisible(false);

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
		});

		if (!result.cancelled) {
			setImg(result.uri);
		}
	};

	const renderActions = () => {
		return (
			<View style={{ paddingLeft: 10, paddingBottom: 10 }}>
				<TouchableOpacity activeOpacity={0.8} onPress={() => setVisible(true)}>
					<AntDesign name='plussquareo' size={26} color='gray' />
				</TouchableOpacity>
			</View>
		);
	};

	const renderScrollToBottomComponet = () => {
		return (
			<View>
				<MaterialCommunityIcons
					name='arrow-down-drop-circle-outline'
					size={24}
					color='black'
				/>
			</View>
		);
	};

	const renderBubble = (props: Bubble['props']) => {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					left: { backgroundColor: 'white' },
					right: { backgroundColor: '#aa4848' },
				}}
			/>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style='light' />
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<KeyboardAvoidingView
					keyboardVerticalOffset={69}
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					style={styles.container}>
					{/* <> */}
					<GiftedChat
						messages={messages}
						onSend={(messages) => onSend(messages)}
						user={{
							_id: member?.id,
							name: member?.name,
							avatar: member?.photoUrl,
						}}
						placeholder='Сообщение'
						// isTyping={true}
						// loadEarlier={true}
						isLoadingEarlier={true}
						infiniteScroll={true}
						renderBubble={renderBubble}
						renderLoading={() => (
							<ActivityIndicator size='large' style={{ paddingTop: 100 }} />
						)}
						onPressAvatar={onPressAvatar}
						renderSend={renderSend}
						scrollToBottom={true}
						scrollToBottomComponent={renderScrollToBottomComponet}
						showUserAvatar={true}
						renderUsernameOnMessage={true}
						renderAvatarOnTop={true}
						renderActions={renderActions}
					/>
					{/* </> */}
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
			<Portal>
				<Modal
					visible={visible}
					dismissable={true}
					onDismiss={() => setVisible(false)}>
					<View
						style={{
							backgroundColor: '#fff',
							padding: 20,
							paddingHorizontal: 40,
						}}>
						<Button
							style={{ marginVertical: 10 }}
							mode='outlined'
							icon='image'
							onPress={openMediaLibrary}
							labelStyle={{ color: '#aa4848' }}>
							Выбрать фото
						</Button>
						<Button
							style={{ marginVertical: 10 }}
							mode='outlined'
							icon='camera'
							onPress={openCamera}
							labelStyle={{ color: '#48aa48' }}>
							Сделать фото
						</Button>
					</View>
				</Modal>
			</Portal>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
