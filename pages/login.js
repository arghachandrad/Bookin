import { getSession } from "next-auth/client"
import Login from "../components/auth/Login"
import MainLayout from "../layout/MainLayout"

const LoginPage = () => {
  return (
    <MainLayout title="Login | Bookin" description="login to your account">
      <Login />
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })
  console.log(session)
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

export default LoginPage
