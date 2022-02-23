import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import Link from "@mui/material/Link"
import NextLink from "next/link"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import { signOut } from "next-auth/client"

const Header = () => {
  const router = useRouter()
  const { user } = useSelector((state) => state.auth)
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = (redirectUrl) => {
    if (redirectUrl) {
      router.push(redirectUrl)
    }

    setAnchorElUser(null)
  }

  const handleLogout = () => {
    setAnchorElUser(null)
    signOut()
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NextLink href="/" passHref>
            <Link underline="none" color="#fff">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontWeight: "bold",
                }}
              >
                Bookin
              </Typography>
            </Link>
          </NextLink>

          <NextLink href="/" passHref>
            <Link underline="none" color="#fff" sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: "flex", md: "none", fontWeight: "bold" },
                }}
              >
                Bookin
              </Typography>
            </Link>
          </NextLink>

          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user?.name} src={user?.avatar?.url} />
                  </IconButton>
                </Tooltip>
                <Typography sx={{ fontSize: "0.8rem" }}>{user.name}</Typography>
              </Box>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={() => handleCloseUserMenu("")}
              >
                {user.role === "admin" && (
                  <MenuItem onClick={() => handleCloseUserMenu("/admin/rooms")}>
                    <Typography textAlign="center">Rooms</Typography>
                  </MenuItem>
                )}
                <MenuItem onClick={() => handleCloseUserMenu("/bookings/me")}>
                  <Typography textAlign="center">My Bookings</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleCloseUserMenu("/me/update")}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box>
              <NextLink href="/login" passHref>
                <Link
                  component="button"
                  underline="none"
                  color="#fff"
                  fontSize="1.25rem"
                >
                  Login
                </Link>
              </NextLink>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
