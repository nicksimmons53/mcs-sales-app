// Library Imports
import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { View, Text } from 'react-native';;
import { Divider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { SuccessButtonLarge } from '../components/Button';
import Dropdown from '../components/Dropdown';
import Input from '../components/Input';
import { MediumText, SmallText } from '../components/Text';
import { cabinets, carpet, countertops, tile, wood, yesOrNo } from '../form/dropdown/values';
import { createProgram, getProgramByName } from '../redux/features/programs/programsThunk';
import { setMessage, show } from '../redux/features/snackbar/snackbarSlice';
import { styles, colors } from './Styles/Form.style';

let zIndex=10000;

export const CabinetProgramForm = ( ) => {
  const dispatch = useDispatch( );
	const { control, handleSubmit, setValue, formState: { errors } } = useForm( );
	const [ disableSave, setDisableSave ] = React.useState(false);
	const [ error, setError ] = React.useState(false);
  let client = useSelector((state) => state.clients.selected);

  React.useEffect(( ) => {
    getData = async( ) => {
      let query = { id: client.id, program: "cabinets" };
      let resultAction = await dispatch(getProgramByName(query));
      
      if (Object.keys(unwrapResult(resultAction)).length !== 0) {
        setValue("cabinets", unwrapResult(resultAction).data);
      }
    }

    getData( );
  }, [ ]);

  const onSubmit = async(data) => {
		setDisableSave(true);

    data.info = data.cabinets;
		data.info.clientId = client.id;
    data.program = "cabinets";
    delete data.cabinets;

		let response = await dispatch(createProgram(data));
    if (response.payload >= 200 && response.payload <= 299) {
      dispatch(setMessage(`Client Cabinet Specifications were saved successfully.`));
    } else {
      setError(true);
      dispatch(setMessage("There was an error saving Client Cabinet Specifications. Please try again."));
      setDisableSave(false);
    }
	
		dispatch(show( ));
		setDisableSave(false);
  }
    
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
            field="cabinets.preferredColors"
            defaultValue=""
            multiline/>
          <Input
            label="Preferred Style"
            control={control}
            errors={errors}
            field="cabinets.preferredStyle"
            defaultValue=""/>
          <Input
            label="Overlay"
            control={control}
            errors={errors}
            field="cabinets.overlay"
            defaultValue=""/>
          <Input
            label="Preferences on Crown"
            control={control}
            errors={errors}
            field="cabinets.preferredCrown"
            defaultValue=""/>
          <Dropdown
            label="Bid Type Preferences"
            items={cabinets.bidTypes}
            control={control}
            errors={errors}
            field="cabinets.bidType"
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
            field="cabinets.upperCabinetSpecs"
            defaultValue=""/>
          <Input
            label="Vanity Height Standard Specs."
            control={control}
            errors={errors}
            field="cabinets.vanityHeightSpecs"
            defaultValue=""/>
          <Dropdown
            label="Is Soft Close Standard?"
            items={yesOrNo}
            control={control}
            errors={errors}
            field="cabinets.softCloseStandard"
            zIndex={zIndex-=1}
            defaultValue={null}/>
          <Input
            label="Any Areas Optioned Out?"
            control={control}
            errors={errors}
            field="cabinets.areasOptionedOut"
            defaultValue=""/>
        </View>
      </View>

      <Divider/>  

      <View style={{ padding: 5 }}>
        <Input
          label="Notes"
          control={control}
          errors={errors}
          field="cabinets.notes"
          defaultValue=""
          multiline/>
      </View>

      <Divider style={{ marginVertical: 10 }}/>

      <View style={{ alignItems: 'center' }}>
        <SuccessButtonLarge 
          title='Save' 
          action={handleSubmit(onSubmit)}
          disabled={disableSave}/>
      </View>
    </ScrollView>
  );
};

