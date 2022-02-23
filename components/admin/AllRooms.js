import { DataGrid } from "@mui/x-data-grid"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAdminAllRooms } from "../../redux/actions/room"
import { Box, Container, IconButton, Button } from "@mui/material"
import { useRouter } from "next/router"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

const AllRooms = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { adminAllRooms, loading } = useSelector((state) => state.room)
  const [pageSize, setPageSize] = useState(10)

  const rows =
    adminAllRooms &&
    adminAllRooms.map((room) => {
      return {
        id: room._id,
        name: room.name,
        pricePerNight: room.pricePerNight,
        category: room.category,
      }
    })

  const columns = [
    { field: "id", headerName: "Room Id", width: 300 },
    { field: "name", headerName: "Name", width: 400 },
    { field: "pricePerNight", headerName: "Price / Night", width: 200 },
    { field: "category", headerName: "Category", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 140,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <Box display="flex" alignItems="center">
            <Box mr={2}>
              <Link href={`/admin/rooms/${params.row.roomId}`} passHref>
                <a>
                  <EditIcon />
                </a>
              </Link>
            </Box>
            <Box>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        )
      },
    },
  ]

  useEffect(() => {
    dispatch(getAdminAllRooms())
  }, [dispatch])

  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Box display="flex" justifyContent="flex-end" mb={3}>
        <Link href="/admin/rooms/new" passHref>
          <Button variant="contained">Create new room</Button>
        </Link>
      </Box>
      <div style={{ display: "flex", minHeight: 650 }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            loading={loading}
          />
        </div>
      </div>
    </Container>
  )
}

export default AllRooms
