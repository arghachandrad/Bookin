import { wrapper } from "../../redux/store"
import { getRoomDetails } from "../../redux/actions/room"
import RoomDetails from "../../components/room/RoomDetails"
import MainLayout from "../../layout/MainLayout"

function RoomDetailsPage() {
  return (
    <MainLayout title="Room Details" description="Room details">
      <RoomDetails />
    </MainLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    await store.dispatch(getRoomDetails(context.params.id))
  }
)

export default RoomDetailsPage
