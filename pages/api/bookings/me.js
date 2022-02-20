import nc from "next-connect"
import dbConnect from "../../../config/dbConnect"

import { getMyBookings } from "../../../controllers/booking"
import { isAuthenticatedUser } from "../../../middlewares/auth"

import onError from "../../../middlewares/errors"

const handler = nc({ onError })

dbConnect()

handler.use(isAuthenticatedUser).get(getMyBookings)

export default handler
