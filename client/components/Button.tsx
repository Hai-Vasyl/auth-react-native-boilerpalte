import React from "react"
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

interface IButtonProps {
  simple?: boolean
  primary?: boolean
  exStyle?: { [key: string]: any }
  title: string
  iconName?: string
  press(event: GestureResponderEvent): void | undefined
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

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
  },
  btn__text: {
    color: "white",
    fontSize: 17,
    marginHorizontal: 5,
  },
  btnSimple__text: {
    color: "#333",
  },
  btnPrimary: {
    backgroundColor: "#333",
  },
  btnSimple: {
    borderColor: "lightgrey",
  },
})

export default Button
