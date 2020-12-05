import React from "react"
import { View, Text, Image } from "react-native"
import { IUser } from "../interfaces"
// @ts-ignore
import Icon from "react-native-vector-icons/MaterialIcons"

const User: React.FC<IUser> = ({ ava, username, email, role }) => {
  return (
    <View>
      <View>
        <Image
          source={{ uri: ava }}
          style={{
            width: 120,
            height: 120,
          }}
        />
        {role === "admin" && (
          <Icon
            name='verified-user'
            size={30}
            style={
              {
                // position: "absolute",
                // bottom: 10,
                // right: 10,
                // borderWidth: 1,
                // borderColor: "lightgrey",
                // width: 50,
                // height: 50,
                // borderRadius: 50 / 2,
                // textAlign: "center",
                // lineHeight: 50,
                // backgroundColor: "whitesmoke",
              }
            }
            color='#333'
          />
        )}
      </View>
      <View>
        <Text>{username}</Text>
      </View>
    </View>
  )
}

export default User
