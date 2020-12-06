import React from "react"
import Home from "../screens/Home"
import User from "../screens/User"
import UserEdit from "../screens/UserEdit"
import Users from "../screens/Users"
import Auth from "../screens/Auth"
import { useSelector } from "react-redux"
import { RootStore } from "../redux/store"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

interface IRoute {
  name: string
  component: React.FC<any>
}

const Stack = createStackNavigator()

const Routes: React.FC = () => {
  const {
    auth: { user, token },
  } = useSelector((state: RootStore) => state)

  const reduceMapRoutes = (routes: IRoute[]) => {
    return routes.map((route) => {
      return (
        <Stack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
        />
      )
    })
  }

  const mainRoutes: IRoute[] = [
    { name: "Home", component: Home },
    { name: "Users", component: Users },
    { name: "User", component: User },
  ]

  const userRoutes: IRoute[] = [
    ...mainRoutes,
    { name: "UserEdit", component: UserEdit },
  ]

  const unRegRoutes: IRoute[] = [
    ...mainRoutes,
    { name: "Auth", component: Auth },
  ]

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token ? (
          user.role === "admin" ? (
            <>{reduceMapRoutes(userRoutes)}</>
          ) : (
            <>{reduceMapRoutes(userRoutes)}</>
          )
        ) : (
          <>{reduceMapRoutes(unRegRoutes)}</>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
