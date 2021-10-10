import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import wrongQuiz from '../../../models/wrongQuiz';
import { Quiz } from '../../../types';
import WrongQuizItem from './WrongQuizItem';

const ITEM_HEIGHT = 80;

interface WrongQuizProps {
	navigation: any;
}

const WrongQuizList = ({ navigation }: WrongQuizProps) => {
	const wrongQuizList = useSelector((state) =>
		state.wrongQuiz.wrongQuizList ? state.wrongQuiz.wrongQuizList : [],
	);

	console.log('wrongQuizList in WrongQuizList, ', wrongQuizList);

	const onPress = (item: Quiz) => {
		navigation.navigate('SingleWrongQuiz', {
			quizItem: item,
		});
	};

	return (
		<FlatList
			style={styles.flatList}
			data={wrongQuizList}
			keyExtractor={(item) => item.question}
			renderItem={({ item, index }) => (
				<WrongQuizItem
					index={index}
					quizItem={item}
					itemHeight={ITEM_HEIGHT}
					onPress={(param: Quiz) => onPress(param)}
				/>
			)}
			ListEmptyComponent={() => <Text>오답이 없습니다.</Text>}
			contentContainerStyle={
				wrongQuizList?.length === 0 && styles.emptyComponent
			}
			getItemLayout={(data, index) => ({
				length: ITEM_HEIGHT,
				offset: ITEM_HEIGHT * index,
				index,
			})}
		/>
	);
};

export default WrongQuizList;

const styles = StyleSheet.create({
	flatList: {
	},
	emptyComponent: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
