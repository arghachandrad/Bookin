import { useState } from "react"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Select from "@mui/material/Select"
import FormControl from "@mui/material/FormControl"
import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"
import SearchIcon from "@mui/icons-material/Search"
import { useRouter } from "next/router"

const Search = () => {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [guests, setGuests] = useState("")
  const [category, setCategory] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    if (location.trim() || guests || category) {
      router.push(
        `/?${location.trim() ? `location=${location}` : ""}&${
          guests ? `guests=${guests}` : ""
        }&${category ? `category=${category}` : ""}`
      )
    } else {
      router.push("/") // show full set of rooms
    }
  }

  return (
    <Paper sx={{ padding: 2, mb: 4 }}>
      <Typography variant="h6" color="secondary.dark">
        Search Rooms
      </Typography>
      <form onSubmit={handleSearch}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              variant="filled"
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="filled">
              <InputLabel id="demo-simple-select-label">
                Number of Guests
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={guests}
                label="Number of Guests"
                onChange={(e) => setGuests(e.target.value)}
                size="small"
              >
                <MenuItem key="emptyGuests" value={undefined}>
                  Remove Filter
                </MenuItem>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="filled">
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
                size="small"
              >
                <MenuItem key="emptyCat" value={""}>
                  Remove Filter
                </MenuItem>
                {["King", "Single", "Twins"].map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              type="submit"
              endIcon={<SearchIcon />}
              variant="contained"
              fullWidth
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

export default Search
