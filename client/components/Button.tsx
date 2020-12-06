import React from "react"
import { TouchableOpacity, Text, GestureResponderEvent } from "react-native"
// @ts-ignore
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import styles from "../styles/button"

interface IButtonProps {
  simple?: boolean
  primary?: boolean
  exStyle?: { [key: string]: any }
  title: string
  iconName?: string
  press(event: GestureResponderEvent): any
}

const Button: React.FC<IButtonProps> = ({
  simple,
  primary,
  press,
  title,
  iconName,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        simple && styles.btnSimple,
        primary && styles.btnPrimary,
      ]}
      onPress={press}
    >
      {iconName && <Icon name={iconName} size={20} color='#9ca2b0' />}
      <Text style={[styles.btn__text, simple && styles.btnSimple__text]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default Button
