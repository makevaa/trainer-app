import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-material.css";
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import { fetchTrainingsWithInfo, deleteTraining  } from '../training-api.js';
import  AddTraining  from './AddTraining.jsx'
import  EditTraining  from './EditTraining.jsx'

function TrainingList( {trainings, setTrainings}) {

    const [colDef] = useState([
        { 
            field:'date', 
            valueFormatter: p => formatDate(p.value), 
            filter:true, 
            floatingFilter: true,
        },
        { field:'duration', headerName:'Duration (min)', filter:true, floatingFilter: true  },
        { field:'activity', filter:true, floatingFilter: true  },
        { field:'customer.firstname', headerName:'First name (customer)', filter:true, floatingFilter: true  },
        { field:'customer.lastname', headerName:'Last name (customer)', filter:true, floatingFilter: true  },
        {
            cellRenderer: params => <EditTraining data={params.data} setTrainings={setTrainings} />, width:120
        },
        {
            cellRenderer: params => 
            <Button  
                size='small' 
                color='error' 
                onClick={ () => handleDelete(params.data.id) } >
                Delete
            </Button>
        }
    ]);

    useEffect(() => {
        handleFetch();
    }, []);

    
    const handleDelete = id => {
        deleteTraining(id)
        .then(() => handleFetch())
        .catch(err => console.log(err))
    }

    const formatDate = date => {
        let formattedDate = dayjs(date);
        formattedDate = formattedDate.format('DD/MM/YYYY HH:mm');
        return formattedDate
    }
    
    const handleFetch = () => {
        fetchTrainingsWithInfo()
        .then(data => setTrainings(data))
        .then(() => handleCustomerFetch())
        .catch(err => console.log(err))
    }


    return(
       <>
        <AddTraining setTrainings={setTrainings} />
        <div className='ag-theme-material' style={{height: 500}}>
            <AgGridReact 
                rowData={trainings}
                columnDefs={colDef}
                pagination={true}
                paginationAutoPageSize={true}
                suppressCellFocus={true}
            />
        </div>
       </>
    );
}

export default TrainingList;
