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
import { CabinetPricing, CarpetPricing, CountertopPricing, TilePricing, VinylPricing, WoodPricing } from '../Modules/PricingTables';

function Pricing(navigation) {
  const [ program, setProgram ] = React.useState("Carpet");

  return (
    <KeyboardAvoidingView enabled behavior='padding' style={styles.background}>
      <StatusBar barStyle='light-content'/>
      <View style={styles.row}>
        <View style={styles.grid}>
          <Header title="Client Program Pricing"/>

          <Divider/>

          <View style={{flexDirection: 'row', height: '100%'}}>
            <Drawer.Section style={{backgroundColor: colors.white, width: '15%'}}>
              <Drawer.Item active={program === "Cabinets"} label="Cabinets" onPress={( ) => setProgram("Cabinets")}/>
              <Drawer.Item active={program === "Carpet"} label="Carpet" onPress={( ) => setProgram("Carpet")}/>
              <Drawer.Item active={program === "Countertops"} label="Countertops" onPress={( ) => setProgram("Countertops")}/>
              <Drawer.Item active={program === "Tile"} label="Tile" onPress={( ) => setProgram("Tile")}/>
              <Drawer.Item active={program === "Vinyl"} label="Vinyl" onPress={( ) => setProgram("Vinyl")}/>
              <Drawer.Item  active={program === "Wood"}label="Wood" onPress={( ) => setProgram("Wood")}/>
            </Drawer.Section>
            
            {/* {program === "Cabinets" && <CabinetPricing/> } */}

            { program === "Tile" && <TilePricing/> }
            
            {/* {program === "Carpet" && <CarpetPricing/> }
            
            {program === "Vinyl" && <VinylPricing/> }
            
            {program === "Wood" && <WoodPricing/> }
            
            {program === "Countertops" && <CountertopPricing/> } */}
          </View>
        </View>    
      </View>

      <FloatingButton action={( ) => navigation.navigation.pop(1) } icon="arrow-left"/>
    </KeyboardAvoidingView>
  );
}

export default Pricing;
