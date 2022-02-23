import {
  ALL_ROOMS_FAIL,
  ALL_ROOMS_SUCCESS,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
  CLEAR_ERRORS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  CHECK_REVIEW_AVAILABILITY_REQUEST,
  CHECK_REVIEW_AVAILABILITY_SUCCESS,
  CHECK_REVIEW_AVAILABILITY_FAIL,
  ADMIN_ROOMS_REQUEST,
  ADMIN_ROOMS_SUCCESS,
  ADMIN_ROOMS_FAIL,
  CREATE_NEW_ROOM_REQUEST,
  CREATE_NEW_ROOM_SUCCESS,
  CREATE_NEW_ROOM_FAIL,
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
  isReviewAvailable: false, //cannot create a review(if not booked the room)
  adminAllRooms: [],
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
    case CHECK_REVIEW_AVAILABILITY_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CHECK_REVIEW_AVAILABILITY_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        loading: false,
        success: true,
        isReviewAvailable: action.payload,
      }
    case CHECK_REVIEW_AVAILABILITY_FAIL:
      return {
        ...state,
        loading: false,
      }

    case ADMIN_ROOMS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ADMIN_ROOMS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        adminAllRooms: action.payload,
      }
    case ADMIN_ROOMS_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
      }

    case CREATE_NEW_ROOM_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CREATE_NEW_ROOM_SUCCESS:
      console.log("create room reducer: ", action.payload)
      const room = action.payload
      const newAdminAllRooms = [...state.adminAllRooms, room]
      return {
        ...state,
        loading: false,
        success: true,
        adminAllRooms: newAdminAllRooms,
      }
    case CREATE_NEW_ROOM_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
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
