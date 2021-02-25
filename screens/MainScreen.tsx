import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useCallback, useState } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	Text,
	ScrollView,
	RefreshControl,
	StatusBar as StatusBarNative,
	View,
} from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome5 } from '@expo/vector-icons';

import { auth } from '../libs/firebase';
import { RootState } from '../store/rootReducer';
import { getMember } from '../store/members/membersActions';

export const MainScreen = () => {
	const navigation = useNavigation();
	const { name, id, email }: any = useSelector(
		(state: RootState) => state.members.member
	);
	const loading = useSelector((state: RootState) => state.loading.loading);
	const dispatch = useDispatch();
	const route = useRoute();

	useEffect(() => {
		dispatch(getMember());
	}, [route.name]);

	useEffect(() => {
		navigation.setOptions({
			tabBarLabel: 'Главная',
			tabBarIcon: ({ color }: any) => (
				<FontAwesome5 name='home' size={22} color={color} />
			),
			tabBarColor: '#48aa48',
		});
	}, [navigation]);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style='dark' />
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={loading}
						onRefresh={() => dispatch(getMember())}
					/>
				}>
				{loading ? (
					<ActivityIndicator size='large' style={{ paddingTop: 200 }} />
				) : (
					<View>
						<Text style={{ paddingTop: 200 }}>
							Name: {name} Email: {email} ID: {id}
						</Text>
						<Button mode='contained' onPress={() => auth.signOut()}>
							Out
						</Button>
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBarNative.currentHeight,
	},
});
