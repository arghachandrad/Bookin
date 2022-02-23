import { getSession } from "next-auth/client"
import NewRoom from "../../../components/admin/NewRoom"
import MainLayout from "../../../layout/MainLayout"

const Rooms = () => {
  return (
    <MainLayout title="Create Room | Bookin" description="create room">
      <NewRoom />
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  if (!session || session.user.role !== "admin") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default Rooms
