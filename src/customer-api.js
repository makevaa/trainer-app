export const fetchCustomers = () => {
    return fetch(import.meta.env.VITE_API_URL_CUSTOMERS)
    .then(res => {
        if (!res.ok) 
            throw new Error("Error in fetch" + res.statusText);
    
        return res.json();    
    })
}

export const fetchCustomerById = url => {
    return fetch(url)
    .then(res => {
        if (!res.ok) 
            throw new Error("Error in fetch" + res.statusText);
        console.log(url)
        return res.json();    
    })
}


export const saveNewCustomer = (newCustomer) => {
    return fetch(import.meta.env.VITE_API_URL_CUSTOMERS, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(newCustomer)
    })
    .then(res => {
        if (!res.ok) 
            throw new Error("Error when adding customer: " + res.statusText)
    })
    .then(() => {
        return fetchCustomers();
    })
    .catch(err => console.error(err))
}

 
export const updateCustomer =  (url, updatedCustomer) => {
    return fetch(url, {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(updatedCustomer)
    })
    .then(res => {
        if (!res.ok) 
            throw new Error("Error when updating customer: " + res.statusText)
    })
    .then(() => {
        return fetchCustomers();
    })
    .catch(err => console.error(err))
}

export const deleteCustomer = url => {
    if (window.confirm("Delete customer?")) {
        return fetch(url, { method:'DELETE' })
        .then(res => {
            if (!res.ok) 
                throw new Error("Error in deletion: " + res.statusText)

            //return res.json();
        })
        .then(() => {
            return fetchCustomers();
        })
        .catch(err => console.error(err))
    }
}
