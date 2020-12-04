import React from "react"
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native"
//@ts-ignore
import imgMain from "../images/undraw_Mobile_application_mr4r.png"
import { useSelector } from "react-redux"
import { RootStore } from "../redux/store"

const Home: React.FC = () => {
  const {
    auth: { token },
  } = useSelector((state: RootStore) => state)
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
        <TouchableOpacity style={[styles.btn, styles.btnPrimary]}>
          <Text style={styles.btn__text}>
            {token ? "My profile" : "Sign in"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnSimple]}>
          <Text style={[styles.btn__text, styles.btnSimple__text]}>
            All users
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "transparent",
  },
  btn__text: {
    color: "white",
    fontSize: 17,
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

export default Home
