// Library Imports
import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { View, Text } from 'react-native';;
import { Divider } from 'react-native-elements';
import Programs from '../api/Programs';
import { SuccessButtonLarge } from '../components/Button';
import Dropdown from '../components/Dropdown';
import Input from '../components/Input';
import { MediumText, SmallText } from '../components/Text';
import { cabinets, carpet, countertops, tile, wood, yesOrNo } from '../form/dropdown/values';
import { styles, colors } from './Styles/Form.style';

let zIndex=100;

export const CabinetProgramForm = ( ) => {
	const { control, handleSubmit, setValue, formState: { errors } } = useForm( );
    
  return (
    <ScrollView style={styles.form}>
      <MediumText>Cabinet Program</MediumText>    

      <Divider/>

      <View style={{ flexDirection: 'row', zIndex: zIndex }}>     
        <View style={{ flex: 1, flexDirection: 'column', padding: 5 }}>
          <SmallText>Preferences</SmallText>

          <Input
            label="Preferred Colors"
            control={control}
            errors={errors}
            field=""
            defaultValue=""
            multiline/>
          <Input
            label="Preferred Style"
            control={control}
            errors={errors}
            field=""
            defaultValue=""/>
          <Input
            label="Overlay"
            control={control}
            errors={errors}
            field=""
            defaultValue=""/>
          <Input
            label="Preferences on Crown"
            control={control}
            errors={errors}
            field=""
            defaultValue=""/>
          <Dropdown
            label="Bid Type Preferences"
            items={cabinets.bidTypes}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
        </View>

        <Divider orientation="vertical" style={{ marginHorizontal: 10 }}/>

        <View style={{ flex: 1, flexDirection: 'column', padding: 5 }}>
          <SmallText>Standards</SmallText>

          <Input
            label="Upper Cabinet Standard Specs."
            control={control}
            errors={errors}
            field=""
            defaultValue=""/>
          <Input
            label="Vanity Height Standard Specs."
            control={control}
            errors={errors}
            field=""
            defaultValue=""/>
          <Dropdown
            label="Is Soft Close Standard?"
            items={yesOrNo}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Any Areas Optioned Out?"
            control={control}
            errors={errors}
            field=""
            defaultValue=""/>
        </View>
      </View>

      <Divider/>  

      <View style={{ padding: 5 }}>
        <Input
          label="Notes"
          control={control}
          errors={errors}
          field=""
          defaultValue=""
          multiline/>
      </View>

      <Divider style={{ marginVertical: 10 }}/>

      <View style={{ alignItems: 'center' }}>
        <SuccessButtonLarge title='Save' action={( ) => console.log("SAVE BABY")}/>
      </View>
    </ScrollView>
  );
};

export const CarpetProgramForm = ( ) => {
	const { control, handleSubmit, setValue, formState: { errors } } = useForm( );
    
  return (
    <ScrollView style={styles.form}>
      <MediumText>Carpet Program</MediumText> 

      <Divider/>

      <View style={{ flexDirection: 'row', zIndex: zIndex }}>     
        <View style={{ flex: 1, flexDirection: 'column', padding: 5 }}>
          <SmallText>Preferences</SmallText>

          <Dropdown
            label="Preferred Padding Brand"
            items={carpet.carpetPad}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
        </View>

        <Divider orientation="vertical" style={{ marginHorizontal: 10 }}/>

        <View style={{ flex: 1, flexDirection: 'column', padding: 5 }}>
          <SmallText>Information</SmallText>

          <Dropdown
            label="Who Will be Doing Takeoffs?"
            items={carpet.takeoffResp}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Waste Factor Percentage"
            control={control}
            errors={errors}
            field=""
            defaultValue=""/>
        </View>
      </View>

      <Divider style={{ zIndex: 0 }}/>

      <View style={{ padding: 5, zIndex: 0 }}>
        <Input
          label="Notes"
          control={control}
          errors={errors}
          field=""
          defaultValue=""
          multiline/>
      </View>

      <Divider style={{ marginVertical: 10 }}/>

      <View style={{ alignItems: 'center' }}>
        <SuccessButtonLarge title='Save' action={( ) => console.log("SAVE BABY")}/>
      </View>
    </ScrollView>
  );
};

