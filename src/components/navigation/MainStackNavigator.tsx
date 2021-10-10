import * as React from 'react';

// import {createStackNavigator} from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screen/Home';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="Home"
			component={Home}
			options={{
				headerShown: false,
			}}
		/>
	</Stack.Navigator>
);

export default MainStackNavigator;
