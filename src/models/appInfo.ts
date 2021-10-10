import { handleActions } from 'redux-actions';
import invokeAPI from '../restApi';
import { createPromiseThunk } from './lib/asyncUtils';

// 초기 상태
export const initialState = {};

// 액션 정의
// ******************************************************************************
// 비동기 액션인 경우 _SUCCESS, ERROR 추가, 이외에는 추가 x
// ******************************************************************************

// *********************************** thunk ************************************
//  비동기 액션일 때는 createPromiseThunk 호출, 아니면 그냥 action(object) 리턴
// ******************************************************************************

export default handleActions({}, initialState);
