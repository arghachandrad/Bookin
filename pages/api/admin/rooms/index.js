import nc from "next-connect"
import dbConnect from "../../../../config/dbConnect"

import { getAdminRooms } from "../../../../controllers/room"
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../../../../middlewares/auth"

import onError from "../../../../middlewares/errors"

const handler = nc({ onError })

dbConnect()

handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(getAdminRooms)

export default handler
