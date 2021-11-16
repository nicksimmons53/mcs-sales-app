import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

const getAll = async(id) => {
    try {
        let result = await axios.get(`${API_URL}/clients?userId=${id}`);
        console.log(result)
        return result.data;
    } catch(error) {
        return error;
    }
};

const getDetails = async(id) => {
    try {
        let result = await axios.get(`${API_URL}/details?clientId=${id}`);
         
        return result.data;
    } catch(error) {
        return error;
    }
};

const getById = async(id) => {
    try {
        let result = await axios.get(`${API_URL}/clients/${id}`);
        
        return result.data;
    } catch(error) {
        return error;
    }
}

const create = async(data) => {
    let apiResponse;
    
    await axios.post(`${API_URL}/clients`, data)
        .then((response) => {
            apiResponse = {data: {insertId: response.data.data.insertId, status: response.status}};
        })
        .catch((error) => {
            console.log(error);
        });
    
    return apiResponse;
};

const update = async(values) => {
    let status;

    await axios.put(`${API_URL}/clients/${values.id}`, values)
        .then((response) => {
            status = response.status;
        })
        .catch((error) => {
            console.log(error);
        });

    return status;
};

const updateDetails = async (values) => {
    let status;

    await axios.put(`${API_URL}/details?type=accounting_details&clientId=${values.id}`, values.accounting_details)
        .then((response) => {
            status = response.status;
            if (status < 200 || status > 299)
                return status;
        })
        .catch((error) => {
            console.log(error);
        });


    await axios.put(`${API_URL}/details?type=expediting_details&clientId=${values.id}`, values.expediting_details)
        .then((response) => {
            status = response.status;
            if (status < 200 || status > 299)
                return status;
        })
        .catch((error) => {
            console.log(error);
        });
    
    return status;
};

const pushToSage = async(id) => {
    try {
        let result = await axios.get(`${API_URL}/clients/${id}/sage-create`);
         
        return result.data;
    } catch(error) {
        return error;
    }
};

const updateStatus = async(values) => {
    let status;

    await axios.put(`${API_URL}/clients/${values.id}/status`, values.info)
        .then((response) => {
            status = response.status;
            console.log(status)
        })
        .catch((error) => {
            console.log(error);
        });

    return status;
}

module.exports = {
    getAll,
    getDetails,
    getById,
    create,
    pushToSage,
    update,
    updateDetails,
    updateStatus
};