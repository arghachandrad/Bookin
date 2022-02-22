import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const NewReview = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { room, error, loading } = useSelector((state) => state.room)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const { id } = router.query

  const handleSubmit = async () => {
    const reviewData = {
      rating,
      comment,
    }
  }

  return <div>New Review</div>
}

export default NewReview
