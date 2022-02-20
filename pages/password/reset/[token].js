import { getSession } from "next-auth/client"
import ForgotPassword from "../../../components/user/ForgotPassword"
import NewPassword from "../../../components/user/NewPassword"
import NonAuthLayout from "../../../layout/NonAuthLayout"

const Reset = () => {
  return (
    <NonAuthLayout
      title="Reset Password | Bookin"
      description="Reset your password"
    >
      <NewPassword />
    </NonAuthLayout>
  )
}

export default Reset