export const CarpetProgramForm = ( ) => {
  const dispatch = useDispatch( );
	const { control, handleSubmit, setValue, formState: { errors } } = useForm( );
	const [ disableSave, setDisableSave ] = React.useState(false);
	const [ error, setError ] = React.useState(false);
  let client = useSelector((state) => state.clients.selected);

  React.useEffect(( ) => {
    getData = async( ) => {
      let query = { id: client.id, program: "carpet" };
      let resultAction = await dispatch(getProgramByName(query));

      if (Object.keys(unwrapResult(resultAction)).length !== 0) {
        setValue("carpet", unwrapResult(resultAction).data);
      }
    }

    getData( );
  }, [ ]);

  const onSubmit = async(data) => {
		setDisableSave(true);
    
    data.info = data.carpet;
		data.info.clientId = client.id;
    data.program = "carpet";
    delete data.carpet;
    
		let response = await dispatch(createProgram(data));
    if (response.payload >= 200 && response.payload <= 299) {
      dispatch(setMessage(`Client Carpet Specifications were saved successfully.`));
    } else {
      setError(true);
      dispatch(setMessage("There was an error saving Client Carpet Specifications. Please try again."));
      setDisableSave(false);
    }
	
		dispatch(show( ));
		setDisableSave(false);
  }
    
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
            field="carpet.preferredPadding"
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
            field="carpet.takeoffResponsibility"
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Waste Factor Percentage"
            control={control}
            errors={errors}
            field="carpet.wasteFactor"
            defaultValue=""/>
        </View>
      </View>

      <Divider style={{ zIndex: 0 }}/>

      <View style={{ padding: 5, zIndex: 0 }}>
        <Input
          label="Notes"
          control={control}
          errors={errors}
          field="carpet.notes"
          defaultValue=""
          multiline/>
      </View>

      <Divider style={{ marginVertical: 10 }}/>

      <View style={{ alignItems: 'center' }}>
        <SuccessButtonLarge 
          title='Save' 
          disabled={disableSave}
          action={handleSubmit(onSubmit)}/>
      </View>
    </ScrollView>
  );
};

export const CountertopProgramForm = ( ) => {
  const dispatch = useDispatch( );
	const { control, handleSubmit, setValue, formState: { errors } } = useForm( );
	const [ disableSave, setDisableSave ] = React.useState(false);
	const [ error, setError ] = React.useState(false);
  let client = useSelector((state) => state.clients.selected);

  React.useEffect(( ) => {
    getData = async( ) => {
      let query = { id: client.id, program: "countertops" };
      let resultAction = await dispatch(getProgramByName(query));

      if (Object.keys(unwrapResult(resultAction)).length !== 0) {
        setValue("countertops", unwrapResult(resultAction).data);
      }
    }

    getData( );
  }, [ ]);

  const onSubmit = async(data) => {
		setDisableSave(true);
    
    data.info = data.countertops;
		data.info.clientId = client.id;
    data.program = "countertops";
    delete data.countertops;
    
		let response = await dispatch(createProgram(data));
    if (response.payload >= 200 && response.payload <= 299) {
      dispatch(setMessage(`Client Countertops Specifications were saved successfully.`));
    } else {
      setError(true);
      dispatch(setMessage("There was an error saving Client Countertops Specifications. Please try again."));
      setDisableSave(false);
    }
	
		dispatch(show( ));
		setDisableSave(false);
  }

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
            field="countertops.preferredMaterialThickness"
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Dropdown
            label="Preferred Edge"
            items={countertops.edges}
            control={control}
            errors={errors}
            field="countertops.preferredEdge"
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
            field="countertops.waterfallEdgeStandard"
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Dropdown
            label="Faucet Holes?"
            items={yesOrNo}
            control={control}
            errors={errors}
            field="countertops.faucetHoles"
            zIndex={zIndex-=1}
            defaultValue={null}/>
          <Input
            label="Stove Range Specifications"
            control={control}
            errors={errors}
            field="countertops.stoveRangeSpecifications"
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
            field="countertops.takeoffResponsibility"
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Waste Factor Percentage"
            control={control}
            errors={errors}
            field="countertops.wasteFactor"
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
          field="countertops.notes"
          defaultValue=""
          multiline/>
      </View>

      <Divider style={{ marginVertical: 10 }}/>

      <View style={{ alignItems: 'center' }}>
        <SuccessButtonLarge 
        title='Save' 
        disabled={disableSave}
        action={handleSubmit(onSubmit)}/>
      </View>
    </ScrollView>
  );
};

