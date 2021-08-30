import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

const getByEmail = async (email) => {
  console.log(API_URL);
  try {
    let result = await axios.get(`${API_URL}/users?email=${email}`);
    return result.data;
  } catch(error) {
      return error;
  }
};  

module.exports = {
  getByEmail
};