import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Card, IconButton, Paragraph, Title } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { showAlert } from '../store/alert/alertActions';
import { DEFAULT_AVATAR_URL, Member, SUCCSSES } from '../store/types';

export const Post = ({ member }: { member: Member }) => {
	const [like, setLike] = useState(false);
	const [notLike, setNotLike] = useState(false);
	const [save, setSave] = useState(false);
	const dispatch = useDispatch();

	const leftContent = (props: any) => (
		<Avatar.Image
			{...props}
			source={{ uri: member?.photoUrl || DEFAULT_AVATAR_URL }}
			style={{ margin: 0 }}
		/>
	);

	return (
		<Card style={styles.card}>
			<Card.Title
				titleStyle={{ fontWeight: 'bold', fontSize: 13, textAlign: 'left' }}
				subtitleStyle={{ color: 'gray', fontSize: 10 }}
				title={member?.name}
				subtitle={new Date().toDateString()}
				left={leftContent}
			/>
			<Card.Content>
				<Title>Заголовок</Title>
				<Paragraph>Описание поста или хз что. Пусть будет пока</Paragraph>
			</Card.Content>
			<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
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
							icon={like ? 'heart' : 'heart-outline'}
							animated={true}
							color='red'
							onPress={() => setLike((like) => !like)}
						/>
						<Text>0</Text>
					</View>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							marginRight: 20,
						}}>
						<IconButton
							icon={notLike ? 'emoticon-poop' : 'emoticon-poop-outline'}
							color='#90746D'
							animated={true}
							onPress={() => setNotLike((notLike) => !notLike)}
						/>
						<Text>0</Text>
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
							onPress={() => setSave((save) => !save)}
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
							onPress={() => dispatch(showAlert('Загрузка...', SUCCSSES))}
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
		marginBottom: 30,
	},
});
