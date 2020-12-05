import React, { useState, useEffect } from "react"
import { View, Text } from "react-native"
import axios from "axios"
import { IUser } from "../interfaces"
import User from "../components/User"

const Users: React.FC = () => {
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

  console.log("All USERS: ", users)
  if (initLoad) {
    return (
      <View>
        <Text>Loading ...</Text>
      </View>
    )
  }
  return (
    <View>
      {users.map((user) => {
        return <User key={user.email} {...user} />
      })}
    </View>
  )
}

export default Users
