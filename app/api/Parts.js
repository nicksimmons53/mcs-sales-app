import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

const getTile = async(userId, clientId, stateTables) => {
    try {
        stateTables.map(async(table, index) => {
            let query = `?client=${clientId}&program=tile&table=${table.name}`;        
            let result = await axios.get(`${API_URL}/employee/${userId}/clients/${clientId}/parts/${query}`);

            if (result.data.length != 0) {
                stateTables[index].rows.pop( );
                
                result.data.map((row, rowIndex) => {
                    for (var key in row) {
                        if (!stateTables[index].part.hasOwnProperty(key))
                            delete result.data[rowIndex][key];
                    }
    
                    stateTables[index].rows.push(row);
                });
            }
        });
        
        return stateTables;
    } catch(error) {
        console.log(error);
    }
};

const createNew = async(userId, clientId, row) => {
    let status;

    await axios.post(`${API_URL}/employee/${userId}/clients/${clientId}/parts`, row)
        .then((response) => {
            status = response.status;
        })
        .catch((error) => {
            console.log(error);
        })

    return status;
};

module.exports = {
    getTile,
    createNew
}