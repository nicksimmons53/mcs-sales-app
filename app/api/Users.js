import axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import S3 from '../helpers/S3';

const getBySub = async (sub) => {
  try {
    let result = await axios.get(`${API_URL}/users?sub=${sub}`);
    let user = result.data.user;
    await S3.createBucket(user.sageUserId + "-" + user.sageEmployeeNumber);

    return user;
  } catch(error) {
      return error;
  }
};  

module.exports = {
  getBySub
};