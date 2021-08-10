import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

const getTile = async(id, clientId) => {
    try {
        let result = await axios.get(`${API_URL}/employee/${id}/clients/${clientId}/program/tileProgram`);
        return result.data;
    } catch(error) {
        return error;
    }
};

const getWood = async(id, clientId) => {
    try {
        let result = await axios.get(`${API_URL}/employee/${id}/clients/${clientId}/program/woodProgram`);
        return result.data;
    } catch(error) {
        return error;
    }
};

const getCarpet = async(id, clientId) => {
    try {
        let result = await axios.get(`${API_URL}/employee/${id}/clients/${clientId}/program/carpetProgram`);
        return result.data;
    } catch(error) {
        return error;
    }
};

const getCountertop = async(id, clientId) => {
    try {
        let result = await axios.get(`${API_URL}/employee/${id}/clients/${clientId}/program/countertopProgram`);
        return result.data;
    } catch(error) {
        return error;
    }
};

const getCabinet = async(id, clientId) => {
    try {
        let result = await axios.get(`${API_URL}/employee/${id}/clients/${clientId}/program/cabinetProgram`);
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
    getTile,
    getWood,
    getCarpet,
    getCountertop,
    getCabinet,
    createNew
};