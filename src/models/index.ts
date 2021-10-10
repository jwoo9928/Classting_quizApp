import { combineReducers } from 'redux';
import appInfo from './appInfo';
import quiz from './quiz';
import wrongQuiz from './wrongQuiz';

const rootReducer = combineReducers({
	appInfo,
	quiz,
	wrongQuiz,
});

export default rootReducer;
