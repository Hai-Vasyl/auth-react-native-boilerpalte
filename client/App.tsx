import "react-native-gesture-handler"
import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import Home from "./screens/Home"
import About from "./screens/About"
import { Provider as PaperProvider } from "react-native-paper"
import { Provider as ReduxProvider } from "react-redux"
import store from "./redux/store"

const Stack = createStackNavigator()

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='About' component={About} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  )
}
