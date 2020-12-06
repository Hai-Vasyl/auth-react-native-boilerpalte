import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./rootReducer"

const store = createStore(rootReducer, applyMiddleware(thunk))
export type RootStore = ReturnType<typeof rootReducer>

export default store
