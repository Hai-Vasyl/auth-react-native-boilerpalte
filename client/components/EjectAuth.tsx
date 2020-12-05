import React, { useEffect, useState } from "react"
import Routes from "./Routes"
import { SET_AUTH } from "../redux/types/auth"
import { useDispatch } from "react-redux"
import { View, Text } from "react-native"

const EjectAuth: React.FC = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch({ type: SET_AUTH })
    setLoading(false)
  }, [dispatch])

  if (loading) {
    return (
      <View>
        <Text>LOADING ...</Text>
      </View>
    )
  }
  return <Routes />
}

export default EjectAuth
