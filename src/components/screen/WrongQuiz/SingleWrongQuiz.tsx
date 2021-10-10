import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Header from '../../../shared/components/Header';
import SingleQuiz from '../Quiz/SingleQuiz';

interface SingleWrongQuizProps {
	navigation: any;
	route: any;
}

const SingleWrongQuiz = ({ navigation, route }: SingleWrongQuizProps) => {
	const { quizItem } = route.params;

	const [isSolved, setIsSolved] = useState<boolean>(false);

	const goBack = () => {
		navigation.goBack();
	};

	return (
		<View style={styles.container}>
			{/* <Text>SingleWrongQuiz</Text> */}
			<Header title="오답노트 상세" goBackIcon="left" goBack={goBack} />
			<View style={styles.singleQuizContainer}>
				<SingleQuiz
					currentQuiz={quizItem}
					isSolved={isSolved}
					setIsSolved={(param) => setIsSolved(param)}
				/>
			</View>
		</View>
	);
};

export default SingleWrongQuiz;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	singleQuizContainer: {
		flex: 1,
	},
});
