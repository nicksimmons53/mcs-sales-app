// Library Imports
import React, { Component } from 'react';
import { ScrollView } from 'react-native';

// ClientProfile_Admin.js
// Purpose: This class will display the client profile from an admin POV and
//          allow admins to push the client to Sage once finished
class ClientProfile_Admin extends Component {
    state = {
        client: null
    };

    componentDidMount( ) {
    }

    render( ) {
        return (
            <ScrollView>
                
            </ScrollView>
        );
    }
}

// Prop Validation
Profile.propTypes = {
  navigation: PropTypes.object
}

export default Profile;
