// Library Imports
import React from 'react';
import { View, ScrollView } from 'react-native';
import { colors, styles } from './Styles/SpreadSheet.style';
import { DataGridPricing } from '../components/DataGrid';
import { LargeText } from '../components/Text';

export const CabinetPricing = (props) => {
  return (
    <View style={styles.spreadsheet}>
      <LargeText>Coming Soon...</LargeText>
    </View>
  );
}

export const CarpetPricing = (props) => {
  return (
    <ScrollView style={styles.sv}>
      <View style={styles.spreadsheet}>
        <View style={{width: '75%'}}>
          <DataGridPricing 
            title="Carpet Flooring" 
            header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}/>
          <DataGridPricing 
            title="Carpet Pad" 
            header={["Level", "Unit", "Total"]}/>
        </View>
      </View>
    </ScrollView>
  );
}

export const CountertopPricing = (props) => {
  return (
    <ScrollView style={styles.sv}>
      <View style={styles.spreadsheet}>
        <View style={{width: '75%'}}>
          <DataGridPricing 
            title="Edges" 
            header={["Type", "Total"]}/>
          <DataGridPricing 
            title="Sinks/Shapes" 
            header={["Description", "Total"]}/>
          <DataGridPricing 
            title="Level 1" 
            header={["Type", "Color", "Total"]}/>
          <DataGridPricing 
            title="Level 2" 
            header={["Type", "Color", "Total"]}/>
          <DataGridPricing 
            title="Level 3" 
            header={["Type", "Color", "Total"]}/>
          <DataGridPricing 
            title="Level 4" 
            header={["Type", "Color", "Total"]}/>
          <DataGridPricing 
            title="Level 5" 
            header={["Type", "Color", "Total"]}/>
          <DataGridPricing 
            title="Level 6" 
            header={["Type", "Color", "Total"]}/>
          <DataGridPricing 
            title="Level 7" 
            header={["Type", "Color", "Total"]}/>
          <DataGridPricing 
            title="Level 8" 
            header={["Type", "Color", "Total"]}/>
          <DataGridPricing 
            title="Level 9" 
            header={["Type", "Color", "Total"]}/>
          <DataGridPricing 
            title="Level 10" 
            header={["Type", "Color", "Total"]}/>
        </View>
      </View>
    </ScrollView>
  );
};

export const TilePricing = (props) => {
  React.useEffect(( ) => {
  }, [ ]);

  return (
    <ScrollView style={styles.sv}>
      <View style={styles.spreadsheet}>
        <View style={{width: '75%'}}>
          <DataGridPricing 
            title="Floor Tile" 
            header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}/>
          <DataGridPricing 
            title="Bathroom Wall Tile" 
            header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}/>
          <DataGridPricing 
            title="Backsplash Wall Tile" 
            header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}/>
          <DataGridPricing 
            title="Fireplace Wall Tile" 
            header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}/>
          <DataGridPricing 
            title="Floor Stone" 
            header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}/>
          <DataGridPricing 
            title="Bathroom Wall Stone" 
            header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}/>
          <DataGridPricing 
            title="Backsplash Wall Stone" 
            header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}/>
          <DataGridPricing 
            title="Fireplace Wall Stone" 
            header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}/>
          <DataGridPricing 
            title="Shower Pans - Stone" 
            header={["Level", "Total"]}/>
          <DataGridPricing 
            title="Shower Pans - Tile" 
            header={["Level", "Total"]}/>
          <DataGridPricing 
            title="Shower Pans - Deco" 
            header={["Level", "Total"]}/>
          <DataGridPricing 
            title="Underlayment" 
            header={["Description", "Total"]}/> 
          <DataGridPricing 
            title="Pattern Charges" 
            header={["Description", "Total"]}/>
          <DataGridPricing 
            title="Accents" 
            header={["Description", "Total"]}/>
          <DataGridPricing 
            title="Shower Seats" 
            header={["Description", "Unit", "Total"]}/>
          <DataGridPricing 
            title="Add-Ons" 
            header={["Description", "Unit", "Total"]}/>
        </View>
      </View>
    </ScrollView>
  );
}

export const VinylPricing = (props) => {
  return (
    <ScrollView style={styles.sv}>
      <View style={styles.spreadsheet}>
        <View style={{width: '75%'}}>
          <DataGridPricing 
            title="Vinyl Plank" 
            header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}/>
          <DataGridPricing 
            title="Vinyl Sheet" 
            header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}/>
        </View>
      </View>
    </ScrollView>
  );
}

export const WoodPricing = (props) => {
  return (
    <ScrollView style={styles.sv}>
      <View style={styles.spreadsheet}>
        <View style={{width: '75%'}}>
          <DataGridPricing 
            title="Wood Flooring" 
            header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}/>
          <DataGridPricing 
            title="Underlayment" 
            header={["Description", "Total"]}/>
        </View>
      </View>
    </ScrollView>
  );
}