import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import TextField from "@mui/material/TextField"
import { LoadingButton } from "@mui/lab"
import validationUtility from "../../utils/validation"
import { forgotPassword, resetPassword } from "../../redux/actions/auth"
import { useRouter } from "next/router"

const NewPassword = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading, success, error } = useSelector((state) => state.auth)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [validation, setValidation] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValidation(true)
    if (
      validationUtility.password(password) &&
      validationUtility.password(confirmPassword) &&
      validationUtility.rePassWordCheck(password, confirmPassword)
    ) {
      setValidation(false)
      dispatch(
        resetPassword(router.query.token, {
          password,
          confirmPassword,
        })
      )

      router.push("/login")
    } else {
      if (!validationUtility.rePassWordCheck(password, confirmPassword)) {
        toast.error("Password and confirmPassword don't match")
      } else {
        toast.error("Invalid email")
      }
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
                type="password"
                name="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={
                  validation ? !validationUtility.password(password) : false
                }
                helperText={
                  validation && !validationUtility.password(password)
                    ? "Please enter valid password"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={
                  validation
                    ? !validationUtility.password(confirmPassword)
                    : false
                }
                helperText={
                  validation && !validationUtility.password(confirmPassword)
                    ? "Please enter valid confirm password"
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
                Reset Password
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default NewPassword
