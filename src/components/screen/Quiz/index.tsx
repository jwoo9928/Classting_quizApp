/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect } from 'react';
import {
	Text,
	View,
	StyleSheet,
	SafeAreaView,
	TouchableOpacity,
	BackHandler,
} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {
	setQuizCorrectNumberAction,
	setRetryCountAction,
} from '../../../models/quiz';
import { createTwoButtonAlert } from '../../../shared/functions/Alert';
import Header from '../../../shared/components/Header';
import SingleQuiz from './SingleQuiz';

interface QuizProps {
	navigation?: any;
}

const Quiz = ({ navigation }: QuizProps) => {
	const dispatch = useDispatch();

	const quizList = useSelector((state) => state.quiz.quizList.result?.results);
	const retryCount = useSelector((state) => state.quiz.retryCount);

	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [isSolved, setIsSolved] = useState<boolean>(false);
	const [correctNumber, setCorrectNumber] = useState<number>(0);
	const [wrongQuizIndexList, setWrongQuizIndexList] = useState<number[]>([]);
	const [currentQuiz, setCurrentQuiz] = useState<Quiz | undefined>();

	console.log('quizList in Quiz index, ', quizList);

	const setRetryCount = (count: number) => {
		try {
			dispatch(setRetryCountAction(count));
		} catch (e) {
			console.warn('error in setRetryCount, ', e);
			SimpleToast.show('재도전 중 에러가 발생했습니다.');
		}
	};

	const goBack = () => {
		createTwoButtonAlert({
			message:
				'퀴즈를 푸는 도중에 나가시면 내용이 저장되지 않습니다.\n나가시겠습니까?',
			text_ok: '나가기',
			text_cancel: '취소',
			function_ok: () => {
				navigation.goBack();
			},
		});
	};

	const resetValues = () => {
		setCurrentIndex(0);
		setIsSolved(false);
		setCorrectNumber(0);
		setWrongQuizIndexList([]);
	};

	const setNumberOfCorrect = (number: number) => {
		try {
			dispatch(setQuizCorrectNumberAction(number));
		} catch (e) {
			console.warn('error in setCorrectNumber,', e);
			SimpleToast.show('정답 개수 저장에 실패하였습니다.');
		}
	};

	const goToNext = () => {
		if (currentIndex === quizList?.length - 1) {
			setNumberOfCorrect(correctNumber);
			navigation.navigate('Result', {
				wrongQuizIndexList,
			});
			return;
		}
		setCurrentIndex(currentIndex + 1);
	};

	useEffect(() => {
		const backAction = () => {
			goBack();
			return true;
		};
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction,
		);
		return () => {
			backHandler.remove();
			setRetryCount(0);
		};
	}, []);

	useEffect(() => {
		setCurrentQuiz(quizList?.[currentIndex]);
		setIsSolved(false);
	}, [currentIndex, quizList]);

	useEffect(() => {
		resetValues();
	}, [retryCount]);

	return (
		<SafeAreaView style={styles.container}>
			<Header goBack={goBack} title="Quiz" goBackIcon="left" />
			<SingleQuiz
				currentQuiz={currentQuiz}
				currentIndex={currentIndex}
				isSolved={isSolved}
				setIsSolved={(param) => setIsSolved(param)}
				correctNumber={correctNumber}
				setCorrectNumber={(param) => setCorrectNumber(param)}
				wrongQuizIndexList={wrongQuizIndexList}
				setWrongQuizIndexList={(param) => setWrongQuizIndexList(param)}
			/>
			<View style={styles.buttonsContainer}>
				{isSolved && (
					<TouchableOpacity onPress={goToNext} style={styles.nextButton}>
						<Text style={{color:"#1E90FF"}}>Next</Text>
						<Icon name="arrowright" size={24} color="#1E90FF" />
					</TouchableOpacity>
				)}
			</View>
		</SafeAreaView>
	);
};

export default Quiz;

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: 'white' },
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: 50,

		paddingRight: 20,
	},
	nextButton : {
		flexDirection:"row",
		justifyContent:"center",
		alignItems:"center"
	}
});
