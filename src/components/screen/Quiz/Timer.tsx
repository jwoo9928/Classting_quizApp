/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import { useDispatch } from 'react-redux';
import { setQuizTimeAction } from '../../../models/quiz';

interface TimerProps {
	isStart: boolean;
}

interface TimeProps {
	seconds: number;
	minutes: number;
}

const getTimeInFormat = (time: TimeProps): string => {
	const { seconds, minutes } = time;
	const resultSeconds = seconds < 10 ? `0${seconds}` : seconds;
	const resultMinutes = minutes < 10 ? `0${minutes}` : minutes;

	return `${resultMinutes}:${resultSeconds}`;
};

const Timer = ({ isStart }: TimerProps) => {
	// console.log('isStart in Timer, ', isStart);

	const dispatch = useDispatch();

	const [time, setTime] = useState<TimeProps>({
		seconds: 0,
		minutes: 0,
	});

	const setQuizTime = (paramTime: TimeProps) => {
		try {
			dispatch(setQuizTimeAction(getTimeInFormat(paramTime)));
		} catch (e) {
			console.warn('error in setQuizTime, ', e);
			SimpleToast.show('퀴즈 시간 정보를 저장하는 데에 실패했습니다.');
		}
	};

	useEffect(() => {
		const advanceTime = () => {
			setTimeout(() => {
				let nSeconds = time.seconds;
				let nMinutes = time.minutes;

				nSeconds++;

				if (nSeconds > 59) {
					nMinutes++;
					nSeconds = 0;
				}

				if (isStart) {
					setTime({ seconds: nSeconds, minutes: nMinutes });
				} else {
					setQuizTime(time);
					setTime({ seconds: 0, minutes: 0 });
				}
			}, 1000);
		};
		advanceTime();
	}, [time]);

	return (
		<View style={styles.container}>
			<Text>{getTimeInFormat(time)}</Text>
		</View>
	);
};

export default Timer;

const styles = StyleSheet.create({
	container: {},
});
