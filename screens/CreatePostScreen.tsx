import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	View,
	Dimensions,
} from 'react-native';
import { Card, Portal, TextInput, Modal, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ERROR, LOGO, Post, POST_DOWNLOAD_IMG } from '../store/types';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { showAlert } from '../store/alert/alertActions';
import { createPost } from '../store/posts/postsActions';
import { useNavigation } from '@react-navigation/core';

export const CreatePostScreen = () => {
	const [img, setImg] = useState('');
	const [height, setHeight] = useState(0);
	const [width, setWidth] = useState(0);
	const [visible, setVisible] = useState(false);
	const [name, setName] = useState('');
	const [desc, setDesc] = useState('');
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const loading = useSelector((state: RootState) => state.loading.loading);
	const member = useSelector((state: RootState) => state.members.member);

	const window = Dimensions.get('window');
	let imageHeight = img ? Math.floor((window.width / width) * height) : 300;
	let imageWidth = Math.floor(window.width);

	const createPostHandle = () => {
		if (img === '') {
			return dispatch(showAlert('Выбери картинку', ERROR));
		}

		if (name === '') {
			return dispatch(showAlert('Напиши название', ERROR));
		}

		const payload: Post = {
			title: name,
			description: desc,
			createAt: Date.now(),
			likes: 0,
			shits: 0,
			postId: `post-${Date.now()}`,
			imageUrl: img,
			imageHeight: imageHeight,
			imageWidth: imageWidth,
			author: {
				name: member?.name,
				email: member?.email,
				photoUrl: member?.photoUrl,
				id: member?.id,
			},
		};

		dispatch(createPost(payload));

		if (!loading) {
			navigation.goBack();
		}
	};

	const openCamera = async () => {
		setVisible(false);

		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
		});

		if (!result.cancelled) {
			setHeight(result.height);
			setWidth(result.width);
			setImg(result.uri);
		}
	};

	const openMediaLibrary = async () => {
		setVisible(false);

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
		});

		if (!result.cancelled) {
			setHeight(result.height);
			setWidth(result.width);
			setImg(result.uri);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style='dark' />
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={60}
				style={{ padding: 0 }}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={{ marginBottom: 10 }}>
						<Image source={{ uri: LOGO }} style={styles.img} />
						<Text style={styles.text}>Создай свой собственный пост</Text>
					</View>
					<View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
						<TextInput
							style={styles.input}
							mode='outlined'
							label='Название'
							value={name}
							onChangeText={(text) => setName(text)}
						/>
						<TextInput
							style={styles.input}
							mode='outlined'
							label='Описание (если необходимо)'
							value={desc}
							onChangeText={(text) => setDesc(text)}
						/>
						<Text style={styles.text}>Выберите картинку</Text>
						<Card
							onPress={() => setVisible(true)}
							style={{ marginVertical: 10 }}>
							<Card.Cover
								source={{ uri: img || POST_DOWNLOAD_IMG }}
								resizeMode='contain'
								style={{
									flex: 1,
									alignSelf: 'stretch',
									maxWidth: '100%',
									width: imageWidth,
									height: imageHeight,
								}}
							/>
						</Card>
						<Button
							mode='contained'
							onPress={createPostHandle}
							loading={loading}>
							Создать пост
						</Button>
					</View>
				</ScrollView>
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	text: {
		textAlign: 'center',
		fontWeight: '300',
		fontSize: 20,
	},
	img: {
		width: '100%',
		height: 200,
	},
	input: {
		marginVertical: 5,
	},
});
