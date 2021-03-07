import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store/rootReducer';
import { showAlert } from '../store/alert/alertActions';
import { Post, POSTS, SUCCSSES, USERS } from '../store/types';
import { getMember } from '../store/members/membersActions';
import { PostItem } from '../components/PostItem';
import { auth, db, registerForPushNotificationsAsync } from '../libs/firebase';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { fetchPosts } from '../store/posts/postsActions';

export const MainScreen = () => {
	const posts = useSelector((state: RootState) => state.posts.posts);
	const loading = useSelector((state: RootState) => state.loading.loading);
	const dispatch = useDispatch();
	const navigation = useNavigation();

	useEffect(() => {
		const user = auth.currentUser;

		registerForPushNotificationsAsync().then((token) => {
			db.collection(USERS)
				.doc(user?.uid)
				.update({
					pushToken: token,
				})
				.then(() => {
					dispatch(getMember());
				});
		});
	}, []);

	useEffect(() => {
		const unsubscribe = db.collection(POSTS).onSnapshot(() => {
			dispatch(fetchPosts());
		});
		return () => unsubscribe();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style='dark' />
			<ScrollView
				scrollToOverflowEnabled={true}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={loading}
						onRefresh={() => dispatch(showAlert('Перезагрузка', SUCCSSES))}
					/>
				}>
				{posts.map((post: Post) => (
					<PostItem key={post?.postId} post={post} />
				))}
			</ScrollView>
			<FAB
				style={styles.fab}
				icon='plus'
				small={false}
				onPress={() => navigation.navigate('CreatePostScreen')}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 5,
	},
	fab: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		margin: 15,
		zIndex: 999,
	},
});
