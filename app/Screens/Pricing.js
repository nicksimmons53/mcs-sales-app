// Library Imports
import React from 'react';
import { View, StatusBar, KeyboardAvoidingView } from 'react-native';
import { Divider } from 'react-native-elements';
import { useDispatch, useSelector, useStore } from 'react-redux';
import FloatingButton from '../components/FloatingButton';
import Header from '../components/Header';
import styles from '../styles/Screen';
import { Drawer } from 'react-native-paper';
import colors from '../Library/Colors';
import { 
  CabinetPricing, 
  CarpetPricing, 
  CountertopPricing, 
  LVPPricing, 
  TilePricing, 
  WoodPricing 
} from '../Modules/PricingTables';
import { ActionButtonMedium } from '../components/Button';
import { createClientParts, getClientParts, getCountertopOptions, getInHouseProgram } from '../redux/features/pricing/pricingThunk';
import AnimatedLoader from 'react-native-animated-loader';
import { show, setMessage } from '../redux/features/snackbar/snackbarSlice';
import { unwrapResult } from '@reduxjs/toolkit';

function Pricing(navigation) {
  const dispatch = useDispatch( );
  const [ selected, setSelected ] = React.useState( );
  const [ visible, setVisible ] = React.useState(true);
  const [ disableImport, setDisableImport ] = React.useState(false);
  let client = useSelector((state) => state.clients.selected);
  let programs = useSelector((state) => state.programs.entities);
  let parts = useSelector((state) => state.pricing.parts);
  let loading = useSelector((state) => state.pricing.loading);

  React.useEffect(( ) => {
    const getParts = async( ) => {
      await dispatch(getClientParts(client.id));

      await dispatch(getCountertopOptions( ));
    }

    getParts( );
  }, [ ]);

  if (parts.length === 0 && loading === true) {
    return (
      <AnimatedLoader
        visible={true}
        animationStyle={{ height: 200, width: 200 }}
        speed={1}
        source={require("../../assets/7899-loading.json")}/>
    );
  };

  importInHouseProgram = async( ) => {
    setDisableImport(true);
    
    let resultAction = await dispatch(getInHouseProgram( ));
    let parts = unwrapResult(resultAction);

    // Save All Parts
    let responses = [];
    Object.keys(parts).forEach(program => {
      parts[program].forEach(async(row) => {
        let newRow = {
          color: row.color,
          clientId: client.id,
          cost: row.cost,
          costWithTax: row.costWithTax,
          description: row.description,
          laborCost: row.laborCost,
          level: row.level,
          program: row.program,
          programTable: row.programTable,
          sagePartDescription: row.sagePartDescription,
          totalCost: row.totalCost,
          type: row.type,
          unit: row.unit
        };
  
        let response = await dispatch(createClientParts(newRow));
  
        responses.push(response.payload);
      });
    });

    let errors = responses.filter(status => status < 200 || status > 200);
    if (errors.length === 0) {
      dispatch(setMessage(`In-House Program was imported successfully. You may need to refresh the page.`));
    }
    
    dispatch(show( ));
    setDisableImport(false);
  };

  return (
    <KeyboardAvoidingView enabled behavior='padding' style={styles.background}>
      <StatusBar barStyle='light-content'/>
      
      <View style={styles.infoContainer}>
        <Header title="Client Program Pricing">
          <ActionButtonMedium 
            title="Import In-House Program" 
            disabled={disableImport}
            action={( ) => importInHouseProgram( )}/>
        </Header>

        <Divider/>

        <View style={{flexDirection: 'row', height: '100%', width: '100%'}}>
          <Drawer.Section title="Programs" style={{backgroundColor: colors.white, width: '15%'}}>
            <Divider/>
            { Object.keys(programs).map((program, index) => (
              <View key={index}>
                { programs[program] === 1 &&
                  <Drawer.Item 
                    key={index}
                    active={selected === program} 
                    label={program.charAt(0).toUpperCase( ) + program.slice(1)}
                    onPress={( ) => {
                      setSelected(program);
                      dispatch(getClientParts(client.id));
                    }}/>
                }
              </View>
            ))}
          </Drawer.Section>
          
          { selected === "cabinets" && <CabinetPricing/> }

          { selected === "tile" && <TilePricing parts={parts.tile}/> }
          
          { selected === "carpet" && <CarpetPricing parts={parts.carpet}/> }
          
          { selected === "vinyl" && <LVPPricing parts={parts.vinyl}/> }
          
          { selected === "wood" && <WoodPricing parts={parts.wood}/> }
          
          { selected === "countertops" && <CountertopPricing parts={parts.countertops}/> }
        </View>
      </View>

      <FloatingButton action={( ) => navigation.navigation.pop(1) } icon="arrow-left"/>
    </KeyboardAvoidingView>
  );
}

export default Pricing;