import React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import { IUser } from "../interfaces"
// @ts-ignore
import Icon from "react-native-vector-icons/MaterialIcons"

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
    <View
      style={{
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "lightgrey",
        padding: 10,
        backgroundColor: "white",
        marginTop: 10,
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("User", {
            userId: _id,
          })
        }
        style={{
          borderWidth: 1,
          borderColor: "lightgrey",
          borderRadius: 100 / 2,
        }}
      >
        <Image
          source={{ uri: ava }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
          }}
        />
        {role === "admin" && (
          <Icon
            name='verified-user'
            size={30}
            style={{
              position: "absolute",
              bottom: 4,
              right: 4,
              borderWidth: 1,
              borderColor: "lightgrey",
              width: 30,
              height: 30,
              borderRadius: 30 / 2,
              textAlign: "center",
              lineHeight: 30,
              backgroundColor: "whitesmoke",
              fontSize: 20,
            }}
            color='#333'
          />
        )}
      </TouchableOpacity>
      <View
        style={{
          paddingLeft: 10,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("User", {
              userId: _id,
            })
          }
        >
          <Text
            style={{
              paddingVertical: 5,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {username}
          </Text>
        </TouchableOpacity>
        <Text>
          email: <Text>{email}</Text>
        </Text>
      </View>
    </View>
  )
}

export default User
