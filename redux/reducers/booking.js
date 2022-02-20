import {
  CHECK_BOOKING_AVAILABILITY_REQUEST,
  CHECK_BOOKING_AVAILABILITY_SUCCESS,
  CHECK_BOOKING_AVAILABILITY_FAIL,
  GET_BOOKED_DATES_SUCCESS,
  GET_BOOKED_DATES_FAIL,
} from "../constants/booking"

const initialState = {
  isBookingAvailable: null,
  loading: false,
  success: false,
  bookedDates: [],
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
    case GET_BOOKED_DATES_SUCCESS:
      return {
        ...state,
        success: true,
        bookedDates: action.payload.bookedDates,
      }
    case GET_BOOKED_DATES_FAIL:
      return {
        ...state,
        success: false,
      }

    default:
      return state
  }
}
