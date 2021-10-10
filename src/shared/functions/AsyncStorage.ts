import AsyncStorage from '@react-native-async-storage/async-storage';
import { setWrongQuizListAction } from '../../models/wrongQuiz';

interface StoreDataProps extends ReadDataProps {
	// key: string;
	value: any;
}

interface ReadDataProps {
	key: string;
	dispatch?: any;
}

export const storeData = async ({ key, value }: StoreDataProps) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(key, jsonValue);
	} catch (e) {
		// saving error
		console.warn('error storing data, ', e);
	}
};

export const getData = async ({ key, dispatch }: ReadDataProps) => {
	// console.warn('getData 호출');
	try {
		const jsonValue = await AsyncStorage.getItem(key);
		// console.log('jsonValue in getData, ', jsonValue);

		if (dispatch) {
			dispatch(
				setWrongQuizListAction(
					jsonValue != null ? JSON.parse(jsonValue) : null,
				),
			);
		}

		// return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		// error reading value
		console.warn('error reading data, ', e);
	}
};
