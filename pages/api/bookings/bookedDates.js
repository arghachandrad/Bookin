import nc from "next-connect"
import dbConnect from "../../../config/dbConnect"

import { getBookedDates } from "../../../controllers/booking"

import onError from "../../../middlewares/errors"

const handler = nc({ onError })

dbConnect()

handler.get(getBookedDates)

export default handler
