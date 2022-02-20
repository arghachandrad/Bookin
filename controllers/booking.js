import Booking from "../models/booking"

import catchAsyncErrors from "../middlewares/catchAsyncErrors"
import ErrorHandler from "../utils/errorHandler"
import absoluteUrl from "next-absolute-url"

// Create new booking   =>   /api/bookings
const newBooking = catchAsyncErrors(async (req, res) => {
  const {
    room,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt,
  } = req.body

  const booking = await Booking.create({
    room,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt,
  })

  res.status(200).json({
    success: true,
    booking,
  })
})

// Check room booking availability   =>   /api/bookings/check
const checkRoomBookingAvailability = catchAsyncErrors(async (req, res) => {
  let { roomId, checkInDate, checkOutDate } = req.query

  checkInDate = new Date(checkInDate)
  checkOutDate = new Date(checkOutDate)

  const bookings = await Booking.find({
    room: roomId,
    $and: [
      {
        checkInDate: {
          $lte: checkOutDate,
        },
      },
      {
        checkOutDate: {
          $gte: checkInDate,
        },
      },
    ],
  })

  // check if there is any booking available
  let isAvailable
  if (bookings && bookings.length === 0) {
    isAvailable = true
  } else {
    isAvailable = false
  }

  res.status(200).json({
    success: true,
    isAvailable,
  })
})

export { newBooking, checkRoomBookingAvailability }
