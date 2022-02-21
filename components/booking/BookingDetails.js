import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBookingDetails } from "../../redux/actions/booking"

const BookingDetails = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { bookingDetails } = useSelector((state) => state.booking)
  useEffect(() => {
    dispatch(getBookingDetails(router.query.id))
  }, [dispatch, router.query.id])
  return (
    <>
      {bookingDetails && bookingDetails.user && (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h4" color="secondar.dark">
                  Booking #{bookingDetails._id}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box>
                  <Typography variant="h5" color="secondar.dark">
                    User Info
                  </Typography>
                </Box>
                <Box>
                  <p>
                    <b>Name:</b> {bookingDetails.user.name}
                  </p>
                  <p>
                    <b>Email:</b> {bookingDetails.user.email}
                  </p>
                  <p>
                    <b>Amount:</b> {bookingDetails.amountPaid}
                  </p>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box>
                  <Typography variant="h5" color="secondar.dark">
                    Booking Info
                  </Typography>
                </Box>
                <Box>
                  <p>
                    <b>CheckIn:</b>{" "}
                    {new Date(bookingDetails.checkInDate).toLocaleString(
                      "en-US"
                    )}
                  </p>
                  <p>
                    <b>CheckOut:</b>{" "}
                    {new Date(bookingDetails.checkOutDate).toLocaleString(
                      "en-US"
                    )}
                  </p>
                  <p>
                    <b>Days of Stay:</b> {bookingDetails.daysOfStay}
                  </p>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box>
                  <Typography variant="h5" color="secondar.dark">
                    Payment Status
                  </Typography>
                  <Typography variant="body1" sx={{ color: "green" }}>
                    Paid
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h5" color="secondar.dark">
                  Booked Room
                </Typography>
                <Card sx={{ display: "flex", mt: 2 }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={bookingDetails.room.images[0].url}
                    alt={bookingDetails.room.name}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h5">
                        {bookingDetails.room.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        ${bookingDetails.room.pricePerNight} / night
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        {bookingDetails.daysOfStay} days
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
    </>
  )
}

export default BookingDetails
