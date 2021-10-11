import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

const getCountertopOptions = async( ) => {
  try {
    let result = await axios.get(`${API_URL}/pricing/countertop_options`);

    return result.data;
  } catch(error) {
    return error;
  }
};

const getClientParts = async(id) => {
  try {
    let result = await axios.get(`${API_URL}/pricing/parts?clientId=${id}`);
    
    return result.data;
  } catch(error) {
    return error;
  }
};

const createClientParts = async(values) => {
  let status;

  await axios.post(`${API_URL}/pricing/parts`, values)
      .then((response) => {
          status = response.status;
      })
      .catch((error) => {
          console.log(error);
      });

  return status;
}

const deleteClientParts = async(id) => {
  let status;

  await axios.delete(`${API_URL}/pricing/parts/${id}`)
      .then((response) => {
          status = response.status;
      })
      .catch((error) => {
          console.log(error);
      });

  return status;
}

module.exports = {
  getCountertopOptions,
  getClientParts,
  createClientParts,
  deleteClientParts
}