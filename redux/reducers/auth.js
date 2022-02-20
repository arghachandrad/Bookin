import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  CLEAR_ERRORS,
  CLEAR_SUCCESS,
} from "../constants/auth"

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  success: false,
  error: "",
}

// auth Reducer
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      }
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      }
    case LOAD_USER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        isAuthenticated: true,
        user: action.payload,
      }
    case LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      }
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      }
    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      }
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      }
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      }
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        user: action.payload.user,
      }
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: "",
      }

    case CLEAR_SUCCESS:
      return {
        ...state,
        success: false,
      }

    default:
      return state
  }
}
