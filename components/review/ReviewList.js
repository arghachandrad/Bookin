import {
  Alert,
  Box,
  Container,
  Divider,
  Grid,
  Rating,
  Typography,
} from "@mui/material"

const ReviewList = ({ reviews }) => {
  return (
    <Container>
      <Grid container maxWidth="xl">
        <Typography variant="h6">Reviews</Typography>
        {!reviews ||
          (reviews.length === 0 && (
            <Alert sx={{ width: "100%" }} severity="info">
              No Review Yet — Add a Review
            </Alert>
          ))}
        {reviews &&
          reviews.length > 0 &&
          reviews.map((review) => (
            <Grid item xs={12} key={review._id}>
              <Box>
                <Rating name="read-only" value={review.rating} readOnly />
                <Typography variant="body2">{review.comment}</Typography>
                <Typography color="secondary.dark" sx={{ fontSize: "0.7rem" }}>
                  By: {review.name}
                </Typography>
              </Box>
              <Divider />
            </Grid>
          ))}
      </Grid>
    </Container>
  )
}

export default ReviewList
