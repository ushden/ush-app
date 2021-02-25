import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, View, StatusBar as StatusBarNative } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../libs/firebase';
import { createPrivateChat } from '../store/chats/chatsActions';
import { RootState } from '../store/rootReducer';
import { PrivateChat, PRIVATE_CHATS } from '../store/types';

export const UserProfileScreen = () => {
	const { params }: any = useRoute();
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const member: any = auth.currentUser;
	const privateChats = useSelector(
		(state: RootState) => state.chats.privateChats
	);

	const handlePress = () => {
		const chatInfo: PrivateChat = {
			_chatType: PRIVATE_CHATS,
			chatId: `Chat_${Date.now().toString()}`,
			createMemberId: member?.uid,
			membersId: [member?.uid, params?.id],
			membersName: [member?.displayName, params?.name],
			membersPhotoUrl: [member?.photoURL, params?.photoUrl],
		};

		let isNotCreate = true;

		for (let i = 0; i < privateChats.length; i++) {
			if (privateChats.length === 0) {
				isNotCreate = !isNotCreate;

				dispatch(createPrivateChat(chatInfo));
				navigation.navigate('ChatSrceen', { ...chatInfo });
				break;
			}

			if (
				privateChats[i].membersId.includes(member.uid) &&
				privateChats[i].membersId.includes(params.id)
			) {
				console.log('chat exist');

				isNotCreate = !isNotCreate;
				navigation.navigate('ChatSrceen', { ...privateChats[i] });
				break;
			}
		}

		if (isNotCreate) {
			dispatch(createPrivateChat(chatInfo));
			navigation.navigate('ChatSrceen', { ...chatInfo });
		}
	};

	return (
		<SafeAreaView>
			<View
				style={{
					paddingTop: StatusBarNative.currentHeight,
					backgroundColor: '#48aa48',
				}}></View>
			<View>
				<Button mode='outlined' onPress={handlePress}>
					Написать сообщение
				</Button>
			</View>
		</SafeAreaView>
	);
};
