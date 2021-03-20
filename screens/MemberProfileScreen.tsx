import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {
	SafeAreaView,
	RefreshControl,
	ScrollView,
	StyleSheet,
	View,
	Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MemberInfo } from '../components/MemberInfo';
import { MemberProfileHeader } from '../components/MemberProfileHeader';
import { PostItem } from '../components/PostItem';
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
	).filter((chat) => chat.membersId.includes(member?.id));
	const posts = useSelector((state: RootState) => state.posts.posts).filter(
		(post) => params?.id === post?.author?.id
	);

	const loading = useSelector((state: RootState) => state.loading.loading);

	useEffect(() => {
		dispatch(getMember());
	}, []);

	const handlePress = () => {
		let createNew = true;

		for (let i = 0; i < privateChats.length; i++) {
			const isCreate =
				privateChats[i].membersId.includes(member?.id) &&
				privateChats[i].membersId.includes(params?.id);

			if (isCreate) {
				createNew = !createNew;
				navigation.navigate('ChatSrceen', { ...privateChats[i] });
				return;
			}
		}

		if (createNew) {
			const chatInfo: PrivateChat = {
				_chatType: PRIVATE_CHATS,
				chatId: `Chat_${Date.now().toString()}`,
				createMemberId: member?.id,
				membersToken: [member?.pushToken, params?.pushToken],
				membersId: [member?.id, params?.id],
				membersName: [member?.name, params?.name],
				membersPhotoUrl: [member?.photoUrl, params?.photoUrl],
			};

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
				{posts.length === 0 ? (
					<View>
						<Text
							style={{ textAlign: 'center', paddingTop: 20, color: 'gray' }}>
							У члена еще нету постов
						</Text>
					</View>
				) : (
					<View>
						{posts.map((post) => (
							<PostItem post={post} key={post?.postId} />
						))}
					</View>
				)}
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
