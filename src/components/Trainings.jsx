import Typography from '@mui/material/Typography';
import { useState } from "react";

import TrainingList from './TrainingList';

export default function Trainings() {
    
    const [trainings, setTrainings] = useState([]);

    return (
        <>  
            <Typography variant='h4'>Trainings</Typography>
            <TrainingList trainings={trainings} setTrainings={setTrainings} />
        </>

    );
  }