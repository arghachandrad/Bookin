import { CallWithAuth, CallWithOutAuth } from "../../utils/apiActions"

import {
  ALL_ROOMS_FAIL,
  ALL_ROOMS_SUCCESS,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/room"

// Get all rooms
export const getRooms =
  (currentPageNumber = 1, location = "", guests, category) =>
  async (dispatch) => {
    let link = `/rooms?page=${currentPageNumber}&location=${location}`
    if (guests) link += `&guestCapacity=${guests}`
    if (category) link += `&category=${category}`

    const { status, data } = await CallWithOutAuth("GET", link, {})
    if (status) {
      dispatch({ type: ALL_ROOMS_SUCCESS, payload: data })
    } else {
      dispatch({ type: ALL_ROOMS_FAIL, payload: data })
    }
  }

// Get room details
export const getRoomDetails = (id) => async (dispatch) => {
  const { status, data } = await CallWithOutAuth("GET", `/rooms/${id}`, {})
  if (status) {
    dispatch({ type: ROOM_DETAILS_SUCCESS, payload: data.room })
  } else {
    dispatch({ type: ROOM_DETAILS_FAIL, payload: data })
  }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS })
}
