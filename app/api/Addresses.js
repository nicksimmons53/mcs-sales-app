import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

const getAll = async(id, clientId) => {
    try {
        let result = await axios.get(`${API_URL}/employee/${id}/clients/${clientId}/address`);
        return result.data;
    } catch(error) {
        return error;
    }
};

module.exports = {
    getAll
}