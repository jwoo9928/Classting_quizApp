import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface HeaderProps {
	goBack: () => void;
	title: string;
	goBackIcon: string;
}

const Header = ({ goBack, title, goBackIcon }: HeaderProps) => (
	<View style={styles.container}>
		<TouchableOpacity style={styles.backButton} onPress={goBack}>
			<Icon name={goBackIcon} size={24} color="black" />
		</TouchableOpacity>
		<Text style={styles.title}>{title}</Text>
		<View style={styles.backButton} />
	</View>
);

export default Header;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 20,
		paddingHorizontal:16,
		borderBottomColor: '#1E90FF',
		borderBottomWidth: 2,
	},
	backButton: {
		width: 24,
		height: 24,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
		color:"#1E90FF"
	},
});
