import { useDispatch, useSelector } from "react-redux"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Alert from "@mui/material/Alert"
import Typography from "@mui/material/Typography"
import RoomItem from "./room/RoomItem"
import { useEffect, useState } from "react"
import showAndClearErrors from "../utils/showAndClearError"
import Pagination from "@mui/material/Pagination"
import Search from "./Search"
import { useRouter } from "next/router"

const Home = () => {
  const { rooms, error, roomsCount, resPerPage, filteredRoomsCount } =
    useSelector((state) => state.room)

  const router = useRouter()
  let { page = 1, location = "" } = router.query
  page = Number(page)

  const handleChange = (event, value) => {
    if (location || router.query.guests || router.query.category) {
      router.push(
        `/?page=${value}
        ${router.query.location ? `&location=${router.query.location}` : ""}${
          router.query.guests ? `&guests=${router.query.guests}` : ""
        }
        ${router.query.category ? `&category=${router.query.category}` : ""}
        `
      )
    } else {
      router.push(`/?page=${value}`)
    }
  }

  useEffect(() => {
    if (error) {
      showAndClearErrors(error)
    }
  }, [error])

  if (!rooms || rooms.length === 0) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="info">No Rooms Available</Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl">
      <Box mt={4}>
        <Box>
          <Search />
        </Box>
        <Typography color="secondary.dark" variant="h4">
          All Rooms
        </Typography>
        <Grid container spacing={5} sx={{ mt: 1 }}>
          {rooms &&
            rooms.map((room) => (
              <Grid key={room._id} item xs={12} sm={6} md={4} lg={3}>
                <RoomItem room={room} />
              </Grid>
            ))}
        </Grid>
      </Box>
      {resPerPage < filteredRoomsCount && (
        <Box mt={3} display="flex" justifyContent="center" alignItems="center">
          <Pagination
            count={Math.ceil(filteredRoomsCount / resPerPage)}
            page={page}
            onChange={handleChange}
            color="primary"
          />
        </Box>
      )}
    </Container>
  )
}

export default Home
