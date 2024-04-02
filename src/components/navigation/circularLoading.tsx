import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function CircularLoading () {

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto',
      height: '85vh'
    }}>
      <CircularProgress/> 
    </Box>
  )
}