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
    <ScrollView style={styles.form}>
      <DataGridPricing 
        title="Carpet Flooring" 
        program="Carpet"
        header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
        components={["dropdown", "dropdown", "input", "input", "input", "input"]}
        newRow={{level: "", unit: "", material: "", materialWithTax: "", labor: "", total: ""}}/>
      <DataGridPricing 
        title="Carpet Pad" 
        header={["Description", "Unit", "Total"]}
        components={["input", "dropdown", "input"]}
        newRow={{level: "", unit: "", total: ""}}/>
      <DataGridPricing 
        title="Miscellaneous" 
        header={["Description", "Unit", "Total"]}
        components={["input", "dropdown", "input"]}
        newRow={{level: "", unit: "", total: ""}}/>
    </ScrollView>
  );
}

export const CountertopPricing = (props) => {
  return (
    <ScrollView style={styles.form}>
      <DataGridPricing 
        title="Edges" 
        program="Countertops"
        header={["Type", "Unit", "Total"]}
        components={["dropdown", "dropdown", "input"]}
        newRow={{type: "", unit: "", total: ""}}/>
      <DataGridPricing 
        title="Sinks" 
        program="Countertops"
        header={["Description", "Unit", "Total"]}
        components={["input", "dropdown", "input"]}
        newRow={{description: "", unit: "", total: ""}}/>
      <DataGridPricing 
        title="Level 1" 
        program="Countertops"
        header={["Type", "Color", "Total"]}
        components={["dropdown", "dropdown", "input"]}
        newRow={{type: "", color: "", total: ""}}/>
      <DataGridPricing 
        title="Level 2" 
        program="Countertops"
        header={["Type", "Color", "Total"]}
        components={["dropdown", "dropdown", "input"]}
        newRow={{type: "", color: "", total: ""}}/>
      <DataGridPricing 
        title="Level 3" 
        program="Countertops"
        header={["Type", "Color", "Total"]}
        components={["dropdown", "dropdown", "input"]}
        newRow={{type: "", color: "", total: ""}}/>
      <DataGridPricing 
        title="Level 4" 
        program="Countertops"
        header={["Type", "Color", "Total"]}
        components={["dropdown", "dropdown", "input"]}
        newRow={{type: "", color: "", total: ""}}/>
      <DataGridPricing 
        title="Level 5" 
        program="Countertops"
        header={["Type", "Color", "Total"]}
        components={["dropdown", "dropdown", "input"]}
        newRow={{type: "", color: "", total: ""}}/>
      <DataGridPricing 
        title="Level 6" 
        program="Countertops"
        header={["Type", "Color", "Total"]}
        components={["dropdown", "dropdown", "input"]}
        newRow={{type: "", color: "", total: ""}}/>
      <DataGridPricing 
        title="Level 7" 
        program="Countertops"
        header={["Type", "Color", "Total"]}
        components={["dropdown", "dropdown", "input"]}
        newRow={{type: "", color: "", total: ""}}/>
      <DataGridPricing 
        title="Level 8" 
        program="Countertops"
        header={["Type", "Color", "Total"]}
        components={["dropdown", "dropdown", "input"]}
        newRow={{type: "", color: "", total: ""}}/>
      <DataGridPricing 
        title="Level 9" 
        program="Countertops"
        header={["Type", "Color", "Total"]}
        components={["dropdown", "dropdown", "input"]}
        newRow={{type: "", color: "", total: ""}}/>
      <DataGridPricing 
        title="Level 10" 
        program="Countertops"
        header={["Type", "Color", "Total"]}
        components={["dropdown", "dropdown", "input"]}
        newRow={{type: "", color: "", total: ""}}/>
    </ScrollView>
  );
};

