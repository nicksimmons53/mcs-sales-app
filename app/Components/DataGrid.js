// Library Imports
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Button, DataTable, IconButton } from 'react-native-paper';
import colors from '../Library/Colors';
import { ActionButtonSmall, GeneralButtonSmall, SuccessButtonSmall } from './Button';

// Props Needed
// title = ""
// header = [ ]
// rows = [ ]
// fieldsNeeded = [ ]
// flex = num
// itemsPerPage = num
// columnStyle
// orientation
// action
// icon
// iconAction
export const DataGrid = (props) => {
  let title = props.title || null;
  let header = props.header || [];
  let rows = props.rows || [];
  let data = props.fieldsNeeded || [];
  let flex = props.flex || 1;
  const [ page, setPage ] = React.useState(0);
  const [ itemsPerPage, setItemsPerPage ] = React.useState(props.itemsPerPage || 3);
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, rows.length);

  const styles = StyleSheet.create({
    background: {
      backgroundColor: colors.white,
      borderRadius: 3,
      flex: flex,
      margin: 10,
    }
  });

  React.useEffect(() => {
     setPage(0);
  }, [ itemsPerPage ]);

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
        { props.icon &&
          <DataTable.Cell></DataTable.Cell>
        }
      </DataTable.Header>

      { rows.length === 0 && 
        <DataTable.Row>
          <DataTable.Cell>No Data Present</DataTable.Cell>
        </DataTable.Row>
      }

      { rows.slice(page*itemsPerPage, (page+1)*itemsPerPage).map((row, rowIndex) => (
        <DataTable.Row key={rowIndex} onPress={props.action ? ( ) => props.action(row) : null}>
          { header.map((columnName, cellIndex) => (
            <DataTable.Cell 
              key={cellIndex}
              style={props.columnStyle ? { flex: props.columnStyle.flex[cellIndex] } : null}>
              { row[data[cellIndex]] }
            </DataTable.Cell>
          ))}

          { props.icon &&
            <IconButton icon="delete-forever" onLongPress={( ) => console.log("PRESSED")}/>
          }
        </DataTable.Row>
      ))} 

      { props.pagination &&
        <DataTable.Pagination
          page={page}
          onPageChange={page => setPage(page)}
          numberOfPages={Math.ceil(rows.length/itemsPerPage)}
          itemsPerPage={itemsPerPage}
          label={`${from + 1}-${to} of ${rows.length}`}/>
      }
    </DataTable>
  );
}

export const DataGridHorizontal = (props) => {
  let title = props.title || null;
  let header = props.header || [];
  let rows = props.rows || [];
  let data = props.fieldsNeeded || [];
  let flex = props.flex || 1;
  const [ page, setPage ] = React.useState(0);
  const [ itemsPerPage, setItemsPerPage ] = React.useState(props.itemsPerPage || 3);
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, rows.length);

  const styles = StyleSheet.create({
    background: {
      backgroundColor: colors.white,
      borderRadius: 3,
      flex: flex,
      margin: 10,
    }
  });

  React.useEffect(() => {
     setPage(0);
  }, [ itemsPerPage ]);

  return (
    <DataTable style={{...styles.background, }}>
      { title &&
        <DataTable.Header>
          <DataTable.Title>{ title }</DataTable.Title>
        </DataTable.Header>
      }

      <DataTable.Header style={{borderBottomWidth: 0, flexDirection: 'column', height: 'auto'}}>
        { rows.length === 0 &&
          <DataTable.Row>
            <DataTable.Cell>No Data Present</DataTable.Cell>
          </DataTable.Row>
        }
        { rows.map((row, index) => (
          <DataTable.Row key={index} style={rows.length/(index+1) === 1 ? {borderBottomWidth: 0} : null}>
            <DataTable.Cell>{ row }</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable.Header>
    </DataTable>
  );
}

export const DataGridPricing = (props) => {
  let title = props.title || null;
  let header = props.header || [];
  let rows = props.rows || [];
  let data = props.fieldsNeeded || [];
  let flex = props.flex || 1;
  const [ page, setPage ] = React.useState(0);
  const [ itemsPerPage, setItemsPerPage ] = React.useState(props.itemsPerPage || 3);
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, rows.length);

  const styles = StyleSheet.create({
    background: {
      backgroundColor: colors.white,
      borderColor: colors.light_black,
      borderRadius: 3,
      borderWidth: 1,
      flex: flex,
      margin: 10,
    },
    input: {
      borderColor: colors.grey,
      borderBottomWidth: 1, 
      borderRightWidth: 1, 
      borderTopWidth: 1,
      flex: 1,
      fontFamily: 'Quicksand',
      padding: 5
    }
  });

  React.useEffect(() => {
     setPage(0);
  }, [ itemsPerPage ]);

  return (
    <DataTable style={styles.background}>
      { title &&
        <DataTable.Header>
          <DataTable.Title>{ title }</DataTable.Title>
        </DataTable.Header>
      }

      <DataTable.Header style={{ paddingLeft: 0, paddingRight: 0 }}>
        { header.map((columnName, index) => (
          <DataTable.Title 
            key={index}
            style={props.columnStyle ? { 
              flex: props.columnStyle.flex[index],
              padding: 5
              } : {
                padding: 5
              }}>
            { columnName }
          </DataTable.Title>
        ))}
      </DataTable.Header>

      <DataTable.Row style={{ paddingLeft: 0, paddingRight: 0 }}>
          <TextInput style={styles.input}>TEST</TextInput>
          <TextInput style={styles.input}>TEST</TextInput>
          <TextInput style={styles.input}>TEST</TextInput>
          <TextInput style={styles.input}>TEST</TextInput>
          <TextInput style={styles.input}>TEST</TextInput>
          <TextInput style={{...styles.input, borderRightWidth: 0}}>TEST</TextInput>
      </DataTable.Row>

      { props.pagination &&
        <DataTable.Pagination
          page={page}
          onPageChange={page => setPage(page)}
          numberOfPages={Math.ceil(rows.length/itemsPerPage)}
          itemsPerPage={itemsPerPage}
          label={`${from + 1}-${to} of ${rows.length}`}/>
      }

      <DataTable.Row style={{ alignItems: 'flex-end' }}>
        <SuccessButtonSmall 
          title="Save"
          action={( ) => console.log("Please add a row")}/>
        <GeneralButtonSmall 
          title="Autofill"
          action={( ) => console.log("Please add a row")}/>
        <ActionButtonSmall 
          title="Add Row"
          action={( ) => console.log("Please add a row")}/>
      </DataTable.Row>
    </DataTable>
  );
}