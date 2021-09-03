// Library Imports
import React from 'react';
import { StyleSheet } from 'react-native';
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
  let data = props.fieldsNeeded || [];
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
          { header.map((columnName, index) => (
            <DataTable.Title 
              key={index}
              style={props.columnStyle ? { flex: props.columnStyle.flex[index] } : null}>
              { columnName }
            </DataTable.Title>
          ))}
        </DataTable.Header>
  
        { rows.map((row, rowIndex) => (
          <DataTable.Row key={rowIndex}>
            { header.map((columnName, cellIndex) => (
              <DataTable.Cell 
                key={cellIndex}
                style={props.columnStyle ? { flex: props.columnStyle.flex[cellIndex] } : null}>
                { row[data[cellIndex]] }
              </DataTable.Cell>
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

        <DataTable.Header style={{borderBottomWidth: 0, flexDirection: 'column', height: 'auto'}}>
          { rows.map((row, index) => (
            <DataTable.Row key={index} style={rows.length/(index+1) === 1 ? {borderBottomWidth: 0} : null}>
              <DataTable.Cell>{ row }</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable.Header>
      </DataTable>
    );
  }
}

export default DataGrid;