export const TilePricing = ( ) => {
  return (
    <ScrollView style={styles.form}>
      <DataGridPricing 
        title="Backsplash/Fireplace Wall Tile" 
        program="Tile"
        header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
        components={["dropdown", "dropdown", "input", "input", "input", "input"]}
        newRow={{level: "", unit: "", material: "", materialWithTax: "", labor: "", total: ""}}/>
      <DataGridPricing 
        title="Backsplash/Fireplace Deco" 
        program="Tile"
        header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
        components={["dropdown", "dropdown", "input", "input", "input", "input"]}
        newRow={{level: "", unit: "", material: "", materialWithTax: "", labor: "", total: ""}}/>
      <DataGridPricing 
        title="Shower Floor - Tile" 
        program="Tile"
        header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
        components={["dropdown", "dropdown", "input", "input", "input", "input"]}
        newRow={{level: "", unit: "", material: "", materialWithTax: "", labor: "", total: ""}}/>
      <DataGridPricing 
        title="Shower Floor - Mesh" 
        program="Tile"
        header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
        components={["dropdown", "dropdown", "input", "input", "input", "input"]}
        newRow={{level: "", unit: "", material: "", materialWithTax: "", labor: "", total: ""}}/>
      <DataGridPricing 
        title="Floor Tile" 
        program="Tile"
        header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
        components={["dropdown", "dropdown", "input", "input", "input", "input"]}
        newRow={{level: "", unit: "", material: "", materialWithTax: "", labor: "", total: ""}}/>
      <DataGridPricing 
        title="Floor Tile Deco" 
        program="Tile"
        header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
        components={["dropdown", "dropdown", "input", "input", "input", "input"]}
        newRow={{level: "", unit: "", material: "", materialWithTax: "", labor: "", total: ""}}/>
      <DataGridPricing 
        title="Bathroom Wall Tile" 
        program="Tile"
        header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
        components={["dropdown", "dropdown", "input", "input", "input", "input"]}
        newRow={{level: "", unit: "", material: "", materialWithTax: "", labor: "", total: ""}}/>
      <DataGridPricing 
        title="Deco w/ Waterproofing" 
        program="Tile"
        header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
        components={["dropdown", "dropdown", "input", "input", "input", "input"]}
        newRow={{level: "", unit: "", material: "", materialWithTax: "", labor: "", total: ""}}/>
      <DataGridPricing 
        title="Floor Stone"
        program="Tile" 
        header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
        components={["dropdown", "dropdown", "input", "input", "input", "input"]}
        newRow={{level: "", unit: "", material: "", materialWithTax: "", labor: "", total: ""}}/>
      <DataGridPricing 
        title="Bathroom Wall Stone" 
        program="Tile"
        header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
        components={["dropdown", "dropdown", "input", "input", "input", "input"]}
        newRow={{level: "", unit: "", material: "", materialWithTax: "", labor: "", total: ""}}/>
      <DataGridPricing 
        title="Backsplash Wall Stone" 
        program="Tile"
        header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
        components={["dropdown", "dropdown", "input", "input", "input", "input"]}
        newRow={{level: "", unit: "", material: "", materialWithTax: "", labor: "", total: ""}}/>
      <DataGridPricing 
        title="Fireplace Wall Stone" 
        program="Tile"
        header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
        components={["dropdown", "dropdown", "input", "input", "input", "input"]}
        newRow={{level: "", unit: "", material: "", materialWithTax: "", labor: "", total: ""}}/>
      <DataGridPricing 
        title="Shower Floor - Stone" 
        program="Tile"
        header={["Level", "Total"]}
        components={["dropdown", "input"]}
        newRow={{level: "", total: ""}}/>
      <DataGridPricing 
        title="Shower Floor - Deco" 
        program="Tile"
        header={["Level", "Total"]}
        components={["dropdown", "input"]}
        newRow={{level: "", total: ""}}/>
      <DataGridPricing 
        title="Patterns" 
        program="Tile"
        header={["Description", "Unit", "Total"]}
        components={["input", "dropdown", "input"]}
        newRow={{description: "", dropdown: "", total: ""}}/>
      <DataGridPricing 
        title="Accents" 
        program="Tile"
        header={["Description", "Total"]}
        components={["input", "input"]}
        newRow={{description: "", total: ""}}/>
      <DataGridPricing 
        title="Bath Accessories"
        program="Tile" 
        header={["Description", "Unit", "Total"]}
        components={["input", "dropdown", "input"]}
        newRow={{description: "", unit: "", total: ""}}/>
      <DataGridPricing 
        title="Miscellaneous" 
        program="Tile"
        header={["Description", "Unit", "Total"]}
        components={["input", "dropdown", "input"]}
        newRow={{description: "", unit: "", total: ""}}/>
    </ScrollView>
  );
}

export const LVPPricing = (props) => {
  return (
    <ScrollView style={styles.form}>
      <DataGridPricing 
        title="LVP Flooring" 
        program="LVP"
        header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
        components={["dropdown", "dropdown", "input", "input", "input", "input"]}
        newRow={{level: "", unit: "", material: "", materialWithTax: "", labor: "", total: ""}}/>
      <DataGridPricing 
        title="Miscellaneous"
        program="LVP" 
        header={["Description", "Unit", "Total"]}
        components={["input", "dropdown", "input"]}
        newRow={{description: "", unit: "", total: ""}}/>
    </ScrollView>
  );
}

export const WoodPricing = (props) => {
  return (
    <ScrollView style={styles.form}>
      <DataGridPricing 
        title="Wood Flooring"
        program="Wood" 
        header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
        components={["dropdown", "dropdown", "input", "input", "input", "input"]}
        newRow={{level: "", unit: "", material: "", materialWithTax: "", labor: "", total: ""}}/>
      <DataGridPricing 
        title="Miscellaneous" 
        program="Wood"
        header={["Description", "Unit", "Total"]}
        components={["input", "dropdown", "input"]}
        newRow={{description: "", total: ""}}/>
    </ScrollView>
  );
}