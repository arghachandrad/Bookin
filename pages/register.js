import { getSession } from "next-auth/client"
import Register from "../components/auth/Register"
import MainLayout from "../layout/MainLayout"

const RegisterPage = () => {
  return (
    <MainLayout title="Register | Bookin" description="register yourself">
      <Register />
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

export default RegisterPage
