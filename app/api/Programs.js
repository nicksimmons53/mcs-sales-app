import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

const getAll = async(clientId) => {
    try {
        let result = await axios.get(`${API_URL}/programs?clientId=${clientId}`);
        return result.data;
    } catch(error) {
        return error;
    }
};

const update = async(values) => {
    let status;

    await axios.put(`${API_URL}/programs?clientId=${values.id}`, values.programs)
        .then((response) => {
            status = response.status;
        })
        .catch((error) => {
            console.log(error);
        });

    return status;
}

const getByName = async(clientId, programName) => {
    try {
        let result = await axios.get(`${API_URL}/programs?clientId=${clientId}&program=${programName}`);
        return result.data;
    } catch(error) {
        return error;
    }
};

const createNew = async(id, clientId, program, values) => {
    let status;

    await axios.post(`${API_URL}/employee/${id}/clients/${clientId}/program/${program}`, values)
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
    update,
    getByName,
    createNew
};