import { toast } from "react-toastify"
import { CallWithAuth, CallWithOutAuth } from "../../utils/apiActions"

import {
  ALL_ROOMS_FAIL,
  ALL_ROOMS_SUCCESS,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
  CLEAR_ERRORS,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  CHECK_REVIEW_AVAILABILITY_REQUEST,
  CHECK_REVIEW_AVAILABILITY_SUCCESS,
  CHECK_REVIEW_AVAILABILITY_FAIL,
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

// Check is available for posting reviews
export const checkReviewAvailability = (id) => async (dispatch) => {
  dispatch({ type: CHECK_REVIEW_AVAILABILITY_REQUEST })
  const { status, data } = await CallWithOutAuth(
    "GET",
    `/reviews/check_review_availability?roomId=${id}`,
    {}
  )
  console.log(data)
  if (status) {
    dispatch({
      type: CHECK_REVIEW_AVAILABILITY_SUCCESS,
      payload: data.isReviewAvailable,
    })
  } else {
    dispatch({ type: CHECK_REVIEW_AVAILABILITY_FAIL, payload: data })
  }
}

// Create new review
export const createNewReview = (formData) => async (dispatch) => {
  dispatch({ type: NEW_REVIEW_REQUEST })
  const { status, data } = await CallWithOutAuth("PUT", `/reviews`, formData)
  if (status) {
    toast.success("Review added successfully")
    dispatch({ type: NEW_REVIEW_SUCCESS })
    dispatch(getRoomDetails(formData.roomId))
  } else {
    toast.error(data)
    dispatch({ type: NEW_REVIEW_FAIL, payload: data })
  }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS })
}
