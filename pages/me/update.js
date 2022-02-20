import { getSession } from "next-auth/client"
import Profile from "../../components/user/Profile"
import MainLayout from "../../layout/MainLayout"

const UpdateProfilePage = () => {
  return (
    <MainLayout
      title="Update Profile | Bookin"
      description="Update your profile"
    >
      <Profile />
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}
export default UpdateProfilePage
