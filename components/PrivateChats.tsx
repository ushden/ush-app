import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { List, Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { db } from '../libs/firebase';
import { RootState } from '../store/rootReducer';
import { MESSAGES, PrivateChat, PRIVATE_CHATS } from '../store/types';

const renderSeparator = () => {
	return (
		<View
			style={{
				height: 1.5,
				width: '86%',
				backgroundColor: '#lightgray',
				marginLeft: '14%',
			}}
		/>
	);
};

export const PrivateChats = () => {
	const navigation = useNavigation();

	const { id }: any = useSelector((state: RootState) => state.members.member);
	const isLoaded = useSelector(
		(state: RootState) => state.chats.isPrivateChatsLoaded
	);
	const privateChats = useSelector(
		(state: RootState) => state.chats.privateChats
	).filter((chat) => chat.membersId[0] === id || chat.membersId[1] === id);

	if (!isLoaded) {
		return <ActivityIndicator size='small' />;
	}

	if (privateChats.length === 0) {
		return (
			<View>
				<Text
					style={{
						textAlign: 'center',
						paddingVertical: 10,
						fontWeight: '400',
						color: 'gray',
					}}>
					Нет личных переписок.
				</Text>
			</View>
		);
	}

	const showLastMessage = (params: any, item: PrivateChat) => {
		const [lastMessage, setLastMessage] = useState({
			content: '',
			createdAt: '',
			member: { name: '' },
		});

		useEffect(() => {
			const unsubscribe = db
				.collection(PRIVATE_CHATS)
				.doc(item.chatId)
				.collection(MESSAGES)
				.limit(1)
				.orderBy('createdAt', 'desc')
				.onSnapshot((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						const data: any = doc.data();
						setLastMessage(data);
					});
				});
			return () => unsubscribe();
		}, [lastMessage]);

		return (
			<View>
				<Text
					style={{ color: params.color, fontSize: 11 }}
					ellipsizeMode='tail'>
					{`${lastMessage.member.name}: ${lastMessage.content}`}
				</Text>
			</View>
		);
	};

	return (
		<FlatList
			data={privateChats}
			ItemSeparatorComponent={renderSeparator}
			style={styles.list}
			contentContainerStyle={styles.listContainer}
			renderItem={({ item }) => (
				<TouchableOpacity
					activeOpacity={0.8}
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
						description={(params) => showLastMessage(params, item)}
						style={styles.listItem}
						right={() => (
							<MaterialIcons
								name='keyboard-arrow-right'
								size={24}
								color='gray'
								style={{ paddingTop: 10 }}
							/>
						)}
						left={() => (
							<Avatar.Image
								size={40}
								source={{
									uri:
										item?.membersId[0] === id
											? item?.membersPhotoUrl[1]
											: item?.membersPhotoUrl[0],
								}}
							/>
						)}
					/>
				</TouchableOpacity>
			)}
			keyExtractor={(item: PrivateChat) => item.chatId}
		/>
	);
};

const styles = StyleSheet.create({
	listItem: {
		marginBottom: 5,
		borderBottomWidth: 1,
		borderBottomColor: 'lightgray',
	},
	listContainer: {
		justifyContent: 'center',
	},
	list: {},
});
