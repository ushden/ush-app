import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
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
} from 'react-native';
import { db } from '../libs/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { sendMessage } from '../store/chats/chatsActions';
import { ERROR, Message, MESSAGES } from '../store/types';
import { showAlert } from '../store/alert/alertActions';
import { GiftedChat, IMessage, Send, User } from 'react-native-gifted-chat';
import { ActivityIndicator } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const ChatScreen = () => {
	const { params }: any = useRoute();
	const navigation = useNavigation();
	const member = useSelector((state: RootState) => state.members.member);
	const dispatch = useDispatch();

	const [messages, setMessages] = useState([]);

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
			.collection(MESSAGES)
			.orderBy('createdAt', 'desc')
			.limit(20)
			.onSnapshot(
				(querySnapshot) => {
					const data: any = [];

					querySnapshot.forEach((doc) => {
						data.push(doc.data());
					});

					let messages = data.map((message: Message) => {
						return {
							_id: message.id,
							text: message.content,
							createdAt: +message.createdAt,
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

			dispatch(sendMessage(payload, chatType));
		});
	}, []);

	const onPressAvatar = (user: User) => {};

	const renderSend = (props: any) => {
		return (
			<Send {...props}>
				<View style={{ marginRight: 10, marginBottom: 10 }}>
					<FontAwesome name='send-o' size={24} color='#aa4848' />
				</View>
			</Send>
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
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style='light' />
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<KeyboardAvoidingView
					keyboardVerticalOffset={69}
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					style={styles.container}>
					<>
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
							renderLoading={() => (
								<ActivityIndicator size='large' style={{ paddingTop: 100 }} />
							)}
							onPressAvatar={onPressAvatar}
							renderSend={renderSend}
							scrollToBottom={true}
							scrollToBottomComponent={renderScrollToBottomComponet}
						/>
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
});
