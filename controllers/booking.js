import Booking from "../models/booking"

import catchAsyncErrors from "../middlewares/catchAsyncErrors"
import ErrorHandler from "../utils/errorHandler"
import absoluteUrl from "next-absolute-url"
import Moment from "moment"
import { extendMoment } from "moment-range"
const moment = extendMoment(Moment)

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

// Get all booked rooms   =>   /api/bookings/bookedDates
const getBookedDates = catchAsyncErrors(async (req, res) => {
  let { roomId } = req.query

  const bookings = await Booking.find({ room: roomId })

  let bookedDates = []

  bookings.forEach((booking) => {
    const range = moment.range(
      moment(booking.checkInDate),
      moment(booking.checkOutDate)
    )

    const dates = Array.from(range.by("day"))

    bookedDates = bookedDates.concat(dates)
  })

  res.status(200).json({
    success: true,
    bookedDates,
  })
})

// Get all bookings of current user   =>   /api/bookings/me
const getMyBookings = catchAsyncErrors(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })

  res.status(200).json({
    success: true,
    bookings,
  })
})

// Get booking details   =>   /api/bookings/:id
const getBookingDetails = catchAsyncErrors(async (req, res) => {
  const booking = await Booking.findById(req.query.id)
    .populate({
      path: "user",
      select: "name email",
    })
    .populate({
      path: "room",
      select: "name images pricePerNight",
    })

  res.status(200).json({
    success: true,
    booking,
  })
})

export {
  newBooking,
  checkRoomBookingAvailability,
  getBookedDates,
  getMyBookings,
  getBookingDetails,
}
