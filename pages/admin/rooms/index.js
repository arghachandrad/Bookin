import { getSession } from "next-auth/client"
import AllRooms from "../../../components/admin/AllRooms"
import MainLayout from "../../../layout/MainLayout"

const Rooms = () => {
  return (
    <MainLayout title="All Rooms | Bookin" description="my all bookings">
      <AllRooms />
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
