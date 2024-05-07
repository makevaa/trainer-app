import Typography from '@mui/material/Typography';
import { useState } from "react";

import CustomerList from './CustomerList';

export default function Customers() {

    const [customers, setCustomers] = useState([]);


    return (
        <>  
            <Typography variant='h4'>Customers</Typography>
            <CustomerList customers={customers} setCustomers={setCustomers} />
        </>

    );
  }