export const CountertopProgramForm = ( ) => {
	const { control, handleSubmit, setValue, formState: { errors } } = useForm( );
    
  return (
    <ScrollView style={styles.form}>
      <Text style={styles.headerText}>Countertop Program</Text>    

      <Divider/>

      <View style={{ flexDirection: 'row', zIndex: zIndex }}>     
        <View style={{ flex: 1, flexDirection: 'column', padding: 5 }}>
          <SmallText>Preferences</SmallText>
          
          <Dropdown
            label="Preferred Material Thickness"
            items={countertops.materialThickness}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Dropdown
            label="Preferred Edge"
            items={countertops.edges}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
        </View>

        <Divider orientation="vertical" style={{ marginHorizontal: 10 }}/>

        <View style={{ flex: 1, flexDirection: 'column', padding: 5 }}>
          <SmallText>Standards</SmallText>

          <Dropdown
            label="Waterfall Sides - Standard or Option?"
            items={countertops.standardOrOption}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Dropdown
            label="Faucet Holes?"
            items={yesOrNo}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Stove Range Specifications"
            control={control}
            errors={errors}
            field=""
            defaultValue=""/>
        </View>
      </View>

      <Divider style={{ zIndex: 0 }}/>

      <View style={{ flexDirection: 'row', zIndex: zIndex }}>     
        <View style={{ flex: 1, flexDirection: 'column', padding: 5 }}>
          <SmallText>Information</SmallText>
  
          <Dropdown
            label="Who Will be Doing Takeoffs?"
            items={countertops.takeoffResp}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Waste Factor Percentage"
            control={control}
            errors={errors}
            field=""
            defaultValue=""/>
        </View>

        <Divider orientation="vertical" style={{ marginHorizontal: 10 }}/>

        <View style={{ flex: 1, flexDirection: 'column', padding: 5 }}>
        </View>
      </View>

      <Divider/>

      <View style={{ padding: 5, zIndex: 0 }}>
        <Input
          label="Notes"
          control={control}
          errors={errors}
          field=""
          defaultValue=""
          multiline/>
      </View>

      <Divider style={{ marginVertical: 10 }}/>

      <View style={{ alignItems: 'center' }}>
        <SuccessButtonLarge title='Save' action={( ) => console.log("SAVE BABY")}/>
      </View>
    </ScrollView>
  );
};

export const WoodProgramForm = ( ) => {
	const { control, handleSubmit, setValue, formState: { errors } } = useForm( );
    
  return (
    <ScrollView style={styles.form}>
      <MediumText>Wood and Vinyl Programs</MediumText>    

      <Divider/>

      <View style={{ flexDirection: 'row', zIndex: zIndex }}>     
        <View style={{ flex: 1, flexDirection: 'column', padding: 5 }}>
          <SmallText>Preferences</SmallText>

          <Dropdown
            label="Preferred Glue Products"
            items={wood.glueProducts}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Other Glue Product"
            control={control}
            errors={errors}
            field=""
            defaultValue=""/>
          <Dropdown
            label="Stain or Primed?"
            items={wood.stainOrPrimed}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
        </View>

        <Divider orientation="vertical" style={{ marginHorizontal: 10 }}/>

        <View style={{ flex: 1, flexDirection: 'column', padding: 5 }}>
          <SmallText>Standards</SmallText>
          
          <Dropdown
            label="Are Transition Strips Standard Practice?"
            items={yesOrNo}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Dropdown
            label="HVAC Requirement?"
            items={yesOrNo}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Dropdown
            label="MC Surfaces Install Wood Trim?"
            items={yesOrNo}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Dropdown
            label="2nd Story Subfloor Construction"
            items={wood.subfloorConstruction}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
        </View>
      </View>

      <Divider style={{ zIndex: 0 }}/>

      <View style={{ flexDirection: 'row', zIndex: zIndex }}>
        <View style={{ flex: 1, flexDirection: 'column', padding: 5 }}>
          <SmallText>Information</SmallText>

          <Dropdown
            label="Who Will be Doing Takeoffs?"
            items={carpet.takeoffResp}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Waste Factor Percentage"
            control={control}
            errors={errors}
            field=""
            defaultValue=""/>
        </View>

        <Divider orientation="vertical" style={{ marginHorizontal: 10 }}/>

        <View style={{ flex: 1, flexDirection: 'column', padding: 5 }}>
        </View>
      </View>

      <Divider/>

      <View style={{ padding: 5, zIndex: 0 }}>
        <Input
          label="Notes"
          control={control}
          errors={errors}
          field=""
          defaultValue=""
          multiline/>
      </View>

      <Divider style={{ marginVertical: 10 }}/>

      <View style={{ alignItems: 'center' }}>
        <SuccessButtonLarge title='Save' action={( ) => console.log("SAVE BABY")}/>
      </View>
    </ScrollView>
  );
};

