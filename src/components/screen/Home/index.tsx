import * as React from 'react';
import {
	View,
	StyleSheet,
	SafeAreaView,
	Text,
	TouchableOpacity,
} from 'react-native';


interface HomeProps {
	navigation?: any;
}

const Home = ({ navigation }: HomeProps) => {

	return (
		<View style={styles.container}>
			<Text style={[styles.Title,{marginTop:120}]}>클래스팅</Text>
			<Text style={styles.Title}>Quiz</Text>
			<Text style={{color : "#00008B",marginVertical:20}}>made by jwoo9928</Text>
			<TouchableOpacity style={styles.play}>
				<Text style={styles.playtext}>play</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container : {
		flex:1,
		backgroundColor:"#1E90FF",
		alignItems:'center'
	},
	Title : {
		color : "#FFFFFF",
		fontSize: 50,
	},
	play : {
		borderColor: "#FFFFFF",
		borderWidth:2,
		height:120,
		width:120,
		borderRadius:60,
		alignContent:"center",
		alignItems:"center",
		marginVertical:100,
		justifyContent:"center"
	},
	playtext : {
		fontSize:30,
		color:"#FFFFFF"
	}

});
