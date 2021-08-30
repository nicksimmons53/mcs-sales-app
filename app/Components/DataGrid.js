// Library Imports
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { DataTable } from 'react-native-paper';
import colors from '../Library/Colors';

// Props Needed
// tableTitle = ""
// header = [ ]
// rows = [ ] - map rows to header names (lowercase)
function DataGrid({...props}) {
  let title = props.title || null;
  let header = props.header || [];
  let rows = props.rows || [];
  let flex = props.flex || 1;

  const styles = StyleSheet.create({
    background: {
      backgroundColor: colors.white,
      borderRadius: 3,
      flex: flex,
      margin: 10,
    }
  });
  
  const [ orientation, setOrientation ] = React.useState(props.orientation || "vertical");

  if (orientation === "vertical") {
    return (
      <DataTable style={styles.background}>
        { title &&
          <DataTable.Header>
            <DataTable.Title>{ title }</DataTable.Title>
          </DataTable.Header>
        }
  
        <DataTable.Header>
          { header.map(columnName => (
            <DataTable.Title>{ columnName }</DataTable.Title>
          ))}
        </DataTable.Header>
  
        { rows.map((row, rowIndex) => (
          <DataTable.Row key={rowIndex}>
            { header.map((columnName, cellIndex) => (
              <DataTable.Cell key={cellIndex}>{ row[columnName.toLowerCase( )] }</DataTable.Cell>
            ))}
          </DataTable.Row>
        ))}
      </DataTable>
    );
  }

  if (orientation === "horizontal") {
    return (
      <DataTable style={{...styles.background, }}>
        { title &&
          <DataTable.Header>
            <DataTable.Title>{ title }</DataTable.Title>
          </DataTable.Header>
        }

        <DataTable.Header style={{flexDirection: 'column', height: 'auto'}}>
          { rows.map((row, index) => (
            <DataTable.Row>
              <DataTable.Cell>{ row }</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable.Header>
      </DataTable>
    );
  }
}

export default DataGrid;