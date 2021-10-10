/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
// import Home from './components/screen/Home';
import MainStackNavigator from './components/navigation/MainStackNavigator';
import store from './store';

const AppMain = () => (
	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	<SafeAreaView style={styles.container}>
		<NavigationContainer>
			<MainStackNavigator />
		</NavigationContainer>
	</SafeAreaView>
);

const App = () => (
	<Provider store={store}>
		<AppMain />
	</Provider>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'red',
	},
});

export default App;
