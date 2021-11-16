// Library Imports
import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Divider } from 'react-native-elements';
import styles from '../styles/Screen';
import Header from '../components/Header';
import { 
    CabinetProgramForm, 
    CarpetProgramForm, 
    CountertopProgramForm, 
    TileProgramForm,
    WoodProgramForm 
} from '../Modules/ProgramSpecForms';
import { Drawer } from 'react-native-paper';
import { StatusBar } from 'react-native';
import colors from '../Library/Colors';
import FloatingButton from '../components/FloatingButton';

// Class Component that will display client creation form
function Program(navigation) {
    const [ selected, setSelected ] = React.useState( );
    let programs = useSelector((state) => state.programs.entities);

    console.log(programs)
    
    return programs !== null && (
        <KeyboardAvoidingView behavior='padding' enabled style={styles.background}>
            <StatusBar barStyle="light-content"/>

            <View style={styles.infoContainer}>
                <Header title="Client Program Details"/>

                <Divider/>

                <View style={{flexDirection: 'row', height: '100%', width: '100%'}}>
                    <Drawer.Section title="Programs" style={{backgroundColor: colors.white, width: '15%'}}>
                        { Object.keys(programs).map((program, index) => (
                            <View key={index}>
                                { programs[program] === 1 &&
                                    <Drawer.Item 
                                        active={selected === program} 
                                        label={program.charAt(0).toUpperCase( ) + program.slice(1)}
                                        onPress={( ) => setSelected(program)}/>
                                }
                            </View>
                        ))}
                    </Drawer.Section>
                    
                    { selected === "cabinets" && <CabinetProgramForm/> }

                    { selected === "tile" && <TileProgramForm/> }
                    
                    { selected === "carpet" && <CarpetProgramForm/> }
                    
                    { selected === "vinyl" && <WoodProgramForm/> }
                    
                    { selected === "wood" && <WoodProgramForm/> }
                    
                    { selected === "countertops" && <CountertopProgramForm/> }
                </View>
            </View>
      
            <FloatingButton action={( ) => navigation.navigation.pop(1)} icon="arrow-left"/>
        </KeyboardAvoidingView>
    );
}

export default Program;