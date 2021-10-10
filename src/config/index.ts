
import { Dimensions, Platform } from 'react-native';

console.log('QUIZ_HOST in conifg, ', "https://opentdb.com/api.php");


const PLATFORM = Platform.select({
	android: 'android',
	ios: 'ios',
});

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;

export default {
	PLATFORM,
	WINDOW_HEIGHT,
	WINDOW_WIDTH,
};
