import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import { updateTraining } from '../training-api.js';



export default function EditTraining( {data, setTrainings} ) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState( {} );


  const handleClickOpen = () => {
    setTraining({
        date: data.date,
        duration: data.duration,
        activity: data.activity,
        customer: data.customer,

    })
    setOpen(true);
  };




    const handleClose = () => {
        setOpen(false);
    };


    const handleUpdate = () => {
        // Format date to ISO string before updating
        let formattedDate = training.date;
        if (typeof formattedDate !== 'string') 
            formattedDate = formattedDate.toISOString();

        setTraining({...training, date: formattedDate})

        updateTraining(data.id, training)
        .then(res => setTrainings(res))
        .catch(err => console.log(err))
        handleClose();
    }


  return (
    <>
      <Button size="small" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
       <DialogTitle>Edit training</DialogTitle>
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
        

        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>

        </Dialog>
    </>
  );
}


