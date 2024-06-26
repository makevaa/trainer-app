import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';

import { Link, Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      <CssBaseline />

      <AppBar position='static' width='100%'>
        <Toolbar>
          <Typography variant='h6'>TrainerApp</Typography>

          <nav>
            <Link to={"/"} color="primary">Home</Link>
            <Link to={"/customers"}>Customers</Link>
            <Link to={"/trainings"}>Trainings</Link>
          </nav>
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  )
}

export default App
