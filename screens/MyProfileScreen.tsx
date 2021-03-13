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

export const ProfileScreen = () => {
	const dispatch = useDispatch();
	const loading = useSelector((state: RootState) => state.loading.loading);
	const member = useSelector((state: RootState) => state.members.member);

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
				{/* <Post member={member} /> */}
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
