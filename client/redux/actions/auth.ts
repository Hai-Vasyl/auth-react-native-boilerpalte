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
    const auth = await axios.post(
      `http://192.168.1.2:4000/auth/${isLogin ? "login" : "register"}`,
      { ...credentials }
    )

    dispatch({ type: FETCH_SUCCESS_AUTH, payload: auth.data })
  } catch (error) {
    console.log({ error123: error.response.data.errors })
    dispatch({
      type: FETCH_ERROR_AUTH,
      payload: error.response.data.errors ? error.response.data.errors : [],
    })
  }
}