export const WoodProgramForm = ( ) => {
  const dispatch = useDispatch( );
	const { control, handleSubmit, setValue, formState: { errors } } = useForm( );
	const [ disableSave, setDisableSave ] = React.useState(false);
	const [ error, setError ] = React.useState(false);
  let client = useSelector((state) => state.clients.selected);

  React.useEffect(( ) => {
    getData = async( ) => {
      let query = { id: client.id, program: "wood_vinyl" };
      let resultAction = await dispatch(getProgramByName(query));

      if (Object.keys(unwrapResult(resultAction)).length !== 0) {
        console.log(unwrapResult(resultAction).data);
        setValue("wood", unwrapResult(resultAction).data);
      }
    }

    getData( );
  }, [ ]);

  const onSubmit = async(data) => {
    console.log(data)
		setDisableSave(true);
    
    data.info = data.wood;
		data.info.clientId = client.id;
    data.program = "wood_vinyl";
    delete data.wood;
    
		let response = await dispatch(createProgram(data));
    if (response.payload >= 200 && response.payload <= 299) {
      dispatch(setMessage(`Client Wood/LVP Specifications were saved successfully.`));
    } else {
      setError(true);
      dispatch(setMessage("There was an error saving Client Wood/LVP  Specifications. Please try again."));
      setDisableSave(false);
    }
	
		dispatch(show( ));
		setDisableSave(false);
  }
    
  return (
    <ScrollView style={styles.form}>
      <MediumText>Wood and LVP Programs</MediumText>    

      <Divider/>

      <View style={{ flexDirection: 'row', zIndex: zIndex }}>     
        <View style={{ flex: 1, flexDirection: 'column', padding: 5 }}>
          <SmallText>Preferences</SmallText>

          <Dropdown
            label="Preferred Glue Products"
            items={wood.glueProducts}
            control={control}
            errors={errors}
            field="wood.preferredGlueProducts"
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Other Glue Product"
            control={control}
            errors={errors}
            field="wood.otherGlueProducts"
            defaultValue=""/>
          <Dropdown
            label="Stain or Primed?"
            items={wood.stainOrPrimed}
            control={control}
            errors={errors}
            field="wood.stainedOrPrimed"
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
            field="wood.transitionStripsStandard"
            zIndex={zIndex-=1}
            defaultValue={null}/>
          <Dropdown
            label="HVAC Requirement?"
            items={yesOrNo}
            control={control}
            errors={errors}
            field="wood.hvacRequirement"
            zIndex={zIndex-=1}
            defaultValue={null}/>
          <Dropdown
            label="MC Surfaces Install Wood Trim?"
            items={yesOrNo}
            control={control}
            errors={errors}
            field="wood.MCInstalledTrim"
            zIndex={zIndex-=1}
            defaultValue={null}/>
          <Dropdown
            label="2nd Story Subfloor Construction"
            items={wood.subfloorConstruction}
            control={control}
            errors={errors}
            field="wood.secondFloorConstruction"
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
            field="wood.takeoffResponsibility"
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Waste Factor Percentage"
            control={control}
            errors={errors}
            field="wood.wasteFactor"
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
          field="wood.notes"
          defaultValue=""
          multiline/>
      </View>

      <Divider style={{ marginVertical: 10 }}/>

      <View style={{ alignItems: 'center' }}>
        <SuccessButtonLarge title='Save' action={handleSubmit(onSubmit)}/>
      </View>
    </ScrollView>
  );
};

