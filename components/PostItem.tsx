import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Card, IconButton, Paragraph, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { downloadImg } from '../store/posts/postsActions';
import { RootState } from '../store/rootReducer';
import { DEFAULT_AVATAR_URL, Post } from '../store/types';

export const PostItem = ({ post }: { post: Post }) => {
	const isLike = useSelector((state: RootState) => state.posts.post?.isLike);
	const [shit, setShit] = useState(false);
	const [save, setSave] = useState(false);
	const dispatch = useDispatch();

	const leftContent = (props: any) => (
		<Avatar.Image
			{...props}
			source={{ uri: post?.author.photoUrl || DEFAULT_AVATAR_URL }}
			style={{ margin: 0 }}
		/>
	);

	const downloadImgHandler = () => {
		dispatch(downloadImg(post?.imageUrl));
	};

	const savePost = () => {
		setSave((save) => !save);
	};

	const pressLike = () => {};

	const pressShit = () => {
		setShit((shit) => !shit);
	};

	return (
		<Card style={styles.card}>
			<Card.Title
				titleStyle={{ fontWeight: 'bold', fontSize: 13, textAlign: 'left' }}
				subtitleStyle={{ color: 'gray', fontSize: 10 }}
				title={post?.author.name}
				subtitle={new Date(+post?.createAt).toLocaleDateString()}
				left={leftContent}
			/>
			<Card.Content>
				<Title>{post?.title}</Title>
				{post?.description ? <Paragraph>{post?.description}</Paragraph> : null}
			</Card.Content>
			<Card.Cover source={{ uri: post?.imageUrl }} />
			<Card.Actions style={{ justifyContent: 'space-around' }}>
				<View
					style={{
						flexDirection: 'row',
					}}>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
						}}>
						<IconButton
							icon={isLike ? 'heart' : 'heart-outline'}
							animated={true}
							color='red'
							onPress={pressLike}
						/>
						<Text style={{ fontWeight: 'bold' }}>{post?.likes}</Text>
					</View>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							marginRight: 20,
						}}>
						<IconButton
							icon={shit ? 'emoticon-poop' : 'emoticon-poop-outline'}
							color='#90746D'
							animated={true}
							onPress={pressShit}
						/>
						<Text style={{ fontWeight: 'bold' }}>{post?.shits}</Text>
					</View>
				</View>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'flex-end',
					}}>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
						}}>
						<IconButton
							icon={save ? 'bookmark-check' : 'bookmark-outline'}
							animated={true}
							color='#7764ED'
							onPress={savePost}
						/>
					</View>
					<View
						style={{
							flexDirection: 'row',
						}}>
						<IconButton
							icon='folder-download'
							animated={true}
							color='#ED7764'
							onPress={downloadImgHandler}
						/>
					</View>
				</View>
			</Card.Actions>
		</Card>
	);
};

const styles = StyleSheet.create({
	card: {
		width: '100%',
		borderWidth: 0.3,
		borderColor: 'lightgray',
		marginBottom: 10,
		marginTop: 10,
	},
});
