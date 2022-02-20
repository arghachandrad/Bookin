import {
  CHECK_BOOKING_AVAILABILITY_REQUEST,
  CHECK_BOOKING_AVAILABILITY_SUCCESS,
  CHECK_BOOKING_AVAILABILITY_FAIL,
} from "../constants/booking"

const initialState = {
  isBookingAvailable: null,
  loading: false,
  success: false,
}

// All Rooms Reducer
export const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_BOOKING_AVAILABILITY_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CHECK_BOOKING_AVAILABILITY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        isBookingAvailable: action.payload.isAvailable,
      }
    case CHECK_BOOKING_AVAILABILITY_FAIL:
      console.log(action.payload)
      return {
        ...state,
        loading: false,
        success: false,
      }

    default:
      return state
  }
}
