import {
  FETCH_START_AUTH,
  FETCH_SUCCESS_AUTH,
  FETCH_ERROR_AUTH,
  SET_AUTH,
  IAuthSuccess,
  ActionsInterfaces,
  IError,
} from "../types/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface IInitState extends IAuthSuccess {
  loading: boolean
  errors: IError[]
}

const initState: IInitState = {
  loading: false,
  errors: [],
  token: "",
  user: {
    ava: "",
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
    bio: "",
    birth: "",
    role: "",
    _id: "",
    username: "",
    email: "",
    password: "",
    date: "",
  },
}

const authReducer = (
  state: IInitState = initState,
  action: ActionsInterfaces
): IInitState => {
  switch (action.type) {
    case FETCH_START_AUTH:
      return {
        ...state,
        loading: true,
        errors: [],
      }
    case FETCH_SUCCESS_AUTH:
      ;(async () => {
        try {
          await AsyncStorage.setItem("auth", JSON.stringify(action.payload))
        } catch (error) {}
      })()
      const { token: tokenSuccess, user: userSuccess } = action.payload

      return {
        ...state,
        loading: false,
        errors: [],
        token: tokenSuccess,
        user: userSuccess,
      }
    case FETCH_ERROR_AUTH:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      }
    case SET_AUTH:
      let authData
      ;(async () => {
        try {
          authData = await AsyncStorage.getItem("auth")
        } catch (error) {}
      })()
      const { token, user } = JSON.parse(authData || "{}")
      console.log({ token, user })

      return {
        ...state,
        user,
        token,
      }
    default:
      return state
  }
}

export default authReducer
