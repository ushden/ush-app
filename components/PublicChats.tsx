import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { List, Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { PublicChat } from '../store/types';

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
	const isLoaded = useSelector(
		(state: RootState) => state.chats.isPublicChatsLoaded
	);
	const publicChats = useSelector(
		(state: RootState) => state.chats.publicChats
	);

	if (!isLoaded) {
		return <ActivityIndicator size='small' />;
	}

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

	return (
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
