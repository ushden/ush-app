import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
	SafeAreaView,
	StatusBar as StatusBarNative,
	View,
	TouchableOpacity,
	RefreshControl,
	Text,
} from 'react-native';
import { fetchMembers } from '../store/members/membersActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { FlatList } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Avatar, List, Searchbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from '../libs/firebase';
import { DEFAULT_AVATAR_URL, Member } from '../store/types';

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

export const MembersScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { id }: any = useSelector((state: RootState) => state.members.member);
	const members = useSelector(
		(state: RootState) => state.members.members
	).filter((member) => member?.id !== id);

	const loading = useSelector((state: RootState) => state.loading.loading);

	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		const unsubscribe = db.collection('users').onSnapshot(() => {
			dispatch(fetchMembers());
		});
		return () => unsubscribe();
	}, []);

	const handleChange = (query: string) => {
		setSearchQuery(query);
	};

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
					data={members.filter((member) => member?.name.includes(searchQuery))}
					contentContainerStyle={{ justifyContent: 'center' }}
					keyExtractor={(item) => item?.id}
					ItemSeparatorComponent={renderSeparator}
					ListEmptyComponent={
						<Text
							style={{
								textAlign: 'center',
								paddingVertical: 30,
								color: 'gray',
							}}>
							Членов не найдено
						</Text>
					}
					ListHeaderComponent={
						<Searchbar
							placeholder='Найти члена'
							value={searchQuery}
							onChangeText={handleChange}
							style={{ shadowColor: 'transparent', borderWidth: 0 }}
						/>
					}
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
									navigation.navigate('MemberProfile', { ...item })
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
													: DEFAULT_AVATAR_URL,
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
