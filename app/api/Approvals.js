import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

const getAll = async(id) => {
    try {
        let result = await axios.get(`${API_URL}/clients/${id}/approvals`);
        
        return result.data;
    } catch(error) {
        return error;
    }
}

module.exports = {
  getAll
}