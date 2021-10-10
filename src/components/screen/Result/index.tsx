/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import {
	Text,
	View,
	StyleSheet,
	BackHandler,
	TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PieChart } from 'react-native-chart-kit';
import SimpleToast from 'react-native-simple-toast';
import config from '../../../config';
import { createTwoButtonAlert } from '../../../shared/functions/Alert';
import { setRetryCountAction } from '../../../models/quiz';
import { getData, storeData } from '../../../shared/functions/AsyncStorage';
import Header from '../../../shared/components/Header';

const KEY_WRONG_QUIZZES = 'KEY_WRONG_QUIZZES';

interface ResultProps {
	// eslint-disable-next-line react/require-default-props
	navigation?: any;
	route: any;
}

const chartConfig = {
	backgroundColor: '#e26a00',
	backgroundGradientFrom: '#fb8c00',
	backgroundGradientTo: '#ffa726',
	decimalPlaces: 2, // optional, defaults to 2dp
	color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
	labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
	style: {
		borderRadius: 16,
	},
	propsForDots: {
		r: '6',
		strokeWidth: '2',
		stroke: '#ffa726',
	},
};

const Result = ({ navigation, route }: ResultProps) => {
	const dispatch = useDispatch();

	const { wrongQuizIndexList } = route.params;

	console.log('wrongQuizIndexList in Result index, ', wrongQuizIndexList);

	const correctNumber = useSelector((state) => state.quiz.correctNumber);
	const quizTime = useSelector((state) => state.quiz.quizTime);
	const quizList = useSelector((state) => state.quiz.quizList.result?.results);
	const retryCount = useSelector((state) => state.quiz.retryCount);
	const wrongQuizList = useSelector((state) => state.wrongQuiz.wrongQuizList);

	const data = [
		{
			name: '정답',
			value: correctNumber,
			color: 'rgba(131, 167, 234, 1)',
			legendFontColor: '#7F7F7F',
			legendFontSize: 15,
		},
		{
			name: '오답',
			value: quizList?.length - correctNumber,
			color: '#F00',
			legendFontColor: '#7F7F7F',
			legendFontSize: 15,
		},
	];

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
			message: '홈으로 돌아가시겠습니까?',
			text_ok: '홈으로 돌아가기',
			text_cancel: '취소',
			function_ok: () => {
				navigation.navigate('Home');
			},
		});
	};

	useEffect(() => {
		const backAction = () => {
			goBack();
			return true;
		};

		// const result = getDataFromStorage();
		// setinitialWrongQuizzes(result);

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction,
		);
		return () => backHandler.remove();
	}, []);

	useEffect(() => {
		// console.log('getData from storage, ', getDataFromStorage());

		const currentWrongQuizList = [...quizList].filter(
			(item: any, index: number) => wrongQuizIndexList.includes(index),
		);

		console.log('currentWrongQuizList, ', currentWrongQuizList);
		console.log('wrongQuizList, ', wrongQuizList);

		// 다시 풀기의 경우 문제를 맞추거나 틀려도 오답노트에 반영이 되지 않음.
		if (retryCount > 0) {
			return;
		}

		if (wrongQuizList) {
			storeData({
				key: KEY_WRONG_QUIZZES,
				value: [...wrongQuizList, ...currentWrongQuizList],
				// dispatch
			});
		} else {
			storeData({
				key: KEY_WRONG_QUIZZES,
				value: currentWrongQuizList,
				// dispatch
			});
		}

		getData({
			key: KEY_WRONG_QUIZZES,
			dispatch,
		});

	}, [wrongQuizIndexList]);

	return (
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		<View style={styles.container}>
			<Header title="Result" goBackIcon="home" goBack={goBack} />
			<PieChart
				data={data}
				width={config.WINDOW_WIDTH}
				height={220}
				accessor="value"
				backgroundColor="transparent"
				paddingLeft="20"
				center={[0, 0]}
				chartConfig={chartConfig}
				style={styles.pieChart}
			/>
			<View style={styles.contentContainer}>
				<Text style={styles.textColor}>전체 문제: {quizList?.length}</Text>
				<Text style={styles.textColor}>정답 개수: {correctNumber}</Text>
				<Text style={styles.textColor}>오답 개수: {quizList?.length - correctNumber}</Text>
				<Text style={styles.textColor}>소요 시간: {quizTime} </Text>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.retryButton}
					onPress={() => {
						createTwoButtonAlert({
							message:
								'다시 풀기의 경우, 다시 푼 문제의 정답/오답 결과가 오답노트에 반영되지 않습니다.\n다시 푸시겠습니까?',
							text_ok: '다시 풀기',
							text_cancel: '취소',
							function_ok: () => {
								setRetryCount(retryCount + 1);

								navigation.navigate('Quiz');
							},
						});
					}}
				>
					<Text style={{color:"#1E90FF"}}>다시 풀기</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Result;

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: 'white' },
	pieChart: {
		flex: 1,
		marginVertical: 8,
		borderRadius: 16,

		// backgroundColor: 'purple',

		justifyContent: 'center',
		alignItems: 'center',
	},
	textColor : {
		color:"#0000CD"
	},
	contentContainer: {
		flex: 1,
		// backgroundColor: 'pink',
		alignItems: 'center',
		justifyContent: 'space-around',

		paddingBottom: 20,
	},

	buttonContainer: {
		marginVertical: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	retryButton: {
		width: '80%',
		backgroundColor: '#FFFFFF',
		borderWidth:1,
		borderColor:"#1E90FF",
		borderRadius: 20,

		paddingVertical: 20,

		justifyContent: 'center',
		alignItems: 'center',
	},
});
