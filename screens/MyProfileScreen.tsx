import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import {
	SafeAreaView,
	ScrollView,
	Text,
	RefreshControl,
	StatusBar as StatusBarNative,
	TouchableOpacity,
	View,
	StyleSheet,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Avatar, Button } from 'react-native-paper';
import { auth } from '../libs/firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';

const wait = (timeout: number): Promise<any> => {
	return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const ProfileScreen = () => {
	const navigation = useNavigation();
	const route = useRoute();

	const [refreshing, setRefreshing] = useState(false);
	const { name, email, photoUrl }: any = useSelector(
		(state: RootState) => state.members.member
	);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style='light' />
			<ScrollView
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}>
				<View style={styles.setting}>
					<TouchableOpacity
						style={{ paddingTop: 10, paddingRight: 8 }}
						onPress={() => auth.signOut()}>
						<FontAwesome5 name='sign-out-alt' size={28} color='white' />
					</TouchableOpacity>
				</View>
				<View style={styles.profileTop}>
					<TouchableOpacity>
						<Avatar.Image
							source={{
								uri: photoUrl,
							}}
							size={120}
						/>
					</TouchableOpacity>
					<Text style={styles.name}>{name}</Text>
					<Text style={{ color: 'gray' }}>Член клуба</Text>
				</View>
				<View style={styles.profileMid}>
					<View>
						<Button
							mode='outlined'
							onPress={() => navigation.navigate('UpdateProfile')}
							style={{ marginBottom: 10 }}>
							Редактировать профиль
						</Button>
					</View>
					<View style={styles.userItem}>
						<FontAwesome5 name='user' size={24} color='black' />
						<Text style={styles.userItemText}>{name}</Text>
					</View>
					<View style={styles.userItem}>
						<Fontisto name='email' size={24} color='black' />
						<Text style={styles.userItemText}>{email}</Text>
					</View>
					<View style={styles.userItem}>
						<Feather name='phone' size={24} color='black' />
						<Text style={styles.userItemText}>Telefon</Text>
					</View>
					<View style={styles.userItem}>
						<FontAwesome name='transgender' size={24} color='black' />
						<Text style={styles.userItemText}>Male ili Fmale</Text>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	profileTop: {
		flex: 1,
		backgroundColor: '#364f6b',
		// height: 200,
		alignItems: 'center',
		paddingBottom: 20,
	},
	name: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 30,
	},
	profileMid: {
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 20,
	},
	setting: {
		flex: 1,
		paddingTop: StatusBarNative.currentHeight,
		backgroundColor: '#364f6b',
		alignItems: 'flex-end',
	},
	userItem: {
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		paddingBottom: 5,
		marginBottom: 15,
	},
	userItemText: {
		paddingLeft: 10,
		fontSize: 20,
	},
});
