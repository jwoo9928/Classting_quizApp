import { handleActions } from 'redux-actions';

// 초기 상태
export const initialState = {
	// 오답노트 목록
	wrongQuizList: [],
};

// 오답노트 목록 set하기
const SET_WRONG_QUIZ_LIST = 'quiz/SET_WRONG_QUIZ_LIST';

export const setWrongQuizListAction = (wrongQuizList: any) => ({
	type: SET_WRONG_QUIZ_LIST,
	payload: wrongQuizList,
});

export default handleActions(
	{
		[SET_WRONG_QUIZ_LIST]: (
			state: any,
			{ payload: result }: { payload: number },
		) => ({
			...state,
			wrongQuizList: result,
		}),
	},
	initialState,
);
