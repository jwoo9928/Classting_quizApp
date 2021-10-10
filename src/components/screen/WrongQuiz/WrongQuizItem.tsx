import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { decode } from 'html-entities';
import { Quiz } from '../../../types';

interface WrongQuizItemProps {
	index: number;
	quizItem: Quiz;
	itemHeight: number;
	onPress: (param: Quiz) => void;
}

const WrongQuizItem = ({
	index,
	quizItem,
	itemHeight,
	onPress,
}: WrongQuizItemProps) => (
	<TouchableOpacity
		style={[styles.container, { height: itemHeight }]}
		onPress={() => onPress(quizItem)}
	>
		<Text style={styles.index}>{index + 1}.</Text>
		<Text style={styles.question}>{decode(quizItem.question)}</Text>
	</TouchableOpacity>
);

export default WrongQuizItem;

const styles = StyleSheet.create({
	container: {
		width: '95%',
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: '#1E90FF',
		borderWidth: 1,
		paddingHorizontal: 16,
		borderRadius:10,
		marginVertical:5,
		alignSelf:"center"
	},
	index: {
		marginRight: 20,
		fontSize: 16,
	},
	question: { marginRight: 16 },
});
