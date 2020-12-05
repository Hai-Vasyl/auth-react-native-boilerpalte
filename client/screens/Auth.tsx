import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { TextInput } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { fetchAuth } from "../redux/actions/auth"
import { useSelector, useDispatch } from "react-redux"
import { RootStore } from "../redux/store"
import Button from "../components/Button"
import { IError } from "../redux/types/auth"

interface IAuthProps {
  navigation: any
}

const Auth: React.FC<IAuthProps> = ({ navigation }) => {
  const [flipLogin, setFlipLogin] = useState(true)
  const [form, setForm] = useState([
    { param: "username", label: "Username", value: "", msg: "" },
    { param: "email", label: "Email", value: "", msg: "" },
    { param: "password", label: "Password", value: "", msg: "" },
  ])
  const {
    auth: { loading, errors, token },
  } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!loading && errors.length && !token) {
      setForm((prevForm) =>
        prevForm.map((field) => {
          let errorMsg = ""
          errors.forEach((error: IError) => {
            if (field.param === error.param) {
              errorMsg = error.msg
            }
          })
          if (errorMsg) {
            return { ...field, msg: errorMsg }
          }
          return field
        })
      )
    } else if (!loading && !errors.length && token) {
      navigation.navigate("Home")
    }
  }, [errors, loading, token])

  const handleChangeField = (value: string, param: string) => {
    setForm((prevForm) =>
      prevForm.map((field) => {
        if (field.param === param) {
          return { ...field, value, msg: "" }
        }
        return field
      })
    )
  }

  const toggleFlipForm = () => {
    setFlipLogin((prevFlip) => !prevFlip)
  }

  const handleSubmitForm = () => {
    const [username, email, password] = form
    const loginValues = { email: email.value, password: password.value }
    const registerValues = { ...loginValues, username: username.value }

    dispatch(fetchAuth(flipLogin, flipLogin ? loginValues : registerValues))
  }

  return (
    <View style={styles.wrapper}>
      <View
        style={{
          paddingVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 15,
        }}
      >
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
            <View key={field.param}>
              <TextInput
                style={[
                  styles.field,
                  flipLogin &&
                    field.param === "username" &&
                    styles.field_closed,
                ]}
                label={field.label}
                mode='outlined'
                value={field.value}
                onChangeText={(text) => handleChangeField(text, field.param)}
              />
              <Text
                style={{
                  color: "red",
                }}
              >
                {field.msg}
              </Text>
            </View>
          )
        })}
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 15,
        }}
      >
        <Button
          primary
          title={flipLogin ? "Sign In" : "Sign Up"}
          press={handleSubmitForm}
          iconName={flipLogin ? "login-variant" : "checkbox-marked-outline"}
        />
        <Button
          simple
          title={flipLogin ? "Sign Up" : "Sign In"}
          press={toggleFlipForm}
          iconName={flipLogin ? "checkbox-marked-outline" : "login-variant"}
        />
      </View>
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
})

export default Auth
