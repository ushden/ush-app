import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { Avatar, Portal, TextInput, Button, Modal } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { DEFAULT_AVATAR_URL, ERROR } from '../store/types';
import * as ImagePicker from 'expo-image-picker';
import { changePassword, updateProfile } from '../store/members/membersActions';
import { showAlert } from '../store/alert/alertActions';

export const UpdateProfileScreen = () => {
	const member = useSelector((state: RootState) => state.members.member);
	const loading = useSelector((state: RootState) => state.loading.loading);
	const dispatch = useDispatch();

	const [visible, setVisible] = useState(false);

	const [photoUrl, setPhotoUrl] = useState(member?.photoUrl);
	const [displayName, setdisplayName] = useState(member?.name);
	const [email, setEmail] = useState(member?.email);

	const [pass, setPass] = useState('');

	// useLayoutEffect(() => {
	// 	navigation.setOptions({
	// 		headerRight: () => {
	// 			return (
	// 				<TouchableOpacity onPress={saveChanges} activeOpacity={0.7}>
	// 					<FontAwesome5 name='save' size={24} color='white' />
	// 				</TouchableOpacity>
	// 			);
	// 		},
	// 	});
	// }, []);

	const updatePassword = async () => {
		if (pass === '') {
			return dispatch(showAlert('Придумайте пароль больше 6 символов!', ERROR));
		}
		dispatch(changePassword(pass));

		setPass('');
	};

	const openCamera = async () => {
		setVisible(false);

		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.cancelled) {
			setPhotoUrl(result.uri);
		}
	};

	const openMediaLibrary = async () => {
		setVisible(false);

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.cancelled) {
			setPhotoUrl(result.uri);
		}
	};

	const saveChanges = () => {
		dispatch(updateProfile(displayName, email, photoUrl));
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<StatusBar style='light' />
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={{ paddingHorizontal: 20 }}
				keyboardVerticalOffset={80}>
				<>
					<ScrollView showsVerticalScrollIndicator={false}>
						<View style={{ paddingTop: 30 }}>
							<TouchableOpacity
								activeOpacity={0.9}
								onPress={() => setVisible(true)}>
								<Avatar.Image
									source={{ uri: photoUrl || DEFAULT_AVATAR_URL }}
									style={{ alignSelf: 'center' }}
									size={130}
								/>
							</TouchableOpacity>
							<TextInput
								style={styles.input}
								mode='flat'
								label='Изменить имя'
								value={displayName}
								onChangeText={(val) => setdisplayName(val)}
							/>
							<TextInput
								style={styles.input}
								mode='flat'
								label='Изменить емейл'
								value={email}
								onChangeText={(val) => setEmail(val)}
							/>
							<Button mode='outlined' onPress={saveChanges} loading={loading}>
								Сохранить
							</Button>
							<TextInput
								style={styles.input}
								mode='flat'
								label='Новый пароль'
								secureTextEntry={true}
								value={pass}
								onChangeText={(val) => setPass(val)}
							/>
							<Button mode='outlined' onPress={updatePassword}>
								Сменить пароль
							</Button>
						</View>
					</ScrollView>
				</>
			</KeyboardAvoidingView>
			<Portal>
				<Modal
					visible={visible}
					onDismiss={() => setVisible(false)}
					dismissable={true}>
					<View
						style={{
							backgroundColor: '#fff',
							padding: 20,
							paddingHorizontal: 40,
						}}>
						<Button
							style={{ marginVertical: 10 }}
							mode='outlined'
							icon='image'
							onPress={openMediaLibrary}
							labelStyle={{ color: '#aa4848' }}>
							Выбрать фото
						</Button>
						<Button
							style={{ marginVertical: 10 }}
							mode='outlined'
							icon='camera'
							onPress={openCamera}
							labelStyle={{ color: '#48aa48' }}>
							Сделать фото
						</Button>
					</View>
				</Modal>
			</Portal>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	input: {
		backgroundColor: '#fff',
		paddingLeft: 0,
		marginBottom: 10,
	},
});
