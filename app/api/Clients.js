import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

const getAll = async(id) => {
    try {
        let result = await axios.get(`${API_URL}/clients?userId=${id}`);
        
        return result.data;
    } catch(error) {
        return error;
    }
};

const getDetails = async(id) => {
    try {
        let result = await axios.get(`${API_URL}/details?clientId=${id}`);
         
        return result.data;
    } catch(error) {
        return error;
    }
};

const getById = async(id) => {
    try {
        let result = await axios.get(`${API_URL}/clients/${id}`);
         
        return result.data;
    } catch(error) {
        return error;
    }
}

const create = async(data) => {
    let apiResponse;
    
    await axios.post(`${API_URL}/clients`, data)
        .then((response) => {
            apiResponse = {data: {insertId: response.data.data.insertId, status: response.status}};
        })
        .catch((error) => {
            console.log(error);
        });
    
    return apiResponse;
};

const update = async(values) => {
    let status;

    await axios.put(`${API_URL}/clients/${values.id}`, values)
        .then((response) => {
            status = response.status;
        })
        .catch((error) => {
            console.log(error);
        });

    return status;
};

const updateDetails = async (values) => {
    let status;

    await axios.put(`${API_URL}/details?type=accounting_details&clientId=${values.id}`, values.accounting_details)
        .then((response) => {
            status = response.status;
            if (status < 200 || status > 299)
                return status;
        })
        .catch((error) => {
            console.log(error);
        });


    await axios.put(`${API_URL}/details?type=expediting_details&clientId=${values.id}`, values.expediting_details)
        .then((response) => {
            status = response.status;
            if (status < 200 || status > 299)
                return status;
        })
        .catch((error) => {
            console.log(error);
        });
    
    return status;
};

module.exports = {
    getAll,
    getDetails,
    getById,
    create,
    update,
    updateDetails
};



//   submitClient = async( ) => {
//     let user = this.props.user;
//     let client = this.props.client;
//     let parts = {
//       tile: null,
//       wood: null,
//       carpet: null,
//       vinyl: null,
//       countertops: null
//     };
    
//     this.loading( );

//     await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/tile-program`)
//       .then((response) => {
//         parts.tile = {
//           floorTile: [...response.data[0]],
//           bathroomWallTile: [...response.data[1]],
//           backsplashWallTile: [...response.data[2]],
//           fireplaceWallTile: [...response.data[3]],
//           floorStone: [...response.data[4]],
//           bathroomWallStone: [...response.data[5]],
//           backsplashWallStone: [...response.data[6]],
//           fireplaceWallStone: [...response.data[7]],
//           showerPansStone: [...response.data[8]],
//           showerPansTile: [...response.data[9]],
//           showerPansDeco: [...response.data[10]],
//           underlayment: [...response.data[11]],
//           patternCharges: [...response.data[12]],
//           accents: [...response.data[13]],
//           showerSeats: [...response.data[14]],
//           addOns: [...response.data[15]]
//         };
//       })
//       .catch((error) => {
//         console.log(error);
//       });


