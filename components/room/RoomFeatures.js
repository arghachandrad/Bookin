import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import HotelIcon from "@mui/icons-material/Hotel"
import GroupIcon from "@mui/icons-material/Group"
import CloseIcon from "@mui/icons-material/Close"
import CheckIcon from "@mui/icons-material/Check"

const RoomFeatures = ({ room }) => {
  return (
    <>
      <Typography
        variant="h6"
        color="secondary.dark"
        sx={{ fontWeight: "bold" }}
      >
        Features
      </Typography>
      <Box display="flex" alignItems="center">
        <GroupIcon sx={{ mr: 2 }} />
        <Typography>{room.guestCapacity} Guests</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <HotelIcon sx={{ mr: 2 }} />
        <Typography>{room.numOfBeds} Beds</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        {room.breakfast ? (
          <CheckIcon sx={{ color: "green", mr: 2 }} />
        ) : (
          <CloseIcon sx={{ color: "red", mr: 2 }} />
        )}
        <Typography>Breakfast</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        {room.internet ? (
          <CheckIcon sx={{ color: "green", mr: 2 }} />
        ) : (
          <CloseIcon sx={{ color: "red", mr: 2 }} />
        )}
        <Typography>Internet</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        {room.airConditioned ? (
          <CheckIcon sx={{ color: "green", mr: 2 }} />
        ) : (
          <CloseIcon sx={{ color: "red", mr: 2 }} />
        )}
        <Typography>Air Conditioned</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        {room.petsAllowed ? (
          <CheckIcon sx={{ color: "green", mr: 2 }} />
        ) : (
          <CloseIcon sx={{ color: "red", mr: 2 }} />
        )}
        <Typography>Pets Allowed</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        {room.roomCleaning ? (
          <CheckIcon sx={{ color: "green", mr: 2 }} />
        ) : (
          <CloseIcon sx={{ color: "red", mr: 2 }} />
        )}
        <Typography>Room Cleaning</Typography>
      </Box>
    </>
  )
}

export default RoomFeatures
