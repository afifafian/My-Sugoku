import React from 'react';
import { Provider } from "react-redux";
import store from "./src/store";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Game, Finish} from './src/screens';
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="My-Sudoku App" component={Game}/>
          <Stack.Screen name="Finish" component={Finish} />    
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}