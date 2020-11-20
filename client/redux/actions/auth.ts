import {
  DispatchActionsFetch,
  FETCH_START_AUTH,
  FETCH_SUCCESS_AUTH,
  FETCH_ERROR_AUTH,
  IAuthSuccess,
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
    const auth: IAuthSuccess = await axios.post(
      `/auth/${isLogin ? "login" : "register"}`,
      {
        params: credentials,
      }
    )
    dispatch({ type: FETCH_SUCCESS_AUTH, payload: auth })
  } catch (error) {
    dispatch({ type: FETCH_ERROR_AUTH, payload: error.message })
  }
}
