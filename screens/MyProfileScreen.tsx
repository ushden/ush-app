import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {
	SafeAreaView,
	ScrollView,
	RefreshControl,
	StatusBar as StatusBarNative,
	StyleSheet,
	View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { getMember } from '../store/members/membersActions';
import { MemberInfo } from '../components/MemberInfo';
import { ProfileHeader } from '../components/ProfileHeader';
import { db } from '../libs/firebase';
import { PostItem } from '../components/PostItem';

export const ProfileScreen = () => {
	const dispatch = useDispatch();
	const loading = useSelector((state: RootState) => state.loading.loading);
	const member = useSelector((state: RootState) => state.members.member);
	const posts = useSelector((state: RootState) => state.posts.posts).filter(
		(post) => post?.author?.id === member?.id
	);

	useEffect(() => {
		dispatch(getMember());
	}, []);

	useEffect(() => {
		const unsubscribe = db
			.collection('users')
			.doc(member?.id)
			.onSnapshot(() => {
				dispatch(getMember());
			});

		return () => unsubscribe();
	}, []);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<View
				style={{
					paddingTop: StatusBarNative.currentHeight,
					backgroundColor: '#df78ef',
				}}></View>
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
				<ProfileHeader member={member} />
				<MemberInfo />
				<View style={{ marginBottom: 20, width: '100%' }}>
					{posts.map((post) => (
						<PostItem post={post} key={post?.postId} />
					))}
				</View>
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
