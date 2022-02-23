import { toast } from "react-toastify"
import { CallWithAuth, CallWithOutAuth } from "../../utils/apiActions"

import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  LOAD_USER_FAIL,
  CLEAR_ERRORS,
  CLEAR_SUCCESS,
} from "../constants/auth"

// Get room details
export const registerUser = (userData) => async (dispatch) => {
  // set Loading to true
  dispatch({ type: REGISTER_USER_REQUEST })

  const { status, data } = await CallWithOutAuth(
    "POST",
    `/auth/register`,
    userData
  )
  if (status) {
    toast.success("User registered successfully")
    window.location.href = "/login"
    dispatch({ type: REGISTER_USER_SUCCESS })
  } else {
    toast.success(data)
    dispatch({ type: REGISTER_USER_FAIL, payload: data })
  }
}

// Load user
// NOTE: no need to send authToken for this protected api , because next-auth provide us HTTPONLY cookie, which is automatically send via req header(and we are doing auth check on backend)
export const loadUser = () => async (dispatch) => {
  // set Loading to true
  dispatch({ type: LOAD_USER_REQUEST })

  const { status, data } = await CallWithOutAuth("GET", `/me`, {})
  if (status) {
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user })
  } else {
    dispatch({ type: LOAD_USER_FAIL, payload: data })
  }
}

// Update User Profile
export const updateProfile = (formData) => async (dispatch) => {
  // set Loading to true
  dispatch({ type: UPDATE_PROFILE_REQUEST })

  const { status, data } = await CallWithOutAuth("PUT", `/me/update`, formData)
  if (status) {
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data })
  } else {
    dispatch({ type: UPDATE_PROFILE_FAIL, payload: data })
  }
}

// Forgot Password
export const forgotPassword = (formData) => async (dispatch) => {
  // set Loading to true
  dispatch({ type: FORGOT_PASSWORD_REQUEST })

  const { status, data } = await CallWithOutAuth(
    "POST",
    `/password/forgot`,
    formData
  )
  if (status) {
    toast.success("reset email sent successfully")
    dispatch({ type: FORGOT_PASSWORD_SUCCESS })
  } else {
    toast.error(data)
    dispatch({ type: FORGOT_PASSWORD_FAIL, payload: data })
  }
}

// Reset Password
export const resetPassword = (token, formData) => async (dispatch) => {
  // set Loading to true
  dispatch({ type: RESET_PASSWORD_REQUEST })

  const { status, data } = await CallWithOutAuth(
    "PUT",
    `/password/reset/${token}`,
    formData
  )
  if (status) {
    toast.success("Password reset successfully")
    dispatch({ type: RESET_PASSWORD_SUCCESS })
  } else {
    toast.error(data)
    dispatch({ type: RESET_PASSWORD_FAIL, payload: data })
  }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS })
}

// Clear Success
export const clearSuccess = () => async (dispatch) => {
  dispatch({ type: CLEAR_SUCCESS })
}
