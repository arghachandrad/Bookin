import {
  ALL_ROOMS_FAIL,
  ALL_ROOMS_SUCCESS,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/room"

const initialState = {
  rooms: [],
  room: {},
  error: "",
  roomsCount: null,
  resPerPage: null,
  filteredRoomsCount: null,
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

    case CLEAR_ERRORS:
      return {
        ...state,
        error: "",
      }

    default:
      return state
  }
}
