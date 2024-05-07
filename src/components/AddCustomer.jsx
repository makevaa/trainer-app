import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { saveNewCustomer } from '../customer-api.js';

export default function AddCustomer( {setCustomers} ) {
  const [open, setOpen] = useState(false);

    const [customer, setCustomer] = useState({
        firstname:'',
        lastname:'',
        streetaddress:'',
        postcode: '',
        city:'',
        email:'',
        phone:''
    } );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    saveNewCustomer(customer)    
    .then(res => setCustomers(res._embedded.customers))
    .catch(err => console.log(err))
    handleClose();
  }



  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Customer
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>New customer</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Firstname"
            value={customer.firstname}
            onChange={ e => setCustomer( {...customer, firstname: e.target.value} ) }
            fullWidth
            variant="standard"
          />

        <TextField
            margin="dense"
            label="Lastname"
            value={customer.lastname}
            onChange={ e => setCustomer( {...customer, lastname: e.target.value} ) }
            fullWidth
            variant="standard"
          />

        <TextField
            margin="dense"
            label="Street address"
            value={customer.streetaddress}
            onChange={ e => setCustomer( {...customer, color: e.target.value} ) }
            fullWidth
            variant="standard"
          />

        <TextField
            margin="dense"
            label="Postal code"
            value={customer.postcode}
            onChange={ e => setCustomer( {...customer, postcode: e.target.value} ) }
            fullWidth
            variant="standard"
          />

        <TextField
            margin="dense"
            label="City"
            value={customer.city}
            onChange={ e => setCustomer( {...customer, city: e.target.value} ) }
            fullWidth
            variant="standard"
          />

        <TextField
            margin="dense"
            label="E-mail address"
            value={customer.email}
            onChange={ e => setCustomer( {...customer, price: e.target.value} ) }
            fullWidth
            variant="standard"
          />

        <TextField
            margin="dense"
            label="Phone number"
            value={customer.phone}
            onChange={ e => setCustomer( {...customer, price: e.target.value} ) }
            fullWidth
            variant="standard"
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
