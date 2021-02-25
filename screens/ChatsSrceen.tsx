import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	StatusBar as StatusBarNative,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import { Button, List, Avatar, ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChats, fetchPrivateChats } from '../store/chats/chatsActions';
import { RootState } from '../store/rootReducer';
import { MaterialIcons } from '@expo/vector-icons';
import { showAlert } from '../store/alert/alertActions';
import {
	PublicChat,
	ERROR,
	PrivateChat,
	PRIVATE_CHATS,
	PUBLIC_CHATS,
} from '../store/types';
import { db } from '../libs/firebase';

const renderSeparator = () => {
	return (
		<View
			style={{
				height: 1.5,
				width: '86%',
				backgroundColor: '#aa4848',
				marginLeft: '14%',
			}}
		/>
	);
};

export const ChatsSrceen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const publicChats = useSelector(
		(state: RootState) => state.chats.publicChats
	);
	const privateChats = useSelector(
		(state: RootState) => state.chats.privateChats
	);
	const { id }: any = useSelector((state: RootState) => state.members.member);
	const currentPrivateChats = privateChats.filter(
		(chat) => chat.membersId[0] === id || chat.membersId[1] === id
	);

	const loading = useSelector((state: RootState) => state.loading.loading);

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

	const handlePress = () => {
		const isCreate = publicChats.some((chat: PublicChat) => chat.chatId === id);
		if (isCreate) {
			return dispatch(showAlert('Вы можете создать только один чат', ERROR));
		} else {
			navigation.navigate('CreateChatScreen');
		}
	};

	return (
		<SafeAreaView>
			<StatusBar style='light' />
			<View style={styles.statusBar}></View>
			<View style={styles.createChat}>
				<Button
					mode='outlined'
					icon='pen'
					color='#aa4848'
					style={{ marginVertical: 10 }}
					onPress={handlePress}>
					Создать чат
				</Button>
			</View>
			<Text style={styles.сhatsList}>Публичные чаты</Text>
			{loading ? (
				<ActivityIndicator size='large' style={{ justifyContent: 'center' }} />
			) : (
				<FlatList
					data={publicChats}
					ItemSeparatorComponent={renderSeparator}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() =>
								navigation.navigate('ChatSrceen', {
									...item,
								})
							}>
							<List.Item
								title={item.chatName}
								// description={() => publicChats.map(chat => <Text>{}</Text>)}
								right={() => (
									<MaterialIcons
										name='keyboard-arrow-right'
										size={24}
										color='gray'
									/>
								)}
								left={() => (
									<Avatar.Image
										size={40}
										source={{
											uri: item?.chatAvatar
												? item?.chatAvatar
												: 'https://lh3.googleusercontent.com/-JM2xsdjz2Bw/AAAAAAAAAAI/AAAAAAAAAAA/DVECr-jVlk4/photo.jpg',
										}}
									/>
								)}
							/>
						</TouchableOpacity>
					)}
					keyExtractor={(item: PublicChat) => item.chatId}
				/>
			)}
			<Text style={styles.сhatsList}>Личные переписки</Text>
			{loading ? (
				<ActivityIndicator size='large' style={{ justifyContent: 'center' }} />
			) : (
				<FlatList
					data={currentPrivateChats}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() =>
								navigation.navigate('ChatSrceen', {
									...item,
								})
							}>
							<List.Item
								title={
									item.membersId[0] === id
										? item.membersName[1]
										: item.membersName[0]
								}
								right={() => (
									<MaterialIcons
										name='keyboard-arrow-right'
										size={24}
										color='gray'
									/>
								)}
								left={() => (
									<Avatar.Image
										size={40}
										source={{
											uri: item?.membersPhotoUrl[0]
												? item?.membersPhotoUrl[0]
												: 'https://business.ucr.edu/sites/g/files/rcwecm2116/files/styles/form_preview/public/icon-group.png?itok=3LzNDSRI',
										}}
									/>
								)}
							/>
						</TouchableOpacity>
					)}
					keyExtractor={(item: PrivateChat) => item.chatId}
				/>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	statusBar: {
		paddingTop: StatusBarNative.currentHeight,
		backgroundColor: '#aa4848',
	},
	createChat: {},
	сhatsList: {
		color: '#aa4848',
		fontWeight: '600',
		textAlign: 'center',
		fontSize: 20,
	},
});
