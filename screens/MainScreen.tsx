import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	RefreshControl,
	Text,
	View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store/rootReducer';
import { Post, POSTS } from '../store/types';
import { PostItem } from '../components/PostItem';
import { db } from '../libs/firebase';
import { ActivityIndicator, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { fetchPosts } from '../store/posts/postsActions';
import { getMember } from '../store/members/membersActions';

export const MainScreen = () => {
	const posts = useSelector((state: RootState) => state.posts.posts);
	const isLoaded = useSelector((state: RootState) => state.posts.isLoaded);
	const loading = useSelector((state: RootState) => state.loading.loading);
	const dispatch = useDispatch();
	const navigation = useNavigation();

	useEffect(() => {
		dispatch(getMember());
		dispatch(fetchPosts());
	}, []);

	useEffect(() => {
		const unsubscribe = db.collection(POSTS).onSnapshot(() => {
			dispatch(fetchPosts());
		});
		return () => unsubscribe();
	}, []);

	if (!isLoaded) {
		return <ActivityIndicator size='large' style={{ paddingTop: 200 }} />;
	}

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style='dark' />
			<ScrollView
				scrollToOverflowEnabled={true}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={loading}
						onRefresh={() => dispatch(fetchPosts())}
					/>
				}>
				{posts.length === 0 ? (
					<Text
						style={{
							textAlign: 'center',
							fontWeight: '300',
							fontSize: 14,
							paddingTop: 200,
						}}>
						Создай первый пост на странице!
					</Text>
				) : (
					<View>
						{posts.map((post: Post) => (
							<PostItem key={post?.postId} post={post} />
						))}
					</View>
				)}
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
