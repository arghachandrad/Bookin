import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  daysOfStay: {
    type: Number,
    required: true,
  },
  paymentInfo: {
    id: { type: String, required: true },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

bookingSchema.pre("save", async function (next) {
  var checkIn = new Date(this.checkInDate)
  const checkInTimeStamp = new Date(
    Date.UTC(
      checkIn.getFullYear(),
      checkIn.getMonth(),
      checkIn.getDate(),
      checkIn.getHours(),
      checkIn.getMinutes(),
      checkIn.getSeconds(),
      checkIn.getMilliseconds()
    )
  )
  var checkOut = new Date(this.checkOutDate)
  const checkOutTimeStamp = new Date(
    Date.UTC(
      checkOut.getFullYear(),
      checkOut.getMonth(),
      checkOut.getDate(),
      checkOut.getHours(),
      checkOut.getMinutes(),
      checkOut.getSeconds(),
      checkOut.getMilliseconds()
    )
  )
  this.checkInDate = checkInTimeStamp
  this.checkOutDate = checkOutTimeStamp
})

export default mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema)
