import { useRouter } from "next/router"
import { forwardRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createNewReview } from "../../redux/actions/room"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import TextField from "@mui/material/TextField"
import DialogActions from "@mui/material/DialogActions"
import LoadingButton from "@mui/lab/LoadingButton"
import TextareaAutosize from "@mui/material/TextareaAutosize"
import Rating from "@mui/material/Rating"
import Slide from "@mui/material/Slide"
import { toast } from "react-toastify"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const NewReview = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { room, error, loading, success } = useSelector((state) => state.room)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [open, setOpen] = useState(false)

  const { id } = router.query

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async () => {
    if (rating > 0 && comment) {
      const reviewData = {
        rating,
        comment,
        roomId: id,
      }

      dispatch(createNewReview(reviewData))

      handleClose()
      setRating(0)
      setComment("")
    } else {
      toast.error("Fill ratings and comment before submitting review")
    }
  }

  return (
    <Container>
      <LoadingButton variant="contained" onClick={handleClickOpen}>
        Submit Your Review
      </LoadingButton>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>Rate your Review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tell the world what you like or dislike about this Room
          </DialogContentText>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue)
            }}
          />
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Comment"
            style={{ width: "100%" }}
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton variant="contained" onClick={handleSubmit}>
            Submit
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default NewReview
