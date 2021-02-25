import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import { auth } from '../libs/firebase';
import { Message } from '../store/types';

export const SingleMessage = (props: Message) => {
	const member = auth.currentUser;

	return (
		<>
			<View
				style={{
					flex: 1,
					flexWrap: 'wrap',
					backgroundColor: member?.uid === props.memberId ? '#82e9de' : '#fff',
					marginVertical: 10,
					maxWidth: '75%',
					padding: 8,
					borderRadius: 30,
					marginHorizontal: 5,
					alignItems: 'center',
					flexDirection: member?.uid === props.memberId ? 'row-reverse' : 'row',
					alignSelf: member?.uid === props.memberId ? 'flex-end' : 'flex-start',
					justifyContent: 'flex-start',
					position: 'relative',
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
				<View style={{ paddingRight: 45 }}>
					<Text
						style={{
							color: '#000',
							fontWeight: 'bold',
							textAlign: member?.uid === props.memberId ? 'right' : 'left',
							paddingLeft: member?.uid === props.memberId ? 15 : 40,
							fontSize: 15,
						}}>
						{props.memberName}
					</Text>
					<Text
						style={{
							color: '#000',
							flex: 1,
							paddingLeft: member?.uid === props.memberId ? 13 : 40,
							textAlign: member?.uid === props.memberId ? 'right' : 'left',
						}}>
						{props.content}
					</Text>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	avatar: {
		marginHorizontal: 5,
		position: 'absolute',
		top: 6,
	},
});
