import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	StatusBar as StatusBarNative,
} from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChats, fetchPrivateChats } from '../store/chats/chatsActions';
import { RootState } from '../store/rootReducer';
import { showAlert } from '../store/alert/alertActions';
import { PublicChat, ERROR, PRIVATE_CHATS, PUBLIC_CHATS } from '../store/types';
import { db } from '../libs/firebase';
import { PrivateChats } from '../components/PrivateChats';
import { PublicChats } from '../components/PublicChats';

export const ChatsSrceen = () => {
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const publicChats = useSelector(
		(state: RootState) => state.chats.publicChats
	);
	const isPrivateChatsLoaded = useSelector(
		(state: RootState) => state.chats.isPrivateChatsLoaded
	);
	const isPublicChatsLoaded = useSelector(
		(state: RootState) => state.chats.isPublicChatsLoaded
	);

	const { id }: any = useSelector((state: RootState) => state.members.member);

	useEffect(() => {
		const unsubscribe = db.collection(PUBLIC_CHATS).onSnapshot(() => {
			dispatch(fetchChats());
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const unsubscribe = db.collection(PRIVATE_CHATS).onSnapshot(() => {
			dispatch(fetchPrivateChats());
		});

		return () => unsubscribe();
	}, []);

	useLayoutEffect(() => {
		setLoading(false);
	}, []);

	const handlePress = () => {
		setLoading(true);

		const isCreate = publicChats.some((chat: PublicChat) => chat.chatId === id);
		if (isCreate) {
			setLoading(false);
			return dispatch(showAlert('Вы можете создать только один чат', ERROR));
		} else {
			setLoading(false);
			navigation.navigate('CreateChatScreen');
		}
	};

	return (
		<SafeAreaView>
			<View style={styles.statusBar}></View>
			<View style={styles.createChat}>
				<Button
					mode='outlined'
					icon='pen'
					loading={loading}
					color='#aa4848'
					style={{ marginVertical: 10 }}
					onPress={handlePress}>
					Создать чат
				</Button>
			</View>
			<View>
				<Text style={styles.сhatsList}>Публичные чаты</Text>
				{isPublicChatsLoaded ? (
					<PublicChats />
				) : (
					<ActivityIndicator size='small' style={{ paddingTop: 5 }} />
				)}
				<Text style={styles.сhatsList}>Личные переписки</Text>
				{isPrivateChatsLoaded ? (
					<PrivateChats />
				) : (
					<ActivityIndicator size='small' style={{ paddingTop: 5 }} />
				)}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	statusBar: {
		paddingTop: StatusBarNative.currentHeight,
		backgroundColor: '#ff867c',
	},
	createChat: {},
	сhatsList: {
		color: '#aa4848',
		fontWeight: '600',
		textAlign: 'center',
		fontSize: 20,
	},
});
