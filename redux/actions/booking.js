import { CallWithAuth, CallWithOutAuth } from "../../utils/apiActions"

import {
  CHECK_BOOKING_AVAILABILITY_REQUEST,
  CHECK_BOOKING_AVAILABILITY_SUCCESS,
  CHECK_BOOKING_AVAILABILITY_FAIL,
  GET_BOOKED_DATES_SUCCESS,
  GET_BOOKED_DATES_FAIL,
} from "../constants/booking"

// Get all rooms
export const checkRoomBookingAvailability =
  (roomId, checkInDate, checkOutDate) => async (dispatch) => {
    let link = `/bookings/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`

    dispatch({ type: CHECK_BOOKING_AVAILABILITY_REQUEST })
    const { status, data } = await CallWithOutAuth("GET", link, {})
    if (status) {
      dispatch({ type: CHECK_BOOKING_AVAILABILITY_SUCCESS, payload: data })
    } else {
      dispatch({ type: CHECK_BOOKING_AVAILABILITY_FAIL, payload: data })
    }
  }

// Get booked dates
export const getBookedDates = (roomId) => async (dispatch) => {
  let link = `/bookings/bookedDates?roomId=${roomId}`

  const { status, data } = await CallWithOutAuth("GET", link, {})
  if (status) {
    dispatch({ type: GET_BOOKED_DATES_SUCCESS, payload: data })
  } else {
    dispatch({ type: GET_BOOKED_DATES_FAIL, payload: data })
  }
}
