import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const MemberInfo = () => {
	return (
		<View style={styles.memberInfoWrapper}>
			<View style={styles.memberInfoItem}>
				<Text style={styles.memberInfoTitle}>48</Text>
				<Text style={styles.memberInfoSubtitle}>Посты</Text>
			</View>
			<View style={styles.memberInfoItem}>
				<Text style={styles.memberInfoTitle}>48</Text>
				<Text style={styles.memberInfoSubtitle}>Следят</Text>
			</View>
			<View style={styles.memberInfoItem}>
				<Text style={styles.memberInfoTitle}>48</Text>
				<Text style={styles.memberInfoSubtitle}>Подписан</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	memberInfoWrapper: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		marginTop: 20,
		marginBottom: 20,
	},
	memberInfoItem: {
		alignItems: 'center',
	},
	memberInfoTitle: {
		fontWeight: 'bold',
		fontSize: 18,
	},
	memberInfoSubtitle: {
		fontWeight: '300',
		color: 'gray',
	},
});
