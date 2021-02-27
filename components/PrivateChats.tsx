import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { List, Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { PrivateChat } from '../store/types';

export const PrivateChats = () => {
	const navigation = useNavigation();

	const { id }: any = useSelector((state: RootState) => state.members.member);
	const loading = useSelector((state: RootState) => state.loading.loading);

	const privateChats = useSelector(
		(state: RootState) => state.chats.privateChats
	).filter((chat) => chat.membersId[0] === id || chat.membersId[1] === id);

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
					Нету личных переписок.
				</Text>
			</View>
		);
	}

	return loading ? (
		<ActivityIndicator size='large' style={{ justifyContent: 'center' }} />
	) : (
		<FlatList
			data={privateChats}
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
	);
};
