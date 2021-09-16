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

const create = async(object) => {
    let status;
    console.log(object);
    await axios.post(`${API_URL}/clients/${object.id}/contacts`, object.values)
      .then((response) => {
        status = response.status;
      })
      .catch((error) => {
        console.log(error);
      });

    return status;
};

const deleteById = async(object) => {
    let status;

    await axios.delete(`${API_URL}/clients/${object.clientId}/contacts/${object.id}`)
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
    create,
    deleteById  
}