import { toast } from "react-toastify"
import { clearErrors } from "../redux/actions/room"
import { makeStore } from "../redux/store"

const showAndClearError = (message) => {
  toast.error(message)
  makeStore().dispatch(clearErrors())
}

export default showAndClearError
