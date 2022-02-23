import { useRouter } from "next/router"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { createNewRoom } from "../../redux/actions/room"
import {
  Box,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material"
import { LoadingButton } from "@mui/lab"
import validationUtility from "../../utils/validation"
import { toast } from "react-toastify"
import PhotoCamera from "@mui/icons-material/PhotoCamera"

const NewRoom = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { loading } = useSelector((state) => state.room)

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    address: "",
    category: "King",
    guestCapacity: 1,
    numOfBeds: 1,
    internet: false,
    breakfast: false,
    airConditioned: false,
    petsAllowed: false,
    roomCleaning: false,
    images: [],
    imagesPreview: [],
    validation: false,
  })

  const {
    name,
    price,
    address,
    category,
    description,
    guestCapacity,
    numOfBeds,
    internet,
    breakfast,
    airConditioned,
    petsAllowed,
    roomCleaning,
    images,
  } = formData

  const formValidation = async () => {
    if (validationUtility.text(formData.name)) {
      return Promise.resolve(true)
    } else {
      return Promise.resolve(false)
    }
  }

  const handleChange = async (e) => {
    if (e.target.name === "price") {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: Number(e.target.value),
      }))
      return
    }
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.checked }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormData((prev) => ({ ...prev, validation: true }))
    const validationRes = await formValidation()
    if (validationRes) {
      setFormData((prev) => ({ ...prev, validation: false }))

      const roomData = {
        name,
        pricePerNight: price,
        description,
        address,
        category,
        guestCapacity: Number(guestCapacity),
        numOfBeds: Number(numOfBeds),
        internet,
        breakfast,
        airConditioned,
        petsAllowed,
        roomCleaning,
        images,
      }
      console.log(formData)

      dispatch(createNewRoom(roomData))

      setFormData((prev) => ({
        ...prev,
        name: "",
        price: 0,
        description: "",
        address: "",
        category: "King",
        guestCapacity: 1,
        numOfBeds: 1,
        internet: false,
        breakfast: false,
        airConditioned: false,
        petsAllowed: false,
        roomCleaning: false,
        images: [],
        imagesPreview: [],
      }))
    } else {
      toast.error("Please fill all the fields")
      setFormData((prev) => ({ ...prev, validation: true }))
    }
  }

  const handleUploadImage = (e) => {
    const files = Array.from(e.target.files)
    files.forEach((file) => {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, reader.result],
            imagesPreview: [...prev.imagesPreview, reader.result],
          }))
        }
      }

      reader.readAsDataURL(file)
    })
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper sx={{ p: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
                error={
                  formData.validation
                    ? !validationUtility.text(formData.name)
                    : false
                }
                helperText={
                  formData.validation && !validationUtility.text(formData.name)
                    ? "Please enter valid name"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                name="price"
                label="Price Per Night"
                value={formData.price}
                onChange={handleChange}
                error={
                  formData.validation
                    ? !validationUtility.text(formData.price)
                    : false
                }
                helperText={
                  formData.validation && !validationUtility.text(formData.price)
                    ? "Please enter valid price"
                    : ""
                }
                inputProps={{
                  min: "0",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleChange}
                error={
                  formData.validation
                    ? !validationUtility.text(formData.description)
                    : false
                }
                helperText={
                  formData.validation &&
                  !validationUtility.text(formData.description)
                    ? "Please enter valid description"
                    : ""
                }
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                name="address"
                label="Address"
                value={formData.address}
                onChange={handleChange}
                error={
                  formData.validation
                    ? !validationUtility.text(formData.address)
                    : false
                }
                helperText={
                  formData.validation &&
                  !validationUtility.text(formData.address)
                    ? "Please enter valid address"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-simple-select-label">
                  Number of Guests
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="guestCapacity"
                  value={formData.guestCapacity}
                  label="Number of Guests"
                  onChange={handleChange}
                  name="guestCapacity"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="catagory"
                  value={formData.category}
                  label="Category"
                  onChange={handleChange}
                  name="category"
                >
                  {["King", "Single", "Twins"].map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-simple-select-label">
                  Number of Beds
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="numOfBeds"
                  value={formData.numOfBeds}
                  label="Number of Beds"
                  onChange={handleChange}
                  name="numOfBeds"
                >
                  {[1, 2, 3].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="breakfast"
                      checked={formData.breakfast}
                      onChange={handleCheckboxChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Breakfast"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="airConditioned"
                      checked={formData.airConditioned}
                      onChange={handleCheckboxChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Air Conditioned"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="internet"
                      checked={formData.internet}
                      onChange={handleCheckboxChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Internet"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="petsAllowed"
                      checked={formData.petsAllowed}
                      onChange={handleCheckboxChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Pets Allowed"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="roomCleaning"
                      checked={formData.roomCleaning}
                      onChange={handleCheckboxChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Room Cleaning"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                multiple
                onChange={handleUploadImage}
              />
            </Grid>
            <Grid item xs={12}>
              <ImageList
                sx={{ width: "100%", height: "100%" }}
                cols={3}
                rowHeight={164}
              >
                {formData.imagesPreview.map((image) => (
                  <ImageListItem key={image}>
                    {/* eslint-disable-next-line */}
                    <img
                      src={image}
                      srcSet={image}
                      alt="Image Preview"
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                loading={loading}
                type="submit"
                fullWidth
                variant="contained"
              >
                Create Room
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default NewRoom
