import {
  ALL_ROOMS_FAIL,
  ALL_ROOMS_SUCCESS,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
  CLEAR_ERRORS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
} from "../constants/room"

const initialState = {
  rooms: [],
  room: {},
  error: "",
  roomsCount: null,
  resPerPage: null,
  filteredRoomsCount: null,
  loading: false,
  success: false,
}

// All Rooms Reducer
export const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_ROOMS_SUCCESS:
      const { rooms, roomsCount, resPerPage, filteredRoomsCount } =
        action.payload
      return {
        ...state,
        rooms,
        roomsCount,
        resPerPage,
        filteredRoomsCount,
      }
    case ALL_ROOMS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case ROOM_DETAILS_SUCCESS:
      return {
        ...state,
        room: action.payload,
      }
    case ROOM_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case NEW_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      }
    case NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: "",
      }

    default:
      return state
  }
}
