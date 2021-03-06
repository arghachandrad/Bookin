import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Container from "@mui/material/Container"
import Rating from "@mui/material/Rating"
import Button from "@mui/material/Button"
import LoadingButton from "@mui/lab/LoadingButton"
import Box from "@mui/material/Box"
import Alert from "@mui/material/Alert"
import Head from "next/head"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import showAndClearError from "../../utils/showAndClearError"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"
import Image from "next/image"
import RoomFeatures from "./RoomFeatures"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useRouter } from "next/router"
import { CallWithOutAuth } from "../../utils/apiActions"
import {
  checkRoomBookingAvailability,
  getBookedDates,
} from "../../redux/actions/booking"
import getStripe from "../../utils/getStripe"
import axios from "axios"
import { toast } from "react-toastify"
import NewReview from "../review/NewReview"
import ReviewList from "../review/ReviewList"

const RoomDetails = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { room, error } = useSelector((state) => state.room)
  const { user } = useSelector((state) => state.auth)
  const { isBookingAvailable, loading, bookedDates } = useSelector(
    (state) => state.booking
  )
  const [checkInDate, setCheckInDate] = useState()
  const [checkOutDate, setCheckOutDate] = useState()
  const [daysOfStay, setDaysOfStay] = useState()
  const [paymentLoading, setPaymentLoading] = useState(false)

  const excludedDates = bookedDates.map((date) => new Date(date))

  useEffect(() => {
    if (error) {
      // if received error in getserversideprops
      showAndClearError(error)
    }
  }, [error])

  useEffect(() => {
    dispatch(getBookedDates(router.query.id))
  }, [dispatch, router.query.id])

  const handleDateChange = (dates) => {
    const [start, end] = dates
    console.log(start, end)
    setCheckInDate(start)
    setCheckOutDate(end)

    // calculate days of stay
    const days = Math.floor((new Date(end) - new Date(start)) / 86400000 + 1)

    setDaysOfStay(days)

    // check Room Booking
    if (start && end) {
      dispatch(
        checkRoomBookingAvailability(
          router.query.id,
          start.toISOString(),
          end.toISOString()
        )
      )
    }
  }

  // this code will be removed once we intergrate payment system(new booking will be created there)
  const handleCreateNewBooking = async () => {
    const bookingData = {
      room: router.query.id,
      checkInDate,
      checkOutDate,
      daysOfStay,
      amountPaid: 90,
      paymentInfo: {
        id: "STRIPE_PAYMENT_ID",
        status: "STRIPE_PAYMENT_STATUS",
      },
      paidAt: Date.now(),
    }

    const response = await CallWithOutAuth("POST", "/bookings", bookingData)

    console.log(response)
  }

  const handleBookRoom = async (id, pricePerNight) => {
    setPaymentLoading(true)
    const amount = pricePerNight * daysOfStay

    try {
      const link = `${
        process.env.NEXT_LOCAL_BASE_URL
      }/checkout_session/${id}?checkInDate=${checkInDate.toISOString()}&checkOutDate=${checkOutDate.toISOString()}&daysOfStay=${daysOfStay}`

      const { data } = await axios.get(link, { params: { amount } })
      console.log("data: ", data)

      const stripe = await getStripe()

      // redirect to checkout
      stripe.redirectToCheckout({ sessionId: data.session.id })

      setPaymentLoading(false)
    } catch (error) {
      setPaymentLoading(false)
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <>
      <Head>
        <title>{room.name} - Bookin</title>
      </Head>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" color="secondary.dark">
              {room.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="secondary.dark">
              {room.address}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" mb={2}>
              <Rating name="read-only" value={room.ratings} readOnly />
              <Typography color="secondary.dark">
                ({room.numOfReviews} reviews)
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Carousel>
              {room.images &&
                room.images.map((image) => (
                  <Box
                    key={image.url}
                    position="relative"
                    width="100%"
                    height="100%"
                  >
                    {/* eslint-disable-next-line */}
                    <img
                      component="Image"
                      src={image.url}
                      alt={image._id}
                      layout="fill"
                      priority="true"
                      objectfit="cover"
                    />
                  </Box>
                ))}
            </Carousel>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              color="secondary.dark"
              sx={{ fontWeight: "bold" }}
            >
              Description
            </Typography>
            <Typography variant="body1" color="secondary.dark">
              {room.description}
            </Typography>
          </Grid>
          <Grid item container spacing={3}>
            {/* features and calender */}
            <Grid item xs={12} md={6}>
              <RoomFeatures room={room} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box mb={2}>
                  <Typography
                    variant="h6"
                    color="secondary.dark"
                    fontWeight="bold"
                  >
                    ${room.pricePerNight}/night
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="body2" color="secondary.dark">
                    Pick Check In & Check Out Date
                  </Typography>
                  <DatePicker
                    selected={checkInDate}
                    onChange={handleDateChange}
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    excludeDates={excludedDates}
                    selectsRange
                    minDate={new Date()}
                    inline
                  />
                </Box>
                <Box>
                  {isBookingAvailable === true && (
                    <Alert severity="success">
                      Room is Available ??? Book now!
                    </Alert>
                  )}
                  {isBookingAvailable === false && (
                    <Alert severity="error">
                      Room not available ??? Book another room or try to book on
                      some other date!
                    </Alert>
                  )}
                  {isBookingAvailable && !user && (
                    <Alert severity="warning">
                      Room is available ??? Login to book now!
                    </Alert>
                  )}
                  {isBookingAvailable && user && (
                    <LoadingButton
                      loading={paymentLoading}
                      sx={{ mt: 1 }}
                      fullWidth
                      variant="contained"
                      onClick={() =>
                        handleBookRoom(room._id, room.pricePerNight)
                      }
                    >
                      Pay - ${daysOfStay * room.pricePerNight}
                    </LoadingButton>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <NewReview />
          </Grid>
          <Grid item xs={12}>
            <ReviewList reviews={room.reviews} />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default RoomDetails
