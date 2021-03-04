import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
	SafeAreaView,
	View,
	StatusBar as StatusBarNative,
	RefreshControl,
	ScrollView,
	StyleSheet,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { MemberInfo } from '../components/MemberInfo';
import { MemberProfileHeader } from '../components/MemberProfileHeader';
import { Post } from '../components/Post';
import { createPrivateChat } from '../store/chats/chatsActions';
import { getMember } from '../store/members/membersActions';
import { RootState } from '../store/rootReducer';
import { PrivateChat, PRIVATE_CHATS } from '../store/types';

export const MemberProfileScreen = () => {
	const { params }: any = useRoute();
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const member = useSelector((state: RootState) => state.members.member);
	const privateChats = useSelector(
		(state: RootState) => state.chats.privateChats
	);
	const loading = useSelector((state: RootState) => state.loading.loading);

	const handlePress = () => {
		const chatInfo: PrivateChat = {
			_chatType: PRIVATE_CHATS,
			chatId: `Chat_${Date.now().toString()}`,
			createMemberId: member?.id,
			membersId: [member?.id, params?.id],
			membersName: [member?.name, params?.name],
			membersPhotoUrl: [member?.photoUrl, params?.photoUrl],
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
				privateChats[i].membersId.includes(member?.id) &&
				privateChats[i].membersId.includes(params.id)
			) {
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
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<StatusBar style='light' />
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={loading}
						onRefresh={() => dispatch(getMember())}
					/>
				}
				showsVerticalScrollIndicator={false}
				style={styles.container}
				contentContainerStyle={{
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<MemberProfileHeader member={params} handlePress={handlePress} />
				<MemberInfo />
				<Post member={params} />
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 20,
	},
});
