import { handleActions } from 'redux-actions';
import invokeAPI from '../restApi';
import { createPromiseThunk } from './lib/asyncUtils';
import { Quiz } from '../types';

// 초기 상태
export const initialState = {
	// 퀴즈 목록
	quizList: [],
	// 퀴즈 푸는 데 소요되는 시간
	quizTime: null,
	// 정답 개수
	correctNumber: null,
	// 재도전 횟수
	retryCount: 0,
};

// 액션 정의
// ******************************************************************************
// 비동기 액션인 경우 _SUCCESS, ERROR 추가, 이외에는 추가 x
// ******************************************************************************

// 퀴즈 목록 가져오기
const GET_QUIZ_LIST = 'quiz/GET_QUIZ_LIST';
const GET_QUIZ_LIST_SUCCESS = 'quiz/GET_QUIZ_LIST_SUCCESS';
const GET_QUIZ_LIST_ERROR = 'quiz/GET_QUIZ_LIST_ERROR';

// 퀴즈 시간 set하기
const SET_QUIZ_TIME = 'quiz/SET_QUIZ_TIME';

// 퀴즈 정답 개수 set 하기
const SET_QUIZ_CORRECT_NUMBER = 'quiz/SET_QUIZ_CORRECT_NUMBER';

// 퀴즈 retry 횟수 set하기
const SET_RETRY_COUNT = 'quiz/SET_RETRY_COUNT';

// *********************************** thunk ************************************
//  비동기 액션일 때는 createPromiseThunk 호출, 아니면 그냥 action(object) 리턴
// ******************************************************************************

// 퀴즈 목록 가져오기
export const getQuizListAction = createPromiseThunk(
	GET_QUIZ_LIST,
	invokeAPI({ method: 'get' }),
);

export const setQuizTimeAction = (quizTime: string) => ({
	type: SET_QUIZ_TIME,
	payload: quizTime,
});

export const setQuizCorrectNumberAction = (quizCorrectNumber: number) => ({
	type: SET_QUIZ_CORRECT_NUMBER,
	payload: quizCorrectNumber,
});

export const setRetryCountAction = (retryCount: number) => ({
	type: SET_RETRY_COUNT,
	payload: retryCount,
});

// *********************************** reducer ***********************************
export default handleActions(
	{
		[GET_QUIZ_LIST]: (state: any, action: any) => state,
		[GET_QUIZ_LIST_SUCCESS]: (state: any, { payload: result }: any) => {
			console.log('GET_QUIZ_LIST_SUCCESS, result, ', result);
			return {
				...state,
				quizList: result,
			};
		},
		[GET_QUIZ_LIST_ERROR]: (state: any, action: any) => state,

		[SET_QUIZ_TIME]: (state: any, { payload: result }: any) => ({
			...state,
			quizTime: result,
		}),

		[SET_QUIZ_CORRECT_NUMBER]: (state: any, { payload: result }: any) => ({
			...state,
			correctNumber: result,
		}),

		[SET_RETRY_COUNT]: (
			state: any,
			{ payload: result }: { payload: number },
		) => ({
			...state,
			retryCount: result,
		}),
	},
	initialState,
);
