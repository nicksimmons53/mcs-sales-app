import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

const getToken = async( ) => {
  try {
    let result = await axios.get(`${API_URL}/sage/okta-token`);

    return result.data
  } catch (e) {
    return e;
  }
};

const getCompiledClient = async(clientId) => {
  try {
    let result = await axios.get(`${API_URL}/clients/${clientId}/compile-data`);

    return result.data;
  } catch (e) {
    return e;
  }
}

const createSageClient = async(client, token) => {
  await axios.post(`${API_URL}/sage/client`, { headers: { "Authorization" : token }})
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    })
}

const getPartClasses = async(token) => {
  try {
    let result = await axios.get(`${API_URL}/sage/partClass/last-class`, { headers: { "Authorization": token }});

    return result;
  } catch(e) {
    return e;
  }
}

const createPartClasses = async(body, token) => {
  await axios.post(`${API_URL}/sage/PartClass`, body, { headers: { "Authorization": token }})
    .then((result) => {
      return result
    })
    .catch((error) => {
      console.log(error)
    });
}

const createParts = async(body, token) => {
  await axios.post(`${API_URL}/sage/PartClass`, body, { headers: { "Authorization": token }})
    .then((result) => {
      return result
    })
    .catch((error) => {
      console.log(error)
    });
}

module.exports = {
  createPartClasses,
  createSageClient,
  getCompiledClient,
  getPartClasses,
  getToken
}