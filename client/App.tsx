import "react-native-gesture-handler"
import { StatusBar } from "expo-status-bar"
import React from "react"
import { Provider as PaperProvider } from "react-native-paper"
import { Provider as ReduxProvider } from "react-redux"
import EjectAuth from "./components/EjectAuth"
import store from "./redux/store"

export default function App() {
  return (
    <>
      <ReduxProvider store={store}>
        <PaperProvider>
          <EjectAuth />
        </PaperProvider>
      </ReduxProvider>
      <StatusBar backgroundColor='grey' />
    </>
  )
}
