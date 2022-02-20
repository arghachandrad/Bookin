import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import TextField from "@mui/material/TextField"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import { LoadingButton } from "@mui/lab"
import { useDispatch, useSelector } from "react-redux"
import { updateProfile, clearErrors } from "../../redux/actions/auth"
import validationUtility from "../../utils/validation"
import Typography from "@mui/material/Typography"

const Profile = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading, success, error, user } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    avatarPreview: "",
    validation: false,
  })

  const { name, email, password, avatar } = formData

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        avatarPreview: user.avatar.url,
      }))
    }
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch, error, user])

  const checkValidation = async () => {
    if (
      validationUtility.text(formData.name) ||
      validationUtility.email(formData.email) ||
      validationUtility.password(formData.password) ||
      validationUtility.text(formData.avatar) ||
      validationUtility.text(formData.avatarPreview)
    ) {
      return Promise.resolve(true)
    } else {
      return Promise.resolve(true)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormData((prev) => ({ ...prev, validation: true }))
    const validation = await checkValidation()
    if (validation) {
      // register
      dispatch(updateProfile({ _id: user._id, name, email, password, avatar }))

      if (!error) {
        toast.success("profile updated successfully")
      }
    } else {
      toast.error("Change atleast one detail")
    }
  }

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          setFormData((prev) => ({
            ...prev,
            avatar: reader.result,
            avatarPreview: reader.result,
          }))
        }
      }
      reader.readAsDataURL(e.target.files[0])
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper sx={{ p: 2 }}>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <input
              name="avatar"
              accept="image/*"
              hidden
              id="icon-button-file"
              type="file"
              style={{ display: "none" }}
              onChange={handleChange}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <Avatar
                  sx={{ height: "100px", width: "100px" }}
                  src={
                    formData.avatarPreview
                      ? formData.avatarPreview
                      : `/default_avatar.jpg`
                  }
                />
              </IconButton>
            </label>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                name="name"
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="email"
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                name="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                loading={loading}
                type="submit"
                fullWidth
                variant="contained"
              >
                Update
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Profile
