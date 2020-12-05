import React from "react"
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native"

interface ITabButtonProps {
  exStyle?: { [key: string]: any }
  title: string
  press(event: GestureResponderEvent): void | undefined
}

const TabButton: React.FC<ITabButtonProps> = ({ exStyle, title, press }) => {
  return (
    <TouchableOpacity style={[styles.btn, exStyle]} onPress={press}>
      <Text style={styles.btn__text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    padding: 15,
    borderTopWidth: 1,
    borderColor: "lightgrey",
    backgroundColor: "white",
    flex: 1,
    borderLeftWidth: 1,
  },
  btn__text: {
    textAlign: "center",
  },
})

export default TabButton
