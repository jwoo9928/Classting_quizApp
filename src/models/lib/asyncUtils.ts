// promise에 기반한 thunk를 만들어주는 함수
export const createPromiseThunk = (
	type: any,
	promiseCreator: (arg0: any) => any,
) => {
	const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

	interface DispatchType {
		type: any;
		param?: any;
		payload?: any;
		error?: boolean;
	}

	return (param: any) => async (dispatch: (arg0: DispatchType) => void) => {
		// 요청 시작
		dispatch({ type, param });
		try {
			// 결과물의 이름을 payload란 이름으로 통일
			const response = await promiseCreator(param);

			// 성공한 경우
			dispatch({
				type: SUCCESS,
				payload: {
					param,
					result: response.data,
				},
			});
		} catch (e) {
			// 실패한 경우
			dispatch({ type: ERROR, payload: e, error: true });
			throw e;
		}
	};
};

// 리듀서에서 사용 가능한 유틸함수 정의
export const reducerUtils = {
	// 초기 상태
	initial: (initialData = null) => ({
		loading: false,
		data: initialData,
		error: null,
	}),

	// 로딩중 상태, prevState인 경우엔 기본값은 null이지만, 따로 값을 지정하면 null로 바꾸지 않고 다른 값 유지 가능
	loading: (prevState = null) => ({
		loading: true,
		data: prevState,
		error: null,
	}),

	// 성공
	success: (payload: any) => ({
		loading: false,
		data: payload,
		error: null,
	}),

	// 실패
	error: (error: any) => ({
		loading: false,
		data: null,
		error,
	}),
};

// 비동기 관련 액션들을 처리하는 리듀서 생성
// type: 액션의 타입, key: 상태의 key
export const handleAsyncActions = (type: any, key: any) => {
	const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
	return (state: any, action: any) => {
		switch (action.type) {
			case type:
				return {
					...state,
					[key]: reducerUtils.loading(),
				};
			case SUCCESS:
				return {
					...state,
					[key]: reducerUtils.success(action.payload),
				};
			case ERROR:
				return {
					...state,
					[key]: reducerUtils.error(action.paylod),
				};
			default:
				return state;
		}
	};
};
