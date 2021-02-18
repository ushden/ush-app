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
import { Button, List, Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChats } from '../store/chats/chatsActions';
import { RootState } from '../store/rootReducer';
import { MaterialIcons } from '@expo/vector-icons';

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
	const chats = useSelector((state: RootState) => state.chats.chats);

	useEffect(() => {
		dispatch(fetchChats());
	}, []);

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
					onPress={() => navigation.navigate('CreateChat')}>
					Создать чат
				</Button>
			</View>
			<FlatList
				data={chats}
				ItemSeparatorComponent={renderSeparator}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() =>
							navigation.navigate('Chat', {
								...item,
								messages: [...item.messages],
							})
						}>
						<List.Item
							title={item.chatName}
							description={item.messages[item.messages.length - 1].title}
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
										uri: item?.chatAvatr
											? item?.chatAvatr
											: 'https://business.ucr.edu/sites/g/files/rcwecm2116/files/styles/form_preview/public/icon-group.png?itok=3LzNDSRI',
									}}
								/>
							)}
						/>
					</TouchableOpacity>
				)}
				keyExtractor={(item) => item.chatId}
			/>
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
