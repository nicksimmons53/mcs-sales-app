// Library Imports
import React from 'react';
import { View, StatusBar, KeyboardAvoidingView } from 'react-native';
import { Divider } from 'react-native-elements';
import { useSelector } from 'react-redux';
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

function Pricing(navigation) {
  const [ selected, setSelected ] = React.useState( );
  let programs = useSelector((state) => state.programs.entities);

  return (
    <KeyboardAvoidingView enabled behavior='padding' style={styles.background}>
      <StatusBar barStyle='light-content'/>
      
      <View style={styles.infoContainer}>
        <Header title="Client Program Pricing">
          <ActionButtonMedium title="Import In-House Program" action={( ) => console.log("Import in-house program")}/>
        </Header>

        <Divider/>

        <View style={{flexDirection: 'row', height: '100%', width: '100%'}}>
          <Drawer.Section title="Programs" style={{backgroundColor: colors.white, width: '15%'}}>
            { Object.keys(programs).map((program, index) => (
              <>
                { programs[program] === 1 &&
                  <Drawer.Item 
                    key={index}
                    active={selected === program} 
                    label={program.charAt(0).toUpperCase( ) + program.slice(1)}
                    onPress={( ) => setSelected(program)}/>
                }
              </>
            ))}
          </Drawer.Section>
          
          { selected === "cabinets" && <CabinetPricing/> }

          { selected === "tile" && <TilePricing/> }
          
          { selected === "carpet" && <CarpetPricing/> }
          
          { selected === "vinyl" && <LVPPricing/> }
          
          { selected === "wood" && <WoodPricing/> }
          
          { selected === "countertops" && <CountertopPricing/> }
        </View>
      </View>

      <FloatingButton action={( ) => navigation.navigation.pop(1) } icon="arrow-left"/>
    </KeyboardAvoidingView>
  );
}

export default Pricing;
