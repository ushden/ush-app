import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
	KeyboardAvoidingView,
	SafeAreaView,
	Text,
	Platform,
	View,
	ScrollView,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { signUp } from '../store/members/membersActions';

export const SignUpScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { loading } = useSelector((state: RootState) => state.loading);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		navigation.setOptions({
			title: 'Регистрация',
			headerTitleAlign: 'center',
			headerStyle: {
				backgroundColor: 'black',
			},
			headerTitleStyle: {
				color: 'white',
			},
			headerBackTitleStyle: {
				color: 'white',
			},
			headerLeft: () => (
				<AntDesign
					name='arrowleft'
					size={30}
					color='white'
					onPress={() => navigation.goBack()}
					style={{ paddingLeft: 10 }}
				/>
			),
		});
	}, [navigation]);

	const pressHandler = () => {
		dispatch(signUp(name.trim(), email.trim(), password.trim()));
	};

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: 'white',
				justifyContent: 'center',
				paddingTop: '20%',
			}}>
			<StatusBar style='light' />
			<KeyboardAvoidingView
				style={{ flex: 1, paddingHorizontal: 15 }}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<>
					<ScrollView>
						<Text
							style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
							Добро пожаловать в CLUB 48
						</Text>
						<Text style={{ marginBottom: 10, textAlign: 'center' }}>
							Введите даные для регистрации
						</Text>
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
		</SafeAreaView>
	);
};
