import { useNavigation, useRoute } from '@react-navigation/native';
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
import { fetchChats } from '../store/chats/chatsActions';
import { RootState } from '../store/rootReducer';
import { MaterialIcons } from '@expo/vector-icons';
import { showAlert } from '../store/alert/alertActions';
import { Chat, ERROR } from '../store/types';
import { hideLoading, showLoading } from '../store/loading/loadingActions';

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
	const route = useRoute();
	const dispatch = useDispatch();
	const chats = useSelector((state: RootState) => state.chats.chats);
	const loading = useSelector((state: RootState) => state.loading.loading);
	const { id }: any = useSelector((state: RootState) => state.members.member);

	useEffect(() => {
		dispatch(fetchChats());
	}, [route]);

	const handlePress = () => {
		const isCreate = chats.some((chat: Chat) => chat.chatId === id);
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
			{loading ? (
				<ActivityIndicator size='large' style={{ justifyContent: 'center' }} />
			) : (
				<FlatList
					data={chats}
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
												: 'https://business.ucr.edu/sites/g/files/rcwecm2116/files/styles/form_preview/public/icon-group.png?itok=3LzNDSRI',
										}}
									/>
								)}
							/>
						</TouchableOpacity>
					)}
					keyExtractor={(item: any) => item.chatId}
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
});
