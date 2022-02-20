import { combineReducers } from "redux"
import { authReducer } from "./auth"
import { bookingReducer } from "./booking"
import { roomReducer } from "./room"

const reducer = combineReducers({
  auth: authReducer,
  room: roomReducer,
  booking: bookingReducer,
})

export default reducer
