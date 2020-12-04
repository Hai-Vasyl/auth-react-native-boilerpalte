import React, { useState } from "react"
import { View, Text, Button } from "react-native"
import { IHomeProps } from "../interfaces"
import { useSelector } from "react-redux"
import { RootStore } from "../redux/store"

// ava: "",
//     firstname: "",
//     lastname: "",
//     phone: "",
//     address: "",
//     bio: "",
//     birth: "",
//     role: "",
//     _id: "",
//     username: "",
//     email: "",
//     password: "",
//     date: "",

const About: React.FC<IHomeProps> = ({ navigation }) => {
  const {
    auth: { user, token },
  } = useSelector((state: RootStore) => state)
  const [tabInfo, setTabinfo] = useState(false)

  return (
    <View>
      <Text>About screen</Text>
      <Button title='Home' onPress={() => navigation.navigate("Home")} />
      {tabInfo ? (
        <View>
          {Object.keys(user).map((userKey) => {
            return (
              <View
                key={userKey}
                style={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "grey",
                }}
              >
                {/* @ts-ignore */}
                <Text>{userKey}</Text>:<Text>{user[userKey]}</Text>
              </View>
            )
          })}
        </View>
      ) : (
        <View>
          <Text>User contacts</Text>
        </View>
      )}
    </View>
  )
}

export default About
