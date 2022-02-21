import { wrapper } from "../../redux/store"
import { getRoomDetails } from "../../redux/actions/room"
import RoomDetails from "../../components/room/RoomDetails"
import MainLayout from "../../layout/MainLayout"
import { getBookingDetails } from "../../redux/actions/booking"
import BookingDetails from "../../components/booking/BookingDetails"
import { getSession } from "next-auth/client"

function BookingDetailsPage() {
  return (
    <MainLayout title="Boking Details" description="Booking details">
      <BookingDetails />
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

export default BookingDetailsPage
