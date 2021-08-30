import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

const getAll = async(id, clientId) => {
    try {
        let result = await axios.get(`${API_URL}/clients/${id}/contacts`);
        return result.data;
    } catch(error) {
        return error;
    }
};

const createNew = async(id, clientId, values) => {
    values.clientId = clientId;

    let status;
    await axios.post(`${API_URL}/employee/${id}/clients/${clientId}/contacts`, values)
      .then((response) => {
        status = response.status;
      })
      .catch((error) => {
        console.log(error);
      });

    return status;
};

const deleteById = async(id, clientId, contactId) => {
    let status;

    await axios.delete(`${API_URL}/employee/${id}/clients/${clientId}/contacts/${contactId}`)
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
    createNew,
    deleteById  
}