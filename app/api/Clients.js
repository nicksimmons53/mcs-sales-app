import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

const getAll = async(id) => {
    try {
        let result = await axios.get(`${API_URL}/employee/${id}/clients`);
        return result.data;
    } catch(error) {
        return error;
    }
};

const getDetails = async(id, clientId) => {
    try {
        let result = await axios.get(`${API_URL}/employee/${id}/clients/${clientId}/advanced-info`);
        return result.data;
    } catch(error) {
        return error;
    }
};

const createNew = async(id, values) => {
    let status;

    values.empnum = id;
    values.shtnme = values.clnnme;

    await axios.post(`${API_URL}/employee/${id}/clients`, values)
        .then((response) => {
            status = response.status;
        })
        .catch((error) => {
            console.log(error);
        });
    
    return status;
};

const createDetails = async(id, clientId, values) => {		
    let status;

    await axios.post(`${API_URL}/employee/${id}/clients/${clientId}/advanced-info`, values)
    	.then((response) => {
            status = response.status;
    	})
    	.catch((error) => {
    		console.log(error);
    	});

    return status;
};

module.exports = {
    getAll,
    getDetails,
    createNew,
    createDetails
};