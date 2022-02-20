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
            src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
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
        <Link href="#" passHref>
          <Button size="medium" fullWidth variant="contained">
            View Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default RoomItem
