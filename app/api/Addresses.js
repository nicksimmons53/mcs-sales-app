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

const update = async(values) => {
    let status;

    await axios.post(`${API_URL}/clients/${values.id}/addresses`, values)
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
    update
}