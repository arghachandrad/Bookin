import nc from "next-connect"
import dbConnect from "../../../config/dbConnect"

import { getBookingDetails } from "../../../controllers/booking"
import { isAuthenticatedUser } from "../../../middlewares/auth"

import onError from "../../../middlewares/errors"

const handler = nc({ onError })

dbConnect()

handler.use(isAuthenticatedUser).get(getBookingDetails)

export default handler
