import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native"
import { TextInput } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { fetchAuth } from "../redux/actions/auth"
import { useSelector, useDispatch } from "react-redux"
import { RootStore } from "../redux/store"

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
    if (!loading && errors.length) {
      setForm((prevForm) =>
        prevForm.map((field) => {
          let errorMsg = ""
          errors.forEach((error) => {
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
    } else if (!loading && !errors.length) {
      navigation.navigate("About")
    }
  }, [errors])

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

  console.log({ loading, errors, token })
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
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.btn, styles.btn_primary]}
            onPress={handleSubmitForm}
          >
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
            onPress={toggleFlipForm}
          >
            <Icon
              name={flipLogin ? "checkbox-marked-outline" : "login-variant"}
              size={20}
              color='#9ca2b0'
            />
            <Text style={[styles.btn__title]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
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

export default Auth
