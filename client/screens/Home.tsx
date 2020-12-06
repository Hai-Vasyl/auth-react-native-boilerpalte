import React from "react"
import { View, Image } from "react-native"
//@ts-ignore
import imgMain from "../images/undraw_Mobile_application_mr4r.png"
import { useSelector } from "react-redux"
import { RootStore } from "../redux/store"
import Button from "../components/Button"
import styles from "../styles/home"

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
    <View style={styles.wrapper}>
      <View style={styles.imgWrapper}>
        <Image style={styles.img} source={imgMain} />
      </View>
      <View style={styles.btns}>
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
