import React from "react"
import { View, Text, Button } from "react-native"
import { IHomeProps } from "../interfaces"

const About: React.FC<IHomeProps> = ({ navigation }) => {
  return (
    <View>
      <Text>About screen</Text>
      <Button title='Home' onPress={() => navigation.navigate("Home")} />
    </View>
  )
}

export default About