export const TileProgramForm = ( ) => {
	const { control, handleSubmit, setValue, formState: { errors } } = useForm( );
    
  return (
    <ScrollView style={{...styles.form}}>
      <Text style={styles.headerText}>Tile Program</Text>    

      <Divider/>

      <View style={{ flexDirection: 'row', zIndex: zIndex }}>     
        <View style={{ flex: 1, flexDirection: 'column', padding: 5 }}>
          <SmallText>Setting Materials</SmallText>

          <Dropdown
            label="Floor Setting Material"
            items={tile.settingMaterial}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Floor Custom Setting Material"
            control={control}
            errors={errors}
            field=""
            defaultValue=""/>
          <Dropdown
            label="Wall Setting Material"
            items={tile.settingMaterial}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Wall Custom Setting Material"
            control={control}
            errors={errors}
            field=""
            defaultValue=""/>
          <Input
            label="Alotted Float"
            control={control}
            errors={errors}
            field=""
            defaultValue=""/>
          <Input
            label="Charge for Extra Float"
            control={control}
            errors={errors}
            field=""
            defaultValue=""/>
        </View>

        <Divider orientation="vertical" style={{ marginHorizontal: 10 }}/>

        <View style={{ flex: 1, flexDirection: 'column', padding: 5 }}>
          <SmallText>Waterproofing</SmallText>
          
          <Dropdown
            label="Waterproofing Method"
            items={tile.waterproofMethod}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Dropdown
            label="Waterproofing Method - Shower Floor"
            items={tile.showerFloorWaterproof}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Dropdown
            label="Waterproofing Method - Shower Walls"
            items={tile.waterproofMethod}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Dropdown
            label="Waterproofing Method - Tub Wall"
            items={tile.waterproofMethod}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Who is installing fiberglass?"
            control={control}
            errors={errors}
            field=""
            defaultValue=""/>
          <Dropdown
            label="Will we be installing backerboard?"
            items={yesOrNo}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Dropdown
            label="Punch Out Material"
            items={tile.punchOutMaterial}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
        </View>
      </View>

      <Divider/>

      <View style={{ flexDirection: 'row', zIndex: zIndex }}>
        <View style={{ flex: 1, flexDirection: 'column', padding: 5 }}>
          <SmallText>Shower and Tub</SmallText>
           
          <Dropdown
            label="Shower Niche Construction"
            items={tile.showerNiche}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Dropdown
            label="Shower Niche Framing"
            items={tile.showerNicheFraming}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Preformed Shower Niche Brand"
            control={control}
            errors={errors}
            field=""
            defaultValue=""/>
          <Dropdown
            label="Are Corner Soap Dishes Standard?"
            items={tile.showerNicheFraming}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Corner Soap Dish Material"
            control={control}
            errors={errors}
            field=""
            defaultValue=""/>
          <Dropdown
            label="Shower Seat Construction"
            items={tile.showerSeat}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Dropdown
            label="Metal Edge Options"
            items={tile.metalEdge}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
        </View>

        <Divider orientation="vertical" style={{ marginHorizontal: 10 }}/>

        <View style={{ flex: 1, flexDirection: 'column', padding: 5 }}> 
          <SmallText>Grout and Subfloor</SmallText>
          
          <Dropdown
            label="Grout Joint Sizing"
            items={tile.groutJointSize}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Grout Joint Notes"
            control={control}
            errors={errors}
            field=""
            defaultValue=""/>
          <Dropdown
            label="Preferred Grout Brand"
            items={tile.groutBrand}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Upgraded Grout and Formula"
            control={control}
            errors={errors}
            field=""
            defaultValue=""/>
          <Input
            label="Grout Product"
            control={control}
            errors={errors}
            field=""
            defaultValue=""/>
          <Dropdown
            label="Subfloor Std. Practice"
            items={tile.subfloorPractice}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Subfloor Products"
            control={control}
            errors={errors}
            field=""
            defaultValue=""/>
        </View>
      </View>

      <Divider/>

      <View style={{ flexDirection: 'row', zIndex: zIndex }}>
        <View style={{ flex: 1, flexDirection: 'column', padding: 5 }}> 
          <SmallText>Standards</SmallText>
          
          <Input
            label="Wall Tile Height Standard"
            control={control}
            errors={errors}
            field=""
            defaultValue=""/>
        </View>

        <Divider orientation="vertical" style={{ marginHorizontal: 10 }}/>

        <View style={{ flex: 1, flexDirection: 'column', padding: 5 }}> 
          <SmallText>Information</SmallText>

          <Dropdown
            label="Who Will be Doing Takeoffs?"
            items={tile.takeoffResp}
            control={control}
            errors={errors}
            field=""
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Waste Factor Percentage"
            control={control}
            errors={errors}
            field=""
            defaultValue=""/>
          <Input
            label="Waste Factor Percentage - Walls"
            control={control}
            errors={errors}
            field=""
            defaultValue=""/>
          <Input
            label="Waste Factor Percentage - Floors"
            control={control}
            errors={errors}
            field=""
            defaultValue=""/>
          <Input
            label="Waste Factor Percentage - Mosaics"
            control={control}
            errors={errors}
            field=""
            defaultValue=""/>
        </View>
      </View>

      <Divider style={{ zIndex: 0 }}/>

      <View style={{ padding: 5, zIndex: 0 }}>
        <Input
          label="Notes"
          control={control}
          errors={errors}
          field=""
          defaultValue=""
          multiline/>
      </View>

      <Divider style={{ marginVertical: 10 }}/>

      <View style={{ alignItems: 'center', marginBottom: 150 }}>
        <SuccessButtonLarge title='Save' action={( ) => console.log("SAVE BABY")}/>
      </View>
    </ScrollView>
  );
};