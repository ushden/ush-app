import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import store from './store/rootReducer';
import { Alert } from './components/Alert';
import { AppNavigation } from './navigations/AppNavigation';

export default function App() {
	return (
		<Provider store={store}>
			<PaperProvider>
				<NavigationContainer>
					<View style={styles.container}>
						<AppNavigation />
						<Alert />
					</View>
				</NavigationContainer>
			</PaperProvider>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
