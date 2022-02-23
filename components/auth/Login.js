import { useState } from "react"
import { signIn } from "next-auth/client"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import TextField from "@mui/material/TextField"
import { LoadingButton } from "@mui/lab"
import NextLink from "next/link"

const Login = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const response = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    })

    console.log(response)
    if (response.error) {
      setLoading(false)
      toast.error(response.error)
    } else {
      toast.success("Logged in successfully")
      setLoading(false)
      router.push("/")
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
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
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
                Login
              </LoadingButton>
            </Grid>
            <Grid item xs={12}>
              <NextLink href="/register" passHref>
                <a>New to our website ? Register</a>
              </NextLink>
            </Grid>
            <Grid item xs={12}>
              <NextLink href="/password/forgot" passHref>
                <a>Forgot your password ?</a>
              </NextLink>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Login
