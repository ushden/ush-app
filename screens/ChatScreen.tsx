import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
	SafeAreaView,
	Text,
	View,
	StatusBar as StatusBarNative,
	TouchableWithoutFeedback,
	Keyboard,
	FlatList,
	TouchableOpacity,
	KeyboardAvoidingView,
} from 'react-native';
import { List, TextInput } from 'react-native-paper';

export const ChatScreen = () => {
	const navigation = useNavigation();
	const { params } = useRoute();

	navigation.setOptions({
		headerMode: true,
	});
	return (
		<SafeAreaView>
			<View
				style={{
					paddingTop: StatusBarNative.currentHeight,
					backgroundColor: '#4848aa',
				}}></View>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<KeyboardAvoidingView>
					{/* <FlatList data={route.} /> */}
					<View>
						<TextInput mode='flat' label='Сообщение' />
						<TouchableOpacity>
							<List.Icon icon='send' color='#4848aa' />
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
			<Text>Chat</Text>
		</SafeAreaView>
	);
};
