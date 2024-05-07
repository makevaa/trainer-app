import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import { saveNewTraining } from '../training-api.js';
import { fetchCustomers, fetchCustomerById } from '../customer-api.js';


export default function AddTraining( {setTrainings} ) {
    const [open, setOpen] = useState(false);

    // Customers are needed here for customer data when assigning training to a customer
    const [customers, setCustomers] = useState([]);

    const [training, setTraining] = useState({
        date:'',
        duration:'',
        activity:'',
        customer:''
    } );

    const handleCustomerFetch = () => {
        fetchCustomers()
        .then(data => setCustomers(data._embedded.customers))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        handleCustomerFetch();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleSave = () => {
        // Format date to ISO string before saving new training
        const formattedDate = training.date.toISOString();
        setTraining({...training, date: formattedDate})

        saveNewTraining(training)
        .then(res => setTrainings(res))
        .catch(err => console.log(err))
        handleClose();
        console.log(training)
    }


  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>New training</DialogTitle>
        <DialogContent>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
                value={dayjs(training.date)} 
                onChange={ e => setTraining({...training, date: e }) }
                label="Date"
                format='DD.MM.YYYY HH.mm'
                views={['year', 'month', 'day']}
            />
        </LocalizationProvider>


        <TextField
            margin="dense"
            label="Duration (min)"
            value={training.duration}
            onChange={ e => setTraining( {...training, duration: e.target.value} ) }
            fullWidth
            variant="standard"
          />

        <TextField
            margin="dense"
            label="Activity"
            value={training.activity}
            onChange={ e => setTraining( {...training, activity: e.target.value} ) }
            fullWidth
            variant="standard"
          />
        
        <Autocomplete
            disablePortal
            options= {
                customers.map( customer => {
                    // Create objects for customer dropdown menu
                    return {
                        id: customer._links.self.href,
                        label: `${customer.firstname} ${customer.lastname}`
                    }
                }) 
            }
            sx={{ width: 300 }}
            onChange={ (e, value) => setTraining( {...training, customer: value.id} ) }
            renderInput={(params) => <TextField {...params} label="Select customer" />}
        />

        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>

      </Dialog>
    </>
  );
}
