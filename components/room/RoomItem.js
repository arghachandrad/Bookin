import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Image from "next/image"
import Link from "next/link"
import Rating from "@mui/material/Rating"

const RoomItem = ({ room }) => {
  return (
    <Card>
      <CardMedia>
        <div style={{ position: "relative", width: "100%", height: "300px" }}>
          <Image
            src={room.images[0].url}
            layout="fill"
            objectFit="cover"
            alt="room image"
            priority
          />
        </div>
      </CardMedia>
      <CardContent>
        <Box mb={2}>
          <Link href={`/rooms/${room._id}`}>
            <a>
              <Typography gutterBottom variant="h6" component="div">
                {room.name}
              </Typography>
            </a>
          </Link>
        </Box>
        <Box mb={2}>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontWeight: "bold" }}
          >
            ${room.pricePerNight} / Night
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <Rating name="read-only" value={room.ratings} readOnly />
          <Typography color="secondary.dark">
            ({room.numOfReviews} reviews)
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Link href={`/rooms/${room._id}`} passHref>
          <Button size="medium" fullWidth variant="contained">
            View Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default RoomItem
