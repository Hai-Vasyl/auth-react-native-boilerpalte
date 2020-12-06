import React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import { IUser } from "../interfaces"
// @ts-ignore
import Icon from "react-native-vector-icons/MaterialIcons"
import styles from "../styles/userComponent"

interface IUserProps extends IUser {
  navigation: any
}

const User: React.FC<IUserProps> = ({
  navigation,
  _id,
  ava,
  username,
  email,
  role,
}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("User", {
            userId: _id,
          })
        }
        style={styles.imgLink}
      >
        <Image source={{ uri: ava }} style={styles.imgAvatar} />
        {role === "admin" && (
          <Icon
            name='verified-user'
            size={30}
            style={styles.iconUser}
            color='#333'
          />
        )}
      </TouchableOpacity>
      <View style={styles.info}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("User", {
              userId: _id,
            })
          }
        >
          <Text style={styles.infoUsername}>{username}</Text>
        </TouchableOpacity>
        <Text>
          email: <Text>{email}</Text>
        </Text>
      </View>
    </View>
  )
}

export default User