//     await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/wood-program`)
//       .then((response) => {
//         parts.wood = {
//           woodFlooring: [...response.data[0]],
//           underlayment: [...response.data[1]]
//         };
//       })
//       .catch((error) => {
//         console.log(error);
//       });

    
//     await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/carpet-program`)
//       .then((response) => {
//         parts.carpet = {
//           carpetFlooring: [...response.data[0]],
//           carpetPad: [...response.data[1]]
//         };
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/vinyl-program`)
//       .then((response) => {
//         parts.vinyl = {
//           vinylPlank: [...response.data[0]],
//           vinylSheet: [...response.data[1]],
//         };
//       })
//       .catch((error) => {
//         console.log(error);
//       });

    
//     await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/countertops-program`)
//       .then((response) => {
//         parts.countertops = {
//           edges: [...response.data[0]],
//           sinks: [...response.data[1]],
//           level1: [...response.data[2]],
//           level2: [...response.data[3]],
//           level3: [...response.data[4]],
//           level4: [...response.data[5]],
//           level5: [...response.data[6]],
//           level6: [...response.data[7]],
//           level7: [...response.data[8]],
//           level8: [...response.data[9]],
//           level9: [...response.data[10]],
//           level10: [...response.data[11]]
//         };
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/client-data`)
//       .then((response) => {
//         axios.post(`${API_URL}/submit-client`, { 
//             user: this.props.user,
//             client: this.props.client, 
//             tileProgramInfo: response.data.tileProgram, 
//             woodProgramInfo: response.data.woodProgram,
//             carpetProgramInfo: response.data.carpetProgram,
//             countertopProgramInfo: response.data.countertopProgram,
//             cabinetProgramInfo: response.data.cabinetProgram,
//             advancedInfo: response.data.clientInfo, 
//             contacts: response.data.contacts,
//             program: parts 
//           })
//           .then((response) => {
//             this.showSubmitToast( );
//             this.setState({ submitForApprovalDisabled: true });
//             this.setState({ pushToSageDisabled: true });
//             axios.put(`${API_URL}/employee/${user.recnum}/clients/${client.id}/manager-approvals`, {
//               'lisak': 0,
//               'heathera': 0,
//               'kimn': 0
//             })
//             .then((response) => {
//               console.log(response.staus)
//             })
//             .catch((error) => {
//               console.log(error);
//             })
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
      
//     this.loading( );
//   }

//   pushToSage = async( ) => {
//     let user = this.props.user;
//     let client = this.props.client;
//     let contacts = [ ];
//     let parts = {
//       tile: null,
//       wood: null,
//       carpet: null,
//       vinyl: null,
//       countertops: null
//     };

//     await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/tile-program`)
//       .then((response) => {
//         parts.tile = {
//           floorTile: [...response.data[0]],
//           bathroomWallTile: [...response.data[1]],
//           backsplashWallTile: [...response.data[2]],
//           fireplaceWallTile: [...response.data[3]],
//           floorStone: [...response.data[4]],
//           bathroomWallStone: [...response.data[5]],
//           backsplashWallStone: [...response.data[6]],
//           fireplaceWallStone: [...response.data[7]],
//           showerPansStone: [...response.data[8]],
//           showerPansTile: [...response.data[9]],
//           showerPansDeco: [...response.data[10]],
//           underlayment: [...response.data[11]],
//           patternCharges: [...response.data[12]],
//           accents: [...response.data[13]],
//           showerSeats: [...response.data[14]],
//           addOns: [...response.data[15]]
//         };
//       })
//       .catch((error) => {
//         console.log(error);
//       });


//     await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/wood-program`)
//       .then((response) => {
//         parts.wood = {
//           woodFlooring: [...response.data[0]],
//           underlayment: [...response.data[1]]
//         };
//       })
//       .catch((error) => {
//         console.log(error);
//       });

    
//     await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/carpet-program`)
//       .then((response) => {
//         parts.carpet = {
//           carpetFlooring: [...response.data[0]],
//           carpetPad: [...response.data[1]]
//         };
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/vinyl-program`)
//       .then((response) => {
//         parts.vinyl = {
//           vinylPlank: [...response.data[0]],
//           vinylSheet: [...response.data[1]],
//         };
//       })
//       .catch((error) => {
//         console.log(error);
//       });

    
//     await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/countertops-program`)
//       .then((response) => {
//         parts.countertops = {
//           edges: [...response.data[0]],
//           sinks: [...response.data[1]],
//           level1: [...response.data[2]],
//           level2: [...response.data[3]],
//           level3: [...response.data[4]],
//           level4: [...response.data[5]],
//           level5: [...response.data[6]],
//           level6: [...response.data[7]],
//           level7: [...response.data[8]],
//           level8: [...response.data[9]],
//           level9: [...response.data[10]],
//           level10: [...response.data[11]]
//         };
//       })
//       .catch((error) => {
//         console.log(error);
//       });
      
//     axios.post(`${API_URL}/employee/${user.recnum}/clients/${client.id}/push-to-sage`, { 
//         user: this.props.user,
//         client: this.props.client, 
//         contacts: this.state.contacts,
//         program: parts 
//       })
//       .then((res) => {
//         // Set pushed to Sage
//         axios.put(`${API_URL}/employee/${user.recnum}/clients/${client.id}/manager-approvals`, {
//             pushedToSage: true
//           })
//           .then(( ) => {
//             this.setState({ pushToSageDisabled: true });
//           })
//           .catch((error) => {
//             console.log(error);
//           })
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }