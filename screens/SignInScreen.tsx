import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useCallback, useState } from 'react';
import {
	KeyboardAvoidingView,
	SafeAreaView,
	View,
	Image,
	StyleSheet,
	ScrollView,
	Platform,
	RefreshControl,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { signIn } from '../store/members/membersActions';

const wait = (timeout: number) => {
	return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const SignInScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { loading } = useSelector((state: RootState) => state.loading);

	const [refreshing, setRefreshing] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);

	const pressHandler = (): void => {
		dispatch(signIn(email.trim(), password.trim()));
		setEmail('');
		setPassword('');
	};

	useEffect(() => {
		navigation.setOptions({
			title: 'CLUB',
			headerTitleAlign: 'center',
			headerStyle: {
				backgroundColor: 'black',
			},
			headerTitleStyle: {
				color: 'white',
			},
		});
	}, [navigation]);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style='light' />
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={100}>
				<>
					<View style={styles.img}>
						<Image
							source={{
								uri:
									'https://firebasestorage.googleapis.com/v0/b/ush-app.appspot.com/o/Club48.jpg?alt=media&token=65e6eb37-ee3a-424c-b363-4e2a4f3a6042',
							}}
							style={{ width: '100%', height: '100%', resizeMode: 'center' }}
						/>
					</View>
					<ScrollView
						style={styles.form}
						refreshControl={
							<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
						}>
						<TextInput
							mode='outlined'
							label='Емейл'
							left={<TextInput.Icon name='account' color='black' />}
							style={{ marginBottom: 10 }}
							value={email}
							onChangeText={(text) => setEmail(text)}
						/>
						<TextInput
							mode='outlined'
							label='Пароль'
							secureTextEntry={true}
							left={<TextInput.Icon name='lock' color='black' />}
							style={{ marginBottom: 15 }}
							value={password}
							onChangeText={(text) => setPassword(text)}
						/>
						<Button
							mode='contained'
							style={{ marginBottom: 10 }}
							onPress={pressHandler}
							loading={loading}>
							Войти
						</Button>
						<Button
							mode='outlined'
							onPress={() => navigation.navigate('SignUp')}>
							Регистрация
						</Button>
					</ScrollView>
				</>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	img: {
		flex: 0.5,
		backgroundColor: 'black',
		paddingBottom: 20,
	},
	form: {
		paddingHorizontal: 20,
		paddingTop: 30,
		flex: 1,
		backgroundColor: 'white',
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
	},
});
