import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMyBookings } from "../../redux/actions/booking"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { Box, Container } from "@mui/material"

const MyBookings = () => {
  const dispatch = useDispatch()
  const { bookings } = useSelector((state) => state.booking)
  const [pageSize, setPageSize] = useState(10)

  const rows =
    bookings &&
    bookings.map((booking) => {
      return {
        id: booking._id,
        checkIn: new Date(booking.checkInDate).toLocaleString("en-US"),
        checkOut: new Date(booking.checkOutDate).toLocaleString("en-US"),
        amount: `$${booking.amountPaid}`,
      }
    })

  const columns = [
    { field: "id", headerName: "Booking Id", width: 300 },
    { field: "checkIn", headerName: "CheckIn", width: 300 },
    { field: "checkOut", headerName: "CheckOut", width: 300 },
    { field: "amount", headerName: "Amount Paid", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 140,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <Box display="flex" alignItems="center">
            <Link href={`/bookings/${params.row.id}`} passHref>
              <a>
                <VisibilityIcon />
              </a>
            </Link>
          </Box>
        )
      },
    },
  ]

  useEffect(() => {
    dispatch(getMyBookings())
  }, [dispatch])
  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <div style={{ display: "flex", minHeight: 650 }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
          />
        </div>
      </div>
    </Container>
  )
}

export default MyBookings
