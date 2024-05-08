// Fetch all trainings (no customer info)
export const fetchTrainings = () => {
    return fetch(import.meta.env.VITE_API_URL_TRAININGS)
    .then(res => {
        if (!res.ok) 
            throw new Error("Error in fetch" + res.statusText);
    
        return res.json();    
    })
}

// Fetch trainings with customer infos
export const fetchTrainingsWithInfo = () => {
    return fetch(import.meta.env.VITE_API_URL_TRAININGS_INFO)
    .then(res => {
        if (!res.ok) 
            throw new Error("Error in fetch" + res.statusText);
    
        return res.json();    
    })
}

// Save new training
export const saveNewTraining = newTraining => {
    return fetch(import.meta.env.VITE_API_URL_TRAININGS, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(newTraining)
    })
    .then(res => {
        if (!res.ok) 
            throw new Error("Error when adding training: " + res.statusText)
    })
    .then(() => {
        return fetchTrainingsWithInfo();
    })
    .catch(err => console.error(err))
}

// Update existing training by id
export const updateTraining =  (id, updatedTraining) => {
    const url = `${import.meta.env.VITE_API_URL_TRAININGS}/${id}`; 

    return fetch(url, {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(updatedTraining)
    })
    .then(res => {
        if (!res.ok) 
            throw new Error("Error when updating training: " + res.statusText)
    })
    .then(() => {
        return fetchTrainingsWithInfo();
    })
    .catch(err => console.error(err))
}

// Delete training by id
export const deleteTraining = id => {
    const url = `${import.meta.env.VITE_API_URL_TRAININGS}/${id}`;
    if (window.confirm("Delete training?")) {
        return fetch(url, { method:'DELETE' })
        .then(res => {
            if (!res.ok) 
                throw new Error("Error in deletion: " + res.statusText)
        })
        .then(() => {
            return fetchTrainingsWithInfo();
        })
        .catch(err => console.error(err))
    }
}

