import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import TextField from "@mui/material/TextField"
import { LoadingButton } from "@mui/lab"
import validationUtility from "../../utils/validation"
import { forgotPassword } from "../../redux/actions/auth"

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const { loading, success, error } = useSelector((state) => state.auth)
  const [email, setEmail] = useState("")
  const [validation, setValidation] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValidation(true)
    if (validationUtility.email(email)) {
      setValidation(false)
      dispatch(forgotPassword({ email }))
    } else {
      toast.error("Invalid email")
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper sx={{ p: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={validation ? !validationUtility.email(email) : false}
                helperText={
                  validation && !validationUtility.email(email)
                    ? "Please enter valid email"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                loading={loading}
                type="submit"
                fullWidth
                variant="contained"
              >
                Send Email
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default ForgotPassword
