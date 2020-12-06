import React from "react"
import { TouchableOpacity, Text, GestureResponderEvent } from "react-native"
import styles from "../styles/tabbutton"

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

export default TabButton
