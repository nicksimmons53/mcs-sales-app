// Library Imports
import React from 'react';
import { View, ScrollView } from 'react-native';
import { colors, styles } from './Styles/SpreadSheet.style';
import { DataGridPricing } from '../components/DataGrid';
import { useForm } from 'react-hook-form';
import { LargeText } from '../components/Text';
import { levels, units } from '../form/dropdown/values';
import { useDispatch, useSelector } from 'react-redux';
import { getCountertopOptions } from '../redux/features/pricing/pricingThunk';

export const CabinetPricing = ( ) => {
  return (
    <View style={styles.spreadsheet}>
      <LargeText>Coming Soon...</LargeText>
    </View>
  );
}

export const CarpetPricing = (props) => {
  let carpetFlooring = props.parts.filter(row => row.programTable === "Carpet Flooring");
  let carpetPad = props.parts.filter(row => row.programTable === "Carpet Pad");
  let miscellaneous = props.parts.filter(row => row.programTable === "Miscellaneous");

  // Sort Levels
  let sortedValues = levels.map(level => level.value);
  carpetFlooring = sortedValues.map(level => carpetFlooring.find((o) => o.level === level)).filter(o => o);
  
  return (
    <ScrollView>
      <View style={{ backgroundColor: colors.black, flex: 1, paddingBottom: 300 }}>
        <DataGridPricing 
          title="Carpet Flooring" 
          program="Carpet"
          rows={carpetFlooring}
          header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
          choices={[levels, units, null, null, null, null]}
          components={["dropdown", "dropdown", "input", "input", "input", "input"]}
          newRow={{level: "", unit: "", cost: "", costWithTax: "", laborCost: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Carpet Pad" 
          program="Carpet"
          rows={carpetPad}
          header={["Description", "Unit", "Total"]}
          choices={[null, units, null]}
          components={["input", "dropdown", "input"]}
          newRow={{description: "", unit: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Miscellaneous" 
          program="Carpet"
          rows={miscellaneous}
          header={["Description", "Unit", "Total"]}
          choices={[null, units, null]}
          components={["input", "dropdown", "input"]}
          newRow={{description: "", unit: "", totalCost: ""}}/>
      </View>
    </ScrollView>
  );
}

export const CountertopPricing = (props) => {
  let options = useSelector((state) => state.pricing.countertopOptions);
  let edges = props.parts.filter(row => row.programTable === "Edges");
  let sinks = props.parts.filter(row => row.programTable === "Sinks");
  let miscellaneous = props.parts.filter(row => row.programTable === "Miscellaneous");
  let level1 = props.parts.filter(row => row.programTable === "Level 1");
  let level2 = props.parts.filter(row => row.programTable === "Level 2");
  let level3 = props.parts.filter(row => row.programTable === "Level 3");
  let level4 = props.parts.filter(row => row.programTable === "Level 4");
  let level5 = props.parts.filter(row => row.programTable === "Level 5");
  let level6 = props.parts.filter(row => row.programTable === "Level 6");
  let level7 = props.parts.filter(row => row.programTable === "Level 7");
  let level8 = props.parts.filter(row => row.programTable === "Level 8");
  let level9 = props.parts.filter(row => row.programTable === "Level 9");
  let level10 = props.parts.filter(row => row.programTable === "Level 10");

  return (
    <ScrollView>
      <View style={{ backgroundColor: colors.black, flex: 1, paddingBottom: 300 }}>
        <DataGridPricing 
          title="Edges" 
          program="Countertops"
          rows={edges}
          header={["Type", "Unit", "Total"]}
          choices={[null, units, null]}
          components={["input", "dropdown", "input"]}
          newRow={{type: "", unit: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Sinks" 
          program="Countertops"
          rows={sinks}
          header={["Description", "Unit", "Total"]}
          choices={[null, units, null]}
          components={["input", "dropdown", "input"]}
          newRow={{description: "", unit: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Miscellaneous" 
          program="Countertops"
          rows={miscellaneous}
          header={["Description", "Unit", "Total"]}
          choices={[null, units, null]}
          components={["input", "dropdown", "input"]}
          newRow={{description: "", unit: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Level 1" 
          program="Countertops"
          rows={level1}
          header={["Type", "Color", "Total"]}
          choices={[options.types, options.colors, null]}
          components={["dropdown", "dropdown", "input"]}
          newRow={{type: "", color: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Level 2" 
          program="Countertops"
          rows={level2}
          header={["Type", "Color", "Total"]}
          choices={[options.types, options.colors, null]}
          components={["dropdown", "dropdown", "input"]}
          newRow={{type: "", color: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Level 3" 
          program="Countertops"
          rows={level3}
          header={["Type", "Color", "Total"]}
          choices={[options.types, options.colors, null]}
          components={["dropdown", "dropdown", "input"]}
          newRow={{type: "", color: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Level 4" 
          program="Countertops"
          rows={level4}
          header={["Type", "Color", "Total"]}
          choices={[options.types, options.colors, null]}
          components={["dropdown", "dropdown", "input"]}
          newRow={{type: "", color: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Level 5" 
          program="Countertops"
          rows={level5}
          header={["Type", "Color", "Total"]}
          choices={[options.types, options.colors, null]}
          components={["dropdown", "dropdown", "input"]}
          newRow={{type: "", color: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Level 6" 
          program="Countertops"
          rows={level6}
          header={["Type", "Color", "Total"]}
          choices={[options.types, options.colors, null]}
          components={["dropdown", "dropdown", "input"]}
          newRow={{type: "", color: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Level 7" 
          program="Countertops"
          rows={level7}
          header={["Type", "Color", "Total"]}
          choices={[options.types, options.colors, null]}
          components={["dropdown", "dropdown", "input"]}
          newRow={{type: "", color: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Level 8" 
          program="Countertops"
          rows={level8}
          header={["Type", "Color", "Total"]}
          choices={[options.types, options.colors, null]}
          components={["dropdown", "dropdown", "input"]}
          newRow={{type: "", color: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Level 9" 
          program="Countertops"
          rows={level9}
          header={["Type", "Color", "Total"]}
          choices={[options.types, options.colors, null]}
          components={["dropdown", "dropdown", "input"]}
          newRow={{type: "", color: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Level 10" 
          program="Countertops"
          rows={level10}
          header={["Type", "Color", "Total"]}
          choices={[options.types, options.colors, null]}
          components={["dropdown", "dropdown", "input"]}
          newRow={{type: "", color: "", totalCost: ""}}/>
      </View>
    </ScrollView>
  );
};

export const TilePricing = (props ) => {
  let backsplashFireplaceWallTile = props.parts.filter(row => row.programTable === "Backsplash/Fireplace Wall Tile");
  let backsplashFireplaceDeco = props.parts.filter(row => row.programTable === "Backsplash/Fireplace Deco");
  let showerFloorTile = props.parts.filter(row => row.programTable === "Shower Floor - Tile");
  let showerFloorMesh = props.parts.filter(row => row.programTable === "Shower Floor - Mesh");
  let floorTile = props.parts.filter(row => row.programTable === "Floor Tile");
  let floorTileDeco = props.parts.filter(row => row.programTable === "Floor Tile Deco");
  let bathroomWallTile = props.parts.filter(row => row.programTable === "Bathroom Wall Tile");
  let decoWithWaterproofing = props.parts.filter(row => row.programTable === "Deco w/ Waterproofing");
  let floorStone = props.parts.filter(row => row.programTable === "Floor Stone");
  let bathroomWallStone = props.parts.filter(row => row.programTable === "Bathroom Wall Stone");
  let backsplashWallStone = props.parts.filter(row => row.programTable === "Backsplash Wall Stone");
  let fireplaceWallStone = props.parts.filter(row => row.programTable === "Fireplace Wall Stone");
  let showerFloorStone = props.parts.filter(row => row.programTable === "Shower Floor - Stone");
  let showerFloorDeco = props.parts.filter(row => row.programTable === "Shower Floor - Deco");
  let patterns = props.parts.filter(row => row.programTable === "Patterns");
  let accents = props.parts.filter(row => row.programTable === "Accents");
  let bathAccessories = props.parts.filter(row => row.programTable === "Bath Accessories");
  let miscellaneous = props.parts.filter(row => row.programTable === "Miscellaneous");

  // Sort Levels
  let sortedValues = levels.map(level => level.value);
  backsplashFireplaceWallTile = sortedValues.map(level => backsplashFireplaceWallTile.find((o) => o.level === level)).filter(o => o);
  backsplashFireplaceDeco = sortedValues.map(level => backsplashFireplaceDeco.find((o) => o.level === level)).filter(o => o);
  showerFloorTile = sortedValues.map(level => showerFloorTile.find((o) => o.level === level)).filter(o => o);
  showerFloorMesh = sortedValues.map(level => showerFloorMesh.find((o) => o.level === level)).filter(o => o);
  floorTile = sortedValues.map(level => floorTile.find((o) => o.level === level)).filter(o => o);
  floorTileDeco = sortedValues.map(level => floorTileDeco.find((o) => o.level === level)).filter(o => o);
  bathroomWallTile = sortedValues.map(level => bathroomWallTile.find((o) => o.level === level)).filter(o => o);
  decoWithWaterproofing = sortedValues.map(level => decoWithWaterproofing.find((o) => o.level === level)).filter(o => o);
  floorStone = sortedValues.map(level => floorStone.find((o) => o.level === level)).filter(o => o);
  bathroomWallStone = sortedValues.map(level => bathroomWallStone.find((o) => o.level === level)).filter(o => o);
  backsplashWallStone = sortedValues.map(level => backsplashWallStone.find((o) => o.level === level)).filter(o => o);
  fireplaceWallStone = sortedValues.map(level => fireplaceWallStone.find((o) => o.level === level)).filter(o => o);
  showerFloorStone = sortedValues.map(level => showerFloorStone.find((o) => o.level === level)).filter(o => o);
  showerFloorDeco = sortedValues.map(level => showerFloorDeco.find((o) => o.level === level)).filter(o => o);
  
  return (
    <ScrollView>
      <View style={{ backgroundColor: colors.black, flex: 1, paddingBottom: 300 }}>
        <DataGridPricing 
          title="Backsplash/Fireplace Wall Tile" 
          program="Tile"
          rows={backsplashFireplaceWallTile}
          header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
          choices={[levels, units, null, null, null, null]}
          components={["dropdown", "dropdown", "input", "input", "input", "input"]}
          newRow={{level: "", unit: "", cost: "", costWithTax: "", laborCost: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Backsplash/Fireplace Deco" 
          program="Tile"
          rows={backsplashFireplaceDeco}
          header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
          choices={[levels, units, null, null, null, null]}
          components={["dropdown", "dropdown", "input", "input", "input", "input"]}
          newRow={{level: "", unit: "", cost: "", costWithTax: "", laborCost: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Shower Floor - Tile" 
          program="Tile"
          rows={showerFloorTile}
          header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
          choices={[levels, units, null, null, null, null]}
          components={["dropdown", "dropdown", "input", "input", "input", "input"]}
          newRow={{level: "", unit: "", cost: "", costWithTax: "", laborCost: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Shower Floor - Mesh" 
          program="Tile"
          rows={showerFloorMesh}
          header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
          choices={[levels, units, null, null, null, null]}
          components={["dropdown", "dropdown", "input", "input", "input", "input"]}
          newRow={{level: "", unit: "", cost: "", costWithTax: "", laborCost: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Floor Tile" 
          program="Tile"
          rows={floorTile}
          header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
          choices={[levels, units, null, null, null, null]}
          components={["dropdown", "dropdown", "input", "input", "input", "input"]}
          newRow={{level: "", unit: "", cost: "", costWithTax: "", laborCost: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Floor Tile Deco" 
          program="Tile"
          rows={floorTileDeco}
          header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
          choices={[levels, units, null, null, null, null]}
          components={["dropdown", "dropdown", "input", "input", "input", "input"]}
          newRow={{level: "", unit: "", cost: "", costWithTax: "", laborCost: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Bathroom Wall Tile" 
          program="Tile"
          rows={bathroomWallTile}
          header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
          choices={[levels, units, null, null, null, null]}
          components={["dropdown", "dropdown", "input", "input", "input", "input"]}
          newRow={{level: "", unit: "", cost: "", costWithTax: "", laborCost: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Deco w/ Waterproofing" 
          program="Tile"
          rows={decoWithWaterproofing}
          header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
          choices={[levels, units, null, null, null, null]}
          components={["dropdown", "dropdown", "input", "input", "input", "input"]}
          newRow={{level: "", unit: "", cost: "", costWithTax: "", laborCost: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Floor Stone"
          program="Tile" 
          rows={floorStone}
          header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
          choices={[levels, units, null, null, null, null]}
          components={["dropdown", "dropdown", "input", "input", "input", "input"]}
          newRow={{level: "", unit: "", cost: "", costWithTax: "", laborCost: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Bathroom Wall Stone" 
          program="Tile"
          rows={bathroomWallStone}
          header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
          choices={[levels, units, null, null, null, null]}
          components={["dropdown", "dropdown", "input", "input", "input", "input"]}
          newRow={{level: "", unit: "", cost: "", costWithTax: "", laborCost: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Backsplash Wall Stone" 
          program="Tile"
          rows={backsplashWallStone}
          header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
          choices={[levels, units, null, null, null, null]}
          components={["dropdown", "dropdown", "input", "input", "input", "input"]}
          newRow={{level: "", unit: "", cost: "", costWithTax: "", laborCost: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Fireplace Wall Stone" 
          program="Tile"
          rows={fireplaceWallStone}
          header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
          choices={[levels, units, null, null, null, null]}
          components={["dropdown", "dropdown", "input", "input", "input", "input"]}
          newRow={{level: "", unit: "", cost: "", costWithTax: "", laborCost: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Shower Floor - Stone" 
          program="Tile"
          rows={showerFloorStone}
          header={["Level", "Unit", "Total"]}
          choices={[levels, units, null]}
          components={["dropdown", "input"]}
          newRow={{level: "", unit: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Shower Floor - Deco" 
          program="Tile"
          rows={showerFloorDeco}
          header={["Level", "Unit", "Total"]}
          choices={[levels, units, null]}
          components={["dropdown", "input"]}
          newRow={{level: "", unit: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Patterns" 
          program="Tile"
          rows={patterns}
          header={["Description", "Unit", "Total"]}
          choices={[null, units, null]}
          components={["input", "dropdown", "input"]}
          newRow={{description: "", unit: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Accents" 
          program="Tile"
          rows={accents}
          header={["Description", "Unit", "Total"]}
          choices={[null, units, null]}
          components={["input", "input"]}
          newRow={{description: "", unit: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Bath Accessories"
          program="Tile" 
          rows={bathAccessories}
          header={["Description", "Unit", "Total"]}
          choices={[null, units, null]}
          components={["input", "dropdown", "input"]}
          newRow={{description: "", unit: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Miscellaneous" 
          program="Tile"
          rows={miscellaneous}
          header={["Description", "Unit", "Total"]}
          choices={[null, units, null]}
          components={["input", "dropdown", "input"]}
          newRow={{description: "", unit: "", totalCost: ""}}/>
      </View>
    </ScrollView>
  );
}

export const LVPPricing = (props) => {
  let lvpFlooring = props.parts.filter(row => row.programTable === "LVP Flooring");
  let miscellaneous = props.parts.filter(row => row.programTable === "Miscellaneous");

  // Sort Levels
  let sortedValues = levels.map(level => level.value);
  lvpFlooring = sortedValues.map(level => lvpFlooring.find((o) => o.level === level)).filter(o => o);

  return (
    <ScrollView>
      <View style={{ backgroundColor: colors.black, flex: 1, paddingBottom: 300 }}>  
        <DataGridPricing 
          title="LVP Flooring" 
          program="LVP"
          rows={lvpFlooring}
          header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
          choices={[levels, units, null, null, null, null]}
          components={["dropdown", "dropdown", "input", "input", "input", "input"]}
          newRow={{level: "", unit: "", cost: "", costWithTax: "", laborCost: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Miscellaneous"
          program="LVP" 
          rows={miscellaneous}
          header={["Description", "Unit", "Total"]}
          choices={[null, units, null]}
          components={["input", "dropdown", "input"]}
          newRow={{description: "", unit: "", totalCost: ""}}/>
        </View>
    </ScrollView>
  );
}

export const WoodPricing = (props) => {
  let woodFlooring = props.parts.filter(row => row.programTable === "Wood Flooring");
  let miscellaneous = props.parts.filter(row => row.programTable === "Miscellaneous");

  // Sort Levels
  let sortedValues = levels.map(level => level.value);
  woodFlooring = sortedValues.map(level => woodFlooring.find((o) => o.level === level)).filter(o => o);

  return (
    <ScrollView>
      <View style={{ backgroundColor: colors.black, flex: 1, paddingBottom: 300 }}>
        <DataGridPricing 
          title="Wood Flooring"
          program="Wood" 
          rows={woodFlooring}
          header={["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"]}
          choices={[levels, units, null, null, null, null]}
          components={["dropdown", "dropdown", "input", "input", "input", "input"]}
          newRow={{level: "", unit: "", cost: "", costWithTax: "", laborCost: "", totalCost: ""}}/>
        <DataGridPricing 
          title="Miscellaneous" 
          program="Wood"
          rows={miscellaneous}
          header={["Description", "Unit", "Total"]}
          choices={[null, units, null]}
          components={["input", "dropdown", "input"]}
          newRow={{description: "", unit: "", totalCost: ""}}/>
      </View>
    </ScrollView>
  );
}