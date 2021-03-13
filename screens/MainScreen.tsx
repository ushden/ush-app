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
import { Post, POSTS, SUCCSSES } from '../store/types';
import { PostItem } from '../components/PostItem';
import { db } from '../libs/firebase';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { fetchPosts } from '../store/posts/postsActions';
import { getMember } from '../store/members/membersActions';

export const MainScreen = () => {
	const posts = useSelector((state: RootState) => state.posts.posts);
	const loading = useSelector((state: RootState) => state.loading.loading);
	const dispatch = useDispatch();
	const navigation = useNavigation();

	useEffect(() => {
		dispatch(fetchPosts());
		dispatch(getMember());
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
