import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Device from 'expo-device';
import { DataTable } from 'react-native-paper';

export const DeviceScreen = () => {
	const [data, setData] = useState({ day: 0, hours: 0, minuts: 0 });
	const getUptime = async () => {
		const uptime = await Device.getUptimeAsync();
		const date = {
			day: new Date(Date.now() - uptime).getDay(),
			hours: new Date(Date.now() - uptime).getHours(),
			minuts: new Date(Date.now() - uptime).getMinutes(),
		};

		return date;
	};

	getUptime().then((res) => setData(res));

	return (
		<SafeAreaView>
			<StatusBar style='dark' />
			<DataTable>
				<DataTable.Header>
					<DataTable.Title>Информация про устройство</DataTable.Title>
				</DataTable.Header>
				<DataTable.Row>
					<DataTable.Cell>Бренд устройства</DataTable.Cell>
					<DataTable.Cell numeric>{Device.brand}</DataTable.Cell>
				</DataTable.Row>
				<DataTable.Row>
					<DataTable.Cell>Производитель</DataTable.Cell>
					<DataTable.Cell numeric>{Device.manufacturer}</DataTable.Cell>
				</DataTable.Row>
				<DataTable.Row>
					<DataTable.Cell>Название образца</DataTable.Cell>
					<DataTable.Cell numeric>{Device.designName}</DataTable.Cell>
				</DataTable.Row>
				<DataTable.Row>
					<DataTable.Cell>Общее название</DataTable.Cell>
					<DataTable.Cell numeric>{Device.productName}</DataTable.Cell>
				</DataTable.Row>
				<DataTable.Row>
					<DataTable.Cell>Год выпуска</DataTable.Cell>
					<DataTable.Cell numeric>{Device.deviceYearClass}</DataTable.Cell>
				</DataTable.Row>
				<DataTable.Row>
					<DataTable.Cell>Имя системы</DataTable.Cell>
					<DataTable.Cell numeric>{Device.osName}</DataTable.Cell>
				</DataTable.Row>
				<DataTable.Row>
					<DataTable.Cell>Версия системы</DataTable.Cell>
					<DataTable.Cell numeric>{Device.osVersion}</DataTable.Cell>
				</DataTable.Row>
				<DataTable.Row>
					<DataTable.Cell>Без перезарядки</DataTable.Cell>
					<DataTable.Cell
						numeric>{`${data.day} д. ${data.hours} ч. ${data.minuts} м.`}</DataTable.Cell>
				</DataTable.Row>
			</DataTable>
		</SafeAreaView>
	);
};
