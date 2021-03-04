import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { List, Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { db } from '../libs/firebase';
import { RootState } from '../store/rootReducer';
import { MESSAGES, PublicChat, PUBLIC_CHATS } from '../store/types';

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

export const PublicChats = () => {
	const navigation = useNavigation();
	const loading = useSelector((state: RootState) => state.loading.loading);
	const publicChats = useSelector(
		(state: RootState) => state.chats.publicChats
	);

	if (publicChats.length === 0) {
		return (
			<View>
				<Text
					style={{
						textAlign: 'center',
						paddingVertical: 10,
						fontWeight: '400',
						color: 'gray',
					}}>
					Нет созданых чатов
				</Text>
			</View>
		);
	}

	// const showLastMessage = (params: any, item: PublicChat) => {
	// 	const [lastMessage, setLastMessage] = useState({
	// 		content: '',
	// 		member: { name: '' },
	// 	});

	// 	useEffect(() => {
	// 		const unsubscribe = db
	// 			.collection(PUBLIC_CHATS)
	// 			.doc(item.chatId)
	// 			.collection(MESSAGES)
	// 			.limit(1)
	// 			.orderBy('createdAt', 'desc')
	// 			.onSnapshot((querySnapshot) => {
	// 				querySnapshot.forEach((doc) => {
	// 					const data: any = doc.data();
	// 					setLastMessage(data);
	// 				});
	// 			});
	// 		return () => unsubscribe();
	// 	}, [lastMessage]);
	// 	return (
	// 		<Text style={{ color: params.color, fontSize: 11 }} ellipsizeMode='tail'>
	// 			{`${lastMessage.member.name}: ${lastMessage.content}`}
	// 		</Text>
	// 	);
	// };

	return loading ? (
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
						// description={(params) => showLastMessage(params, item)}
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
	);
};
