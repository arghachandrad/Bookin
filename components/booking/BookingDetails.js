import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBookingDetails } from "../../redux/actions/booking"
import DownloadIcon from "@mui/icons-material/Download"
import easyinvoice from "easyinvoice"

const BookingDetails = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { bookingDetails } = useSelector((state) => state.booking)
  useEffect(() => {
    dispatch(getBookingDetails(router.query.id))
  }, [dispatch, router.query.id])

  const handleDownloadInvoice = async (booking) => {
    console.log(booking)
    var data = {
      // Customize enables you to provide your own templates
      // Please review the documentation for instructions and examples
      customize: {
        //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
      },
      images: {
        // The logo on top of your invoice
        logo: "https://public.easyinvoice.cloud/img/logo_en_original.png",
        // The invoice background
        background: "https://public.easyinvoice.cloud/img/watermark-draft.jpg",
      },
      // Your own data
      sender: {
        company: "Bookin",
        address: "Kolkata",
        zip: "743122",
        city: "Kolkata",
        country: "India",
      },
      // Your recipient
      client: {
        company: `${booking.user.name}`,
        address: `${booking.user.email}`,
        zip: "",
        city: `Check In: ${new Date(booking.checkInDate).toLocaleString(
          "en-US"
        )}`,
        country: `Check Out: ${new Date(booking.checkOutDate).toLocaleString(
          "en-US"
        )}`,
      },
      information: {
        // Invoice number
        number: `${booking._id}`,
        // Invoice data
        date: `${new Date(Date.now()).toLocaleString("en-US")}`,
      },
      // The products you would like to see on your invoice
      // Total values are being calculated automatically
      products: [
        {
          quantity: `${booking.daysOfStay}`,
          description: `${booking.room.name}`,
          "tax-rate": 0,
          price: `${booking.room.pricePerNight}`,
        },
      ],
      // The message you would like to display on the bottom of your invoice
      "bottom-notice":
        "This is auto generated invoice of your booking on Bookin",
      // Settings to customize your invoice
      settings: {
        currency: "USD",
      },
    }

    const result = await easyinvoice.createInvoice(data)
    easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf)
  }

  return (
    <>
      {bookingDetails && bookingDetails.user && (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid item container>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h4" color="secondar.dark">
                      Booking #{bookingDetails._id}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} display="flex" alignItems="center">
                    <Tooltip title="Download Invoice" color="primary" arrow>
                      <IconButton
                        onClick={() => handleDownloadInvoice(bookingDetails)}
                      >
                        <DownloadIcon />
                      </IconButton>
                    </Tooltip>
                    <Typography variant="body2" color="secondar.dark">
                      Download Invoice
                    </Typography>
                  </Grid>
                </Grid>

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

                <Box mr={5}>
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
