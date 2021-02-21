import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import { auth } from '../libs/firebase';
import { Message } from '../store/types';

export const SingleMessage = (props: Message) => {
	const member = auth.currentUser;

	return (
		<View
			style={{
				flex: 1,
				flexWrap: 'wrap',
				width: '65%',
				backgroundColor: member?.uid === props.memberId ? '#48dd48' : '#4848aa',
				marginVertical: 10,
				padding: 10,
				borderRadius: 30,
				marginHorizontal: 5,
				alignItems: 'center',
				flexDirection: member?.uid === props.memberId ? 'row-reverse' : 'row',
				alignSelf: member?.uid === props.memberId ? 'flex-end' : 'flex-start',
				justifyContent: 'flex-start',
			}}>
			<Avatar.Image
				source={{
					uri:
						props.memberAvatarUrl ||
						'https://lh3.googleusercontent.com/-JM2xsdjz2Bw/AAAAAAAAAAI/AAAAAAAAAAA/DVECr-jVlk4/photo.jpg',
				}}
				size={40}
				style={styles.avatar}
			/>
			<View>
				<Text style={{ color: '#fff' }}>{props.content}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	message: {
		flex: 1,
		flexWrap: 'wrap',
		width: '65%',
		backgroundColor: '#48dd48',
		marginVertical: 10,
		padding: 10,
		borderRadius: 30,
		marginHorizontal: 5,
		alignItems: 'center',
		flexDirection: 'row-reverse',
		alignSelf: 'flex-end',
		justifyContent: 'flex-start',
	},
	avatar: {
		marginHorizontal: 5,
	},
});
