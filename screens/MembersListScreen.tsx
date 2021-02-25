import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
	SafeAreaView,
	StatusBar as StatusBarNative,
	View,
	TouchableOpacity,
	RefreshControl,
} from 'react-native';
import { fetchMembers } from '../store/members/membersActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { FlatList } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Avatar, List } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from '../libs/firebase';

const renderSeparator = () => {
	return (
		<View
			style={{
				height: 1,
				width: '86%',
				backgroundColor: '#CED0CE',
				marginLeft: '14%',
			}}
		/>
	);
};

export const UsersScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const members = useSelector((state: RootState) => state.members.members);
	const { id }: any = useSelector((state: RootState) => state.members.member);
	const loading = useSelector((state: RootState) => state.loading.loading);

	const membersWhithOutMe = members.filter((member) => member?.id !== id);

	useEffect(() => {
		db.collection('users').onSnapshot(() => {
			dispatch(fetchMembers());
		});
	}, []);

	return (
		<SafeAreaView>
			<StatusBar style='light' />
			<View
				style={{
					paddingTop: StatusBarNative.currentHeight,
					backgroundColor: '#4848aa',
				}}></View>
			{loading ? (
				<ActivityIndicator size='large' style={{ paddingTop: 200 }} />
			) : (
				<FlatList
					data={membersWhithOutMe}
					contentContainerStyle={{ justifyContent: 'center' }}
					keyExtractor={(item) => item?.id}
					ItemSeparatorComponent={renderSeparator}
					refreshControl={
						<RefreshControl
							refreshing={loading}
							onRefresh={() => dispatch(fetchMembers())}
						/>
					}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity
								activeOpacity={0.5}
								onPress={() =>
									navigation.navigate('UserProfileScreen', { ...item })
								}>
								<List.Item
									title={item?.name}
									description={item?.email}
									left={() => (
										<Avatar.Image
											size={40}
											source={{
												uri: item?.photoUrl
													? item?.photoUrl
													: 'https://lh3.googleusercontent.com/-JM2xsdjz2Bw/AAAAAAAAAAI/AAAAAAAAAAA/DVECr-jVlk4/photo.jpg',
											}}
										/>
									)}
									right={() => (
										<MaterialIcons
											name='keyboard-arrow-right'
											size={24}
											color='gray'
										/>
									)}
								/>
							</TouchableOpacity>
						);
					}}
				/>
			)}
		</SafeAreaView>
	);
};
