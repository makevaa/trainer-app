import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { updateCustomer } from '../customer-api.js';


export default function EditCustomer( {data, setCustomers} ) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState( {} );

  const handleClickOpen = () => {
    setCustomer({
        firstname: data.firstname,
        lastname: data.lastname,
        streetaddress: data.streetaddress,
        postcode: data.postcode,
        city: data.city,
        email: data.email,
        phone: data.phone
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    updateCustomer(data._links.customer.href, customer)
    .then(res => setCustomers(res._embedded.customers))
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
       <DialogTitle>Edit customer</DialogTitle>
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
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>

        </Dialog>
    </>
  );
}
