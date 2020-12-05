import React, { useState, useEffect } from "react"
import { View, Text, Image, ScrollView } from "react-native"
import { useSelector } from "react-redux"
import { RootStore } from "../redux/store"
import moment from "moment"
import Icon from "react-native-vector-icons/MaterialIcons"
import TabButton from "../components/TabButton"
import axios from "axios"

export interface IHomeProps {
  navigation: any
  route: any
}

const About: React.FC<IHomeProps> = ({ route, navigation }) => {
  const { userId } = route.params
  const {
    auth: { user, token },
  } = useSelector((state: RootStore) => state)
  const [userData, setUserData] = useState([
    {
      param: "username",
      title: "Username",
      value: user.username ? user.username : "",
    },
    { param: "email", title: "Email", value: user.email ? user.email : "" },
    {
      param: "firstname",
      title: "Firstname",
      value: user.firstname ? user.firstname : "",
    },
    {
      param: "lastname",
      title: "Lastname",
      value: user.lastname ? user.lastname : "",
    },
    { param: "phone", title: "Phone", value: user.phone ? user.phone : "" },
    {
      param: "address",
      title: "Address",
      value: user.address ? user.address : "",
    },
    { param: "bio", title: "Bio", value: user.bio ? user.bio : "" },
    { param: "birth", title: "Birth", value: user.birth ? user.birth : "" },
    { param: "date", title: "Last updated", value: user.date ? user.date : "" },
  ])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://192.168.1.2:4000/auth/user-info/${userId}`
        //  {
        // headers: token && {
        //   Authorization: `Basic ${token}`,
        // },
        // }
      )

      const userInfo = res.data
      setUserData((prevData) =>
        prevData.map((item) => {
          let newItem = item.value
          Object.keys(userInfo).map((resItem) => {
            if (item.param === resItem) {
              newItem = userInfo[resItem]
            }
          })
          return { ...item, value: newItem }
        })
      )
      console.log("User info", res.data)
    }

    if (user._id !== userId) {
      fetchData()
    }
  }, [token, userId])

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <View
        style={{
          position: "relative",
          marginVertical: 20,
        }}
      >
        <Image
          source={{ uri: user.ava }}
          style={{
            width: 200,
            height: 200,
            borderRadius: 200 / 2,
            borderWidth: 1,
            borderColor: "lightgrey",
            padding: 5,
          }}
        />
        <Icon
          name='verified-user'
          size={30}
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            borderWidth: 1,
            borderColor: "lightgrey",
            width: 50,
            height: 50,
            borderRadius: 50 / 2,
            textAlign: "center",
            lineHeight: 50,
            backgroundColor: "whitesmoke",
          }}
          color='#333'
        />
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderColor: "lightgrey",
          paddingTop: 15,
        }}
      >
        {userData.map((item) => {
          if (item.param === "date") {
            return (
              <View
                key={item.param}
                style={{
                  borderTopWidth: 1,
                  borderColor: "lightgrey",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "grey",
                  }}
                >
                  {item.title}:
                  <Text
                    style={{
                      color: "#333",
                      fontWeight: "bold",
                    }}
                  >
                    {moment(item.value).calendar()}
                  </Text>
                </Text>
              </View>
            )
          }
          return (
            <View key={item.param}>
              <Text
                style={{
                  fontSize: 17,
                  color: "grey",
                }}
              >
                {item.title}:
                <Text
                  style={{
                    color: "#333",
                    fontWeight: "bold",
                  }}
                >
                  {item.value ? item.value : <Text>Empty</Text>}
                </Text>
              </Text>
            </View>
          )
        })}
      </View>
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
        }}
      >
        <TabButton
          press={() => navigation.navigate("Users")}
          title='All users'
        />
        <TabButton
          press={() => navigation.navigate("UserEdit")}
          title='Edit info'
        />
      </View>
    </ScrollView>
  )
}

export default About
