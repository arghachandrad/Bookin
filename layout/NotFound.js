import { Box, Container, Typography } from "@mui/material"
import Link from "next/link"

const NotFound = () => {
  return (
    <Container>
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box>
          <Typography variant="h2">404!</Typography>
          <Typography variant="h4">
            Page Not Found. Go To{" "}
            <Link href="/" passHref>
              <a style={{ color: "turquoise" }}>Home Page</a>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default NotFound