export const TileProgramForm = ( ) => {
  const dispatch = useDispatch( );
	const { control, handleSubmit, setValue, formState: { errors } } = useForm( );
	const [ disableSave, setDisableSave ] = React.useState(false);
	const [ error, setError ] = React.useState(false);
  let client = useSelector((state) => state.clients.selected);

  React.useEffect(( ) => {
    getData = async( ) => {
      let query = { id: client.id, program: "tile" };
      let resultAction = await dispatch(getProgramByName(query));

      if (Object.keys(unwrapResult(resultAction)).length !== 0) {
        setValue("tile", unwrapResult(resultAction).data);
      }
    }

    getData( );
  }, [ ]);

  const onSubmit = async(data) => {
		setDisableSave(true);
    
    data.info = data.tile;
		data.info.clientId = client.id;
    data.program = "tile";
    delete data.tile;
    
		let response = await dispatch(createProgram(data));
    if (response.payload >= 200 && response.payload <= 299) {
      dispatch(setMessage(`Client Tile Specifications were saved successfully.`));
    } else {
      setError(true);
      dispatch(setMessage("There was an error saving Client Tile Specifications. Please try again."));
      setDisableSave(false);
    }
	
		dispatch(show( ));
		setDisableSave(false);
  }
    
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
            field="tile.floorSettingMaterial"
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Floor Custom Setting Material"
            control={control}
            errors={errors}
            field="tile.customFloorSettingMaterial"
            defaultValue=""/>
          <Dropdown
            label="Wall Setting Material"
            items={tile.settingMaterial}
            control={control}
            errors={errors}
            field="tile.wallSettingMaterial"
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Wall Custom Setting Material"
            control={control}
            errors={errors}
            field="tile.customWallSettingMaterial"
            defaultValue=""/>
          <Input
            label="Alotted Float"
            control={control}
            errors={errors}
            field="tile.alottedFloat"
            defaultValue=""/>
          <Input
            label="Charge for Extra Float"
            control={control}
            errors={errors}
            field="tile.chargeForExtraFloat"
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
            field="tile.waterproofMethod"
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Dropdown
            label="Waterproofing Method - Shower Floor"
            items={tile.showerFloorWaterproof}
            control={control}
            errors={errors}
            field="tile.waterproofMethodShowerFloor"
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Dropdown
            label="Waterproofing Method - Shower Walls"
            items={tile.waterproofMethod}
            control={control}
            errors={errors}
            field="tile.waterproofMethodShowerWalls"
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Dropdown
            label="Waterproofing Method - Tub Wall"
            items={tile.waterproofMethod}
            control={control}
            errors={errors}
            field="tile.waterproofMethodTubWall"
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Who is installing fiberglass?"
            control={control}
            errors={errors}
            field="tile.fiberglassResponsibility"
            defaultValue=""/>
          <Dropdown
            label="Will we be installing backerboard?"
            items={yesOrNo}
            control={control}
            errors={errors}
            field="tile.backerboardInstallResponsibility"
            zIndex={zIndex-=1}
            defaultValue={null}/>
          <Dropdown
            label="Punch Out Material"
            items={tile.punchOutMaterial}
            control={control}
            errors={errors}
            field="tile.punchOutMaterial"
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
            field="tile.showerNicheConstruction"
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Dropdown
            label="Shower Niche Framing"
            items={tile.showerNicheFraming}
            control={control}
            errors={errors}
            field="tile.showerNicheFraming"
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Preformed Shower Niche Brand"
            control={control}
            errors={errors}
            field="tile.showerNicheBrand"
            defaultValue=""/>
          <Dropdown
            label="Are Corner Soap Dishes Standard?"
            items={tile.showerNicheFraming}
            control={control}
            errors={errors}
            field="tile.cornerSoapDishesStandard"
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Corner Soap Dish Material"
            control={control}
            errors={errors}
            field="tile.cornerSoapDishMaterial"
            defaultValue=""/>
          <Dropdown
            label="Shower Seat Construction"
            items={tile.showerSeat}
            control={control}
            errors={errors}
            field="tile.showerSeatConstruction"
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Dropdown
            label="Metal Edge Options"
            items={tile.metalEdge}
            control={control}
            errors={errors}
            field="tile.metalEdgeOptions"
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
            field="tile.groutJointSizing"
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Grout Joint Notes"
            control={control}
            errors={errors}
            field="tile.groutJointNotes"
            defaultValue=""/>
          <Dropdown
            label="Preferred Grout Brand"
            items={tile.groutBrand}
            control={control}
            errors={errors}
            field="tile.preferredGroutBrand"
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Upgraded Grout and Formula"
            control={control}
            errors={errors}
            field="tile.upgradedGrout"
            defaultValue=""/>
          <Input
            label="Grout Product"
            control={control}
            errors={errors}
            field="tile.groutProduct"
            defaultValue=""/>
          <Dropdown
            label="Subfloor Std. Practice"
            items={tile.subfloorPractice}
            control={control}
            errors={errors}
            field="tile.subfloorStandardPractice"
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Subfloor Products"
            control={control}
            errors={errors}
            field="tile.subfloorProducts"
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
            field="tile.standardWallTileHeight"
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
            field="tile.takeoffResponsibility"
            zIndex={zIndex-=1}
            defaultValue=""/>
          <Input
            label="Waste Factor Percentage"
            control={control}
            errors={errors}
            field="tile.wasteFactor"
            defaultValue=""/>
          <Input
            label="Waste Factor Percentage - Walls"
            control={control}
            errors={errors}
            field="tile.wasteFactorWalls"
            defaultValue=""/>
          <Input
            label="Waste Factor Percentage - Floors"
            control={control}
            errors={errors}
            field="tile.wasteFactorFloors"
            defaultValue=""/>
          <Input
            label="Waste Factor Percentage - Mosaics"
            control={control}
            errors={errors}
            field="tile.wasteFactorMosaics"
            defaultValue=""/>
        </View>
      </View>

      <Divider style={{ zIndex: 0 }}/>

      <View style={{ padding: 5, zIndex: 0 }}>
        <Input
          label="Notes"
          control={control}
          errors={errors}
          field="tile.notes"
          defaultValue=""
          multiline/>
      </View>

      <Divider style={{ marginVertical: 10 }}/>

      <View style={{ alignItems: 'center', marginBottom: 150 }}>
        <SuccessButtonLarge title='Save' action={handleSubmit(onSubmit)}/>
      </View>
    </ScrollView>
  );
};