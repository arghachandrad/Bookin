import { getSession } from "next-auth/client"
import ForgotPassword from "../../components/user/ForgotPassword"
import NonAuthLayout from "../../layout/NonAuthLayout"

const Forgot = () => {
  return (
    <NonAuthLayout
      title="Forgot Password | Bookin"
      description="Reset your password"
    >
      <ForgotPassword />
    </NonAuthLayout>
  )
}

export default Forgot
