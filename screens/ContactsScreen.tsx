import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Contacts from 'expo-contacts';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Text, View } from 'react-native';
import { List } from 'react-native-paper';

export const ContactsScreen = () => {
	const [contacts, setContacts]: [contacts: any, setContacts: any] = useState(
		[]
	);
	const [first, setFirst]: [first: any, setFirst: any] = useState([]);

	useEffect(() => {
		(async () => {
			const { status } = await Contacts.requestPermissionsAsync();
			if (status === 'granted') {
				const { data } = await Contacts.getContactsAsync({
					fields: [Contacts.Fields.Emails],
				});

				if (data.length > 0) {
					const first = data.slice(0, 1);
					const contacts = data.slice(1);

					setContacts(contacts);
					setFirst(first);
				}
			}
		})();
	}, []);

	return (
		<SafeAreaView>
			<StatusBar style='dark' />
			<View>
				<Text style={{ paddingTop: 0, textAlign: 'center' }}>
					Какая-то дичь с контактами
				</Text>
				{first.map((item: any) => (
					<Text style={{ textAlign: 'center' }} key={Date.now()}>
						{item.name}
					</Text>
				))}
			</View>
			<FlatList
				data={contacts}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <List.Item title={item?.firstName} />}
			/>
		</SafeAreaView>
	);
};
