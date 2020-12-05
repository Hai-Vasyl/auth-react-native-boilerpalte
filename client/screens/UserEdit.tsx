import React, { useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { TextInput } from "react-native-paper"
import stylesField from "../styles/field"
// @ts-ignore
import Icon from "react-native-vector-icons/FontAwesome5"
import Button from "../components/Button"

const UserEdit: React.FC = () => {
  const [form, setForm] = useState([
    { param: "username", label: "Username", value: "", msg: "" },
    { param: "email", label: "Email", value: "", msg: "" },
    { param: "ava", label: "Avatar", value: "", msg: "" },
    { param: "firstname", label: "Firstname", value: "", msg: "" },
    { param: "lastname", label: "Lastname", value: "", msg: "" },
    { param: "phone", label: "Phone", value: "", msg: "" },
    { param: "address", label: "Address", value: "", msg: "" },
    { param: "bio", label: "Bio", value: "", msg: "" },
    { param: "birth", label: "Birth", value: "", msg: "" },
  ])

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

  const handleCanceForm = () => {
    console.log("Cancel form!")
  }

  const handleSubmitForm = () => {
    console.log("Submit form!")
  }

  const fields = form.map((field) => {
    return (
      <View key={field.param}>
        <TextInput
          style={[stylesField.field]}
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
  })

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
        <Icon name='user-cog' size={33} color='#9ca2b0' />
        <Text style={{ fontSize: 30, marginLeft: 5 }}>Edit info</Text>
      </View>
      <ScrollView>{fields}</ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 15,
        }}
      >
        <Button primary title='Apply' press={handleSubmitForm} />
        <Button simple title='Cancel' press={handleCanceForm} />
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
})

export default UserEdit
