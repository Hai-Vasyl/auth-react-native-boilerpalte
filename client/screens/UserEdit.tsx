import React, { useState } from "react"
import { View, Text, ScrollView } from "react-native"
import { TextInput } from "react-native-paper"
import stylesField from "../styles/field"
// @ts-ignore
import Icon from "react-native-vector-icons/FontAwesome5"
import Button from "../components/Button"
import { useSelector, useDispatch } from "react-redux"
import { RootStore } from "../redux/store"
import { UPDATE_AUTH } from "../redux/types/auth"
import axios from "axios"
import stylesAuth from "../styles/auth"

interface IUserEditProps {
  navigation: any
}

const UserEdit: React.FC<IUserEditProps> = ({ navigation }) => {
  const {
    auth: { user, token },
  } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()

  const [form, setForm] = useState([
    { param: "username", label: "Username", value: user.username, msg: "" },
    { param: "email", label: "Email", value: user.email, msg: "" },
    { param: "ava", label: "Avatar", value: user.ava, msg: "" },
    {
      param: "firstname",
      label: "Firstname",
      value: user.firstname ? user.firstname : "",
      msg: "",
    },
    {
      param: "lastname",
      label: "Lastname",
      value: user.lastname ? user.lastname : "",
      msg: "",
    },
    {
      param: "phone",
      label: "Phone",
      value: user.phone ? user.phone : "",
      msg: "",
    },
    {
      param: "address",
      label: "Address",
      value: user.address ? user.address : "",
      msg: "",
    },
    { param: "bio", label: "Bio", value: user.bio ? user.bio : "", msg: "" },
    {
      param: "birth",
      label: "Birth",
      value: user.birth ? user.birth : "",
      msg: "",
    },
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

  const handleSubmitForm = async () => {
    try {
      const [
        username,
        email,
        ava,
        firstname,
        lastname,
        phone,
        address,
        bio,
        birth,
      ] = form
      const res = await axios.post(
        "http://192.168.1.2:4000/auth/user-update",
        {
          username: username.value,
          email: email.value,
          ava: ava.value,
          firstname: firstname.value,
          lastname: lastname.value,
          phone: phone.value,
          address: address.value,
          bio: bio.value,
          birth: birth.value,
        },
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      )

      dispatch({ type: UPDATE_AUTH, payload: { user: res.data, token } })
      navigation.navigate("User", { userId: user._id })
    } catch (error) {}
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
    <View style={stylesAuth.wrapper}>
      <View style={stylesAuth.title}>
        <Icon name='user-cog' size={33} color='#9ca2b0' />
        <Text style={stylesAuth.titleText}>Edit info</Text>
      </View>
      <ScrollView>{fields}</ScrollView>
      <View style={stylesAuth.btns}>
        <Button primary title='Apply' press={handleSubmitForm} />
        <Button
          simple
          title='Cancel'
          press={() =>
            navigation.navigate("User", {
              userId: user._id,
            })
          }
        />
      </View>
    </View>
  )
}

export default UserEdit
