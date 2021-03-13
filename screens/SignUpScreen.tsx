import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
	KeyboardAvoidingView,
	SafeAreaView,
	Text,
	Platform,
	View,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { Avatar, Button, Modal, Portal, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { signUp } from '../store/members/membersActions';
import * as ImagePicker from 'expo-image-picker';
import { showAlert } from '../store/alert/alertActions';
import { DEFAULT_AVATAR_URL, ERROR } from '../store/types';
import { getCameraPermissions, getMediaPermissions } from '../libs/firebase';

export const SignUpScreen = () => {
	const dispatch = useDispatch();
	const { loading } = useSelector((state: RootState) => state.loading);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [imgRef, setImgRef] = useState('');
	const [visible, setVisible] = useState(false);

	const pressHandler = () => {
		if (imgRef === '') {
			return dispatch(showAlert('Выбери аватар, это важно!', ERROR));
		}
		if (password.length < 6) {
			return dispatch(showAlert('Напиши больше 6 символов', ERROR));
		}
		dispatch(signUp(name.trim(), email.trim(), password.trim(), imgRef));
	};

	const openCamera = async () => {
		const permission = await getCameraPermissions();

		if (!permission) {
			return;
		}

		setVisible(false);

		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.cancelled) {
			setImgRef(result.uri);
		}
	};

	const openMediaLibrary = async () => {
		const permission = await getMediaPermissions();

		if (!permission) {
			return;
		}
		setVisible(false);

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.cancelled) {
			setImgRef(result.uri);
		}
	};

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: 'white',
			}}>
			<StatusBar style='light' />
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={60}>
				<>
					<ScrollView
						showsVerticalScrollIndicator={false}
						style={{ paddingTop: 20, paddingHorizontal: 15 }}>
						<Text
							style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
							Добро пожаловать в CLUB 48
						</Text>
						<Text style={{ marginBottom: 10, textAlign: 'center' }}>
							Введите даные для регистрации
						</Text>
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								marginVertical: 10,
							}}>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => setVisible(true)}>
								<Avatar.Image
									style={{ backgroundColor: '#fff' }}
									size={120}
									source={{
										uri: imgRef ? imgRef : DEFAULT_AVATAR_URL,
									}}
								/>
							</TouchableOpacity>
						</View>
						<TextInput
							mode='outlined'
							label='Имя'
							left={<TextInput.Icon name='account-cowboy-hat' color='black' />}
							style={{ marginBottom: 10 }}
							value={name}
							onChangeText={(text) => setName(text)}
						/>
						<TextInput
							mode='outlined'
							label='Емейл'
							left={<TextInput.Icon name='account-heart' color='black' />}
							style={{ marginBottom: 10 }}
							value={email}
							onChangeText={(text) => setEmail(text)}
						/>
						<TextInput
							mode='outlined'
							label='Пароль'
							secureTextEntry={true}
							left={<TextInput.Icon name='account-lock' color='black' />}
							style={{ marginBottom: 10 }}
							value={password}
							onChangeText={(text) => setPassword(text)}
						/>
						<Button mode='contained' onPress={pressHandler} loading={loading}>
							Регистрация
						</Button>
					</ScrollView>
				</>
			</KeyboardAvoidingView>
			<Portal>
				<Modal
					visible={visible}
					dismissable={true}
					onDismiss={() => setVisible(false)}>
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
