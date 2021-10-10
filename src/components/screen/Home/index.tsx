import * as React from 'react';
import { useEffect } from 'react';
import {
	View,
	StyleSheet,
	SafeAreaView,
	Text,
	TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { navigateToQuiz } from '../../../shared/functions/NavigateTo';
import { getData } from '../../../shared/functions/AsyncStorage';

const KEY_WRONG_QUIZZES = 'KEY_WRONG_QUIZZES';

interface HomeProps {
	navigation?: any;
}

const Home = ({ navigation }: HomeProps) => {
	const dispatch = useDispatch();

	const goToQuiz = () => {
		navigateToQuiz({
			navigation,
			dispatch,
			number: 10,
		});
	};

	const goToWrongQuiz = () => {
		navigation.navigate('WrongQuiz');
	};

	useEffect(() => {
		getData({
			key: KEY_WRONG_QUIZZES,
			dispatch,
		});
	}, []);

	return (
		<View style={styles.container}>
			<Text style={[styles.Title, { marginTop: 120 }]}>클래스팅</Text>
			<Text style={styles.Title}>Quiz</Text>
			<Text style={{ color: "#00008B", marginVertical: 20 }}>made by jwoo9928</Text>
			<TouchableOpacity
				style={styles.play}
				onPress={goToQuiz}
			>
				<Text style={styles.playtext}>play</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.wrongquiz} onPress={goToWrongQuiz}>
					<Text style={{color:"#FFFFFF",fontSize:18}} >오답 노트</Text>
				</TouchableOpacity>
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1E90FF",
		alignItems: 'center'
	},
	Title: {
		color: "#FFFFFF",
		fontSize: 50,
	},
	play: {
		borderColor: "#FFFFFF",
		borderWidth: 2,
		height: 120,
		width: 120,
		borderRadius: 60,
		alignContent: "center",
		alignItems: "center",
		marginVertical: 100,
		justifyContent: "center"
	},
	playtext: {
		fontSize: 30,
		color: "#FFFFFF"
	},
	wrongquiz : {
		width:180,
		height:50,
		borderWidth:1,
		borderRadius:50,
		borderColor:"#FFFFFF",
		justifyContent:"center",
		alignItems:"center"
	}

});
