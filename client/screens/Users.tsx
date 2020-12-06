import React, { useState, useEffect } from "react"
import { View, Text, FlatList } from "react-native"
import axios from "axios"
import { IUser } from "../interfaces"
import User from "../components/User"

interface IUserProps {
  navigation: any
}

const Users: React.FC<IUserProps> = ({ navigation }) => {
  const [users, setUser] = useState<IUser[]>([])
  const [initLoad, setInitLoad] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://192.168.1.2:4000/auth/users")

        setUser(res.data)
        setInitLoad(false)
      } catch (error) {}
    }

    fetchData()
  }, [])

  if (initLoad) {
    return (
      <View>
        <Text>Loading ...</Text>
      </View>
    )
  }

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => <User navigation={navigation} {...item} />}
        keyExtractor={(user) => user._id}
      />
    </View>
  )
}

export default Users
