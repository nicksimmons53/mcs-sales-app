import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

const getAll = async(id) => {
    try {
        let result = await axios.get(`${API_URL}/clients/${id}/addresses`);
        
        return result.data;
    } catch(error) {
        return error;
    }
};

const create = async(data) => {
    let status;

    await axios.post(`${API_URL}/clients/${data.id}/addresses`, data)
        .then((response) => {
            status = response.status;
        })
        .catch((error) => {
            console.log(error);
        });
    
    return status;
}

const update = async(data) => {
    let status;

    await axios.put(`${API_URL}/clients/${data.clientId}/addresses/${data.id}`, data)
        .then((response) => {
            status = response.status;
        })
        .catch((error) => {
            console.log(error);
        });

    return status;
}

module.exports = {
    getAll,
    create,
    update
}