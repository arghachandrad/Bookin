import Home from "../components/Home"
import MainLayout from "../layout/MainLayout"
import { wrapper } from "../redux/store"
import { getRooms } from "../redux/actions/room"

function HomePage() {
  return (
    <MainLayout
      title="Bookin"
      description="Best hotels available at cheapest price"
    >
      <Home />
    </MainLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      await store.dispatch(
        getRooms(query.page, query.location, query.guests, query.category)
      )
    }
)

export default HomePage
