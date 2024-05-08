import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react'; 
import Button from '@mui/material/Button';
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-material.css";

import { fetchCustomers, deleteCustomer } from '../customer-api.js';
import  AddCustomer  from './AddCustomer.jsx'
import  EditCustomer  from './EditCustomer.jsx'

function CustomerList({customers, setCustomers}) {

    const [colDef] = useState([
        { field:'firstname', headerName:'First name', filter:true, floatingFilter: true, width:150  },
        { field:'lastname', headerName:'Last name', filter:true, floatingFilter: true, width:150   },
        { field:'streetaddress', headerName:'Street address', filter:true, floatingFilter: true, width:150  },
        { field:'postcode', headerName:'Postal code', filter:true, floatingFilter: true,  width:150 },
        { field:'city', filter:true, floatingFilter: true,  width:150},
        { field:'email', filter:true, floatingFilter: true, width:150 },
        { field:'phone', filter:true, floatingFilter: true, width:150 },
        {
            cellRenderer: params => <EditCustomer data={params.data} setCustomers={setCustomers} />, width:120
        },
        {
            cellRenderer: params => 
            <Button  
                size='small' 
                color='error' 
                onClick={ () => handleDelete(params.data._links.customer.href) } >
                Delete
            </Button>
        }
    ]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleDelete = url => {
        deleteCustomer(url)
        .then(() => handleFetch())
        .catch(err => console.log(err))
    }

    const handleFetch = () => {
        fetchCustomers()
        .then(data => setCustomers(data._embedded.customers))
        .catch(err => console.log(err))
    }

    return(
       <>
        <AddCustomer setCustomers={setCustomers}/>
        <div className='ag-theme-material' style={{height: 500}}>
            <AgGridReact 
                rowData={customers}
                columnDefs={colDef}
                pagination={true}
                paginationAutoPageSize={true}
                suppressCellFocus={true}
            />
        </div>
       </>
    );
}

export default CustomerList;