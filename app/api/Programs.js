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

const getByName = async(values) => {
    try {
        let result = await axios.get(`${API_URL}/programs/info?clientId=${values.id}&programName=${values.program}`);

        return result.data;
    } catch(error) {
        return error;
    }
};

const createByName = async(values) => {
    let status;

    await axios.post(`${API_URL}/programs/info?programName=${values.program}`, values.info)
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
    update,
    getByName,
    createByName
};