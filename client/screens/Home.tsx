import React, { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native"
import { IHomeProps } from "../interfaces"
import { TextInput } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const Home: React.FC<IHomeProps> = ({ navigation }) => {
  const [flipLogin, setFlipLogin] = useState(true)
  const [form, setForm] = useState([
    { param: "username", label: "Username", value: "" },
    { param: "email", label: "Email", value: "" },
    { param: "password", label: "Password", value: "" },
  ])

  const handleChangeField = (value: string, param: string) => {
    setForm((prevForm) =>
      prevForm.map((field) => {
        if (field.param === param) {
          return { ...field, value }
        }
        return field
      })
    )
  }

  const toggleFlipForm = () => {
    setFlipLogin((prevFlip) => !prevFlip)
  }

  return (
    <View style={styles.wrapper}>
      <KeyboardAvoidingView behavior='height'>
        <View
          style={{
            paddingVertical: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 15,
          }}>
          <Icon
            name={flipLogin ? "login-variant" : "checkbox-marked-outline"}
            size={33}
            color='#9ca2b0'
          />
          <Text style={{ fontSize: 30, marginLeft: 5 }}>
            {flipLogin ? "Login" : "Register"}
          </Text>
        </View>

        <View>
          {form.map((field) => {
            return (
              <TextInput
                style={[
                  styles.field,
                  flipLogin &&
                    field.param === "username" &&
                    styles.field_closed,
                ]}
                key={field.param}
                label={field.label}
                mode='outlined'
                value={field.value}
                onChangeText={(text) => handleChangeField(text, field.param)}
              />
            )
          })}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 15,
          }}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.btn, styles.btn_primary]}>
            <Icon
              name={flipLogin ? "login-variant" : "checkbox-marked-outline"}
              size={20}
              color='#9ca2b0'
            />
            <Text style={[styles.btn__title, styles.btn_primary__title]}>
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.btn]}
            onPress={toggleFlipForm}>
            <Icon
              name={flipLogin ? "checkbox-marked-outline" : "login-variant"}
              size={20}
              color='#9ca2b0'
            />
            <Text style={[styles.btn__title]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        {/* <Button title='About' onPress={() => navigation.navigate("About")} /> */}
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  field: {
    marginBottom: 15,
  },
  field_closed: {
    display: "none",
  },
  btn: {
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 17,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  btn_primary: {
    backgroundColor: "#333",
    marginRight: 10,
  },
  btn__title: { fontSize: 17, marginLeft: 10 },
  btn_primary__title: {
    color: "#fff",
  },
})

export default Home
