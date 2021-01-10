import {
  DispatchActionsFetch,
  FETCH_START_AUTH,
  FETCH_SUCCESS_AUTH,
  FETCH_ERROR_AUTH,
} from "../types/auth"
import { Dispatch } from "redux"
import axios from "axios"

interface ICredentials {
  username?: string
  email: string
  password: string
}

export const fetchAuth = (
  isLogin: boolean,
  credentials: ICredentials
) => async (dispatch: Dispatch<DispatchActionsFetch>) => {
  try {
    dispatch({ type: FETCH_START_AUTH })
    console.log({ credentials })
    const auth = await axios.post(
      `http://192.168.1.3:4000/auth/${isLogin ? "login" : "register"}`,
      { ...credentials }
    )
    console.log({ auth })

    dispatch({ type: FETCH_SUCCESS_AUTH, payload: auth.data })
  } catch (error) {
    dispatch({
      type: FETCH_ERROR_AUTH,
      payload: error.response.data.errors ? error.response.data.errors : [],
    })
  }
}
