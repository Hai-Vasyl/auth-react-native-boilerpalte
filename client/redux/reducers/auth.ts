import {
  FETCH_START_AUTH,
  FETCH_SUCCESS_AUTH,
  FETCH_ERROR_AUTH,
  IAuthSuccess,
  ActionsInterfaces,
  IError,
} from "../types/auth"

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
    default:
      return state
  }
}

export default authReducer
