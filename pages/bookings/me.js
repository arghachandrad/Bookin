import { getSession } from "next-auth/client"
import MyBookings from "../../components/booking/MyBookings"
import MainLayout from "../../layout/MainLayout"

const Me = () => {
  return (
    <MainLayout title="Bookings | Bookin" description="my all bookings">
      <MyBookings />
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

export default Me
