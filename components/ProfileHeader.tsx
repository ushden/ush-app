import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { signOut } from '../store/members/membersActions';

import { DEFAULT_AVATAR_URL, Member } from '../store/types';

export const ProfileHeader = ({ member }: { member: Member }) => {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Image
				source={{ uri: member?.photoUrl || DEFAULT_AVATAR_URL }}
				style={styles.avatar}
			/>
			<Text style={styles.name}>{member?.name}</Text>
			<Text style={styles.about}>
				{member?.about || 'Напишите немного о себе или не пишите, мне всеравно'}
			</Text>
			<View style={styles.btnWrapper}>
				<Button
					mode='outlined'
					labelStyle={styles.btn}
					onPress={() => navigation.navigate('UpdateProfile')}>
					Редактировать
				</Button>
				<Button
					mode='outlined'
					labelStyle={styles.btn}
					onPress={() => dispatch(signOut())}>
					Выйти
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	avatar: {
		width: 150,
		height: 150,
		borderRadius: 75,
		marginBottom: 10,
	},
	name: {
		fontWeight: 'bold',
		fontSize: 25,
		textAlign: 'center',
	},
	about: {
		fontWeight: '300',
		textAlign: 'center',
		color: 'lightgray',
		marginBottom: 10,
	},
	btnWrapper: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-around',
	},
	btn: {
		color: '#6a2c70',
		marginBottom: 8,
	},
});
