import React, { useState, useEffect } from "react"
import { View, Text, Image, ScrollView } from "react-native"
import { useSelector } from "react-redux"
import { RootStore } from "../redux/store"
import moment from "moment"
import Icon from "react-native-vector-icons/MaterialIcons"
import TabButton from "../components/TabButton"
import axios from "axios"
import styles from "../styles/user"

export interface IUserProps {
  navigation: any
  route: any
}

const User: React.FC<IUserProps> = ({ route, navigation }) => {
  const { userId } = route.params
  const {
    auth: { user, token },
  } = useSelector((state: RootStore) => state)
  const [exUserData, setExUserData] = useState({
    ava: user && user.ava ? user.ava : "",
    role: user && user.role ? user.role : "",
  })
  const [userData, setUserData] = useState([
    {
      param: "username",
      title: "Username",
      value: user && user.username ? user.username : "",
    },
    {
      param: "email",
      title: "Email",
      value: user && user.email ? user.email : "",
    },
    {
      param: "firstname",
      title: "Firstname",
      value: user && user.firstname ? user.firstname : "",
    },
    {
      param: "lastname",
      title: "Lastname",
      value: user && user.lastname ? user.lastname : "",
    },
    {
      param: "phone",
      title: "Phone",
      value: user && user.phone ? user.phone : "",
    },
    {
      param: "address",
      title: "Address",
      value: user && user.address ? user.address : "",
    },
    { param: "bio", title: "Bio", value: user && user.bio ? user.bio : "" },
    {
      param: "birth",
      title: "Birth",
      value: user && user.birth ? user.birth : "",
    },
    {
      param: "date",
      title: "Last updated",
      value: user && user.date ? user.date : "",
    },
  ])
  const [initLoad, setInitLoad] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://192.168.1.2:4000/auth/user-info/${userId}`
      )

      const userInfo = res.data
      setExUserData({ ava: userInfo.ava, role: userInfo.role })
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
      setInitLoad(false)
    }

    if ((user && user._id !== userId) || !token) {
      fetchData()
    } else {
      setInitLoad(false)
    }
  }, [token, userId])

  if (initLoad) {
    return (
      <View>
        <Text>Loading ...</Text>
      </View>
    )
  }
  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <View style={styles.wrapperImg}>
        <Image source={{ uri: exUserData.ava }} style={styles.avatar} />
        {exUserData.role === "admin" && (
          <Icon
            name='verified-user'
            size={30}
            style={styles.userIcon}
            color='#333'
          />
        )}
      </View>
      <View style={styles.info}>
        {userData.map((item) => {
          if (item.param === "date") {
            return (
              <View key={item.param} style={styles.infoItem}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoTitle}>{item.title}:</Text>
                  <Text style={styles.infoContent}>
                    {moment(item.value).calendar()}
                  </Text>
                </View>
              </View>
            )
          }
          return (
            <View key={item.param}>
              <View style={styles.infoRow}>
                <Text style={styles.infoTitleDate}>{item.title}:</Text>
                <Text style={styles.infoContentDate}>
                  {item.value ? (
                    item.value
                  ) : (
                    <Text style={styles.infoTitle}>Empty</Text>
                  )}
                </Text>
              </View>
            </View>
          )
        })}
      </View>
      <View style={styles.btns}>
        <TabButton
          press={() => navigation.navigate("Users")}
          title='All users'
        />
        {token && userId === user._id && (
          <TabButton
            press={() => navigation.navigate("UserEdit")}
            title='Edit info'
          />
        )}
      </View>
    </ScrollView>
  )
}

export default User
