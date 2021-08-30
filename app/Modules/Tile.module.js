// Library Imports
import React from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { Snackbar } from 'react-native-paper';
import { styles, colors } from './Styles/SpreadSheet.style';
import Table from '../components/Table';
import Parts from '../api/Parts';

function Tile(props) {
  const [ loaded, setLoaded ] = React.useState(false);
  const [ visible, setVisible ] = React.useState(false);
  const [ snackMessage, setSnackMessage ] = React.useState(null);
  const [ disableSave, setDisableSave ] = React.useState(false);
  const [ error, setError ] = React.useState(false);
  const [ tables, setTables ] = React.useState([
    {
      name: "Floor Tile",
      headers: ["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"],
      rows: [
        {
          id: "",
          level: "",
          unit: "",
          material: "",
          materialTax: "",
          labor: "",
          total: ""
        }
      ],
      part: {
        id: "",
        level: "",
        unit: "",
        material: "",
        materialTax: "",
        labor: "",
        total: ""
      }
    },
    {
      name: "Bathroom Wall Tile",
      headers: ["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"],
      rows: [
        {
          id: "",
          level: "",
          unit: "",
          material: "",
          materialTax: "",
          labor: "",
          total: ""
        }
      ],
      part: {
        id: "",
        level: "",
        unit: "",
        material: "",
        materialTax: "",
        labor: "",
        total: ""
      }
    },
    {
      name: "Backsplash Wall Tile",
      headers: ["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"],
      rows: [
        {
          id: "",
          level: "",
          unit: "",
          material: "",
          materialTax: "",
          labor: "",
          total: ""
        }
      ],
      part: {
        id: "",
        level: "",
        unit: "",
        material: "",
        materialTax: "",
        labor: "",
        total: ""
      }
    },
    {
      name: "Fireplace Wall Tile",
      headers: ["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"],
      rows: [
        {
          id: "",
          level: "",
          unit: "",
          material: "",
          materialTax: "",
          labor: "",
          total: ""
        }
      ],
      part: {
        id: "",
        level: "",
        unit: "",
        material: "",
        materialTax: "",
        labor: "",
        total: ""
      }
    },
    {
      name: "Floor Stone",
      headers: ["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"],
      rows: [
        {
          id: "",
          level: "",
          unit: "",
          material: "",
          materialTax: "",
          labor: "",
          total: ""
        }
      ],
      part: {
        id: "",
        level: "",
        unit: "",
        material: "",
        materialTax: "",
        labor: "",
        total: ""
      }
    },
    {
      name: "Bathroom Wall Stone",
      headers: ["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"],
      rows: [
        {
          id: "",
          level: "",
          unit: "",
          material: "",
          materialTax: "",
          labor: "",
          total: ""
        }
      ],
      part: {
        id: "",
        level: "",
        unit: "",
        material: "",
        materialTax: "",
        labor: "",
        total: ""
      }
    },
    {
      name: "Backsplash Wall Stone",
      headers: ["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"],
      rows: [
        {
          id: "",
          level: "",
          unit: "",
          material: "",
          materialTax: "",
          labor: "",
          total: ""
        }
      ],
      part: {
        id: "",
        level: "",
        unit: "",
        material: "",
        materialTax: "",
        labor: "",
        total: ""
      }
    },
    {
      name: "Fireplace Wall Stone",
      headers: ["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"],
      rows: [
        {
          id: "",
          level: "",
          unit: "",
          material: "",
          materialTax: "",
          labor: "",
          total: ""
        }
      ],
      part: {
        id: "",
        level: "",
        unit: "",
        material: "",
        materialTax: "",
        labor: "",
        total: ""
      }
    },
    {
      name: "Shower Pans - Stone",
      headers: ["Level", "Total"],
      rows:[
        {
          id: "",
          level: "",
          total: ""
        }
      ],
      part: {
        id: "",
        level: "",
        total: ""
      }
    },
    {
      name: "Shower Pans - Tile",
      headers: ["Level", "Total"],
      rows:[
        {
          id: "",
          level: "",
          total: ""
        }
      ],
      part: {
        id: "",
        level: "",
        total: ""
      }
    },
    {
      name: "Shower Pans - Deco",
      headers: ["Level", "Total"],
      rows:[
        {
          id: "",
          level: "",
          total: ""
        }
      ],
      part: {
        id: "",
        level: "",
        total: ""
      }
    },
    {
      name: "Underlayment",
      headers: ["Description", "Cost per SqFt"],
      rows:[
        {
          id: "",
          description: "",
          total: ""
        }
      ],
      part: {
        id: "",
        description: "",
        total: ""
      }
    },
    {
      name: "Pattern Charges",
      headers: ["Pattern", "Cost per SqFt"],
      rows:[
        {
          id: "",
          description: "",
          total: ""
        }
      ],
      part: {
        id: "",
        description: "",
        total: ""
      }
    },
    {
      name: "Accents",
      headers: ["Cost per SqFt", "Pattern"],
      rows:[
        {
          id: "",
          description: "",
          total: ""
        }
      ],
      part: {
        id: "",
        description: "",
        total: ""
      }
    },
    {
      name: "Shower Seats",
      headers: ["Description", "Unit", "Cost"],
      rows:[
        {
          id: "",
          description: "",
          unit: "",
          total: ""
        }
      ],
      part: {
        id: "",
        description: "",
        unit: "",
        total: ""
      }
    },
    {
      name: "Add-Ons",
      headers: ["Description", "Unit", "Cost"],
      rows:[
        {
          id: "",
          description: "",
          unit: "",
          total: ""
        }
      ],
      part: {
        id: "",
        description: "",
        unit: "",
        total: ""
      }
    },
  ]);

  React.useEffect(( ) => {
    const getParts = async( ) => {
      console.log("Length: " + tables.length)
      // Retrieve Tile Tables
      setTables(await Parts.getTile(props.userId, props.client.id, tables));
    }

    getParts( );
    setLoaded(true);
  }, [ ]);

  const _saveTableData = async(formik, tableName) => {
    let rows = formik.form.values.rows;
    let status;

    setDisableSave(true);

    rows.map(async (row, index) => {
      if (row.total === "" || row.total == "NaN") {
        formik.remove(index);
      } else {
        row.client_id = props.client.id;
        row.program = "tile";
        row.programTable = tableName;
        
        status = await Parts.createNew(userId, client.id, row);

        if (status < 200 || status > 299) {
          setError(true);
        }
      }

      if (error === false) {
        setSnackMessage(`${tableName} Pricing was created successfully`);
      } else {
        setError(true);
        setSnackMessage("There was an error creating your client pricing. Please try again.");
        setDisableSave(false);
      }
    
      setVisible(true);
    });
  }

  const autofill = (arrayHelpers, tableName) => {
    let values = arrayHelpers.form.values.rows;

    values.map((row, index) => {
      let materialWithTax = row.material * 1.0825;
      let total = parseFloat(materialWithTax) + parseFloat(row.labor);

      arrayHelpers.form.setFieldValue(`rows.${index}.materialTax`, materialWithTax.toFixed(3));
      arrayHelpers.form.setFieldValue(`rows.${index}.total`, total.toFixed(3));
    }); 
  }

  return loaded === true && (
    <ScrollView style={styles.sv}>
      <View style={styles.spreadsheet}>
      {tables.map((tableObj, index) => (
        <Table 
          tableObj={tableObj}
          key={index} 
          save={_saveTableData}
          index={index}
          user={props.userId}
          client={props.client}
          autofill={autofill}/>
      ))}
      </View>

      <Snackbar 
        visible={visible} 
        onDismiss={( ) => snackbarDismiss( )} 
        style={{width: '30%'}}>
        {snackMessage}
      </Snackbar>
    </ScrollView>
  );
}
  
// Props Valdidation
Tile.propTypes = {
  dropdown: PropTypes.bool,
  addRow: PropTypes.func,
  tables: PropTypes.array
}

export default Tile;
  