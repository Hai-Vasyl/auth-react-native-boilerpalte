import React from "react"
import { View, Image } from "react-native"
//@ts-ignore
import imgMain from "../images/undraw_Mobile_application_mr4r.png"
import { useSelector } from "react-redux"
import { RootStore } from "../redux/store"
import Button from "../components/Button"

interface IHomeProps {
  navigation: any
}

const Home: React.FC<IHomeProps> = ({ navigation }) => {
  const {
    auth: { token, user },
  } = useSelector((state: RootStore) => state)

  const handleGetToProfille = () => {
    if (token) {
      navigation.navigate("User", {
        userId: user._id,
      })
    } else {
      navigation.navigate("Auth")
    }
  }

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <View
        style={{
          marginBottom: 15,
        }}
      >
        <Image
          style={{
            width: 320,
            height: 200,
            resizeMode: "contain",
          }}
          source={imgMain}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button
          primary
          press={handleGetToProfille}
          title={token ? "My profile" : "Sign in"}
        />
        <Button
          simple
          press={() => navigation.navigate("Users")}
          title='All users'
        />
      </View>
    </View>
  )
}

export default Home
