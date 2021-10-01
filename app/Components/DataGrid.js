// Library Imports
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { DataTable, IconButton } from 'react-native-paper';
import { ListItem } from 'react-native-elements';
import { units } from '../form/dropdown/values';
import colors from '../Library/Colors';
import RNPickerSelect from 'react-native-picker-select';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { ActionButtonSmall, SuccessButtonSmall } from './Button';

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
  const { control, handleSubmit, formState: { errors } } = useForm( );
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: `${props.title}`
  });

  let title = props.title || null;
  let header = props.header || [];
  let rows = props.rows || [];
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
      flex: 1,
      margin: 10,
    },
    input: {
      borderColor: colors.grey,
      borderBottomWidth: 1, 
      borderRightWidth: 1, 
      flex: 1,
      fontFamily: 'Quicksand',
      height: '100%',
      padding: 5
    },
    select: {
      borderColor: colors.grey, 
      borderBottomLeftRadius: 0, 
      borderBottomRightRadius: 0,
      borderTopLeftRadius: 0, 
      borderTopRightRadius: 0,
      flex: 1,
      fontFamily: 'Quicksand'
    }
  });

  React.useEffect(( ) => {
    if (fields.length === 0) {
      append(props.newRow);
    }
  }, [ ]);

  React.useEffect(( ) => {
     setPage(0);
  }, [ itemsPerPage ]);

  const onSubmit = (data) => {
    console.log(data)
  }

  const Input = ({ name }) => {
    return (
      <Controller
        control={control}
        render={( { field: { onChange, value } }) => (
          <TextInput value={value} onChangeText={onChange} style={styles.input}/>
        )}
        name={name}
        defaultValue=""/>
    )
  };

  const Dropdown = ({ name }) => {
    return (
      <Controller
        control={control}
        render={( { field: { onChange, value } }) => (
          <RNPickerSelect 
            placeholder={{ label: "Unit", value: "" }}
            value={value || ""}
            onValueChange={value => onChange(value)}
            items={units} 
            style={{
              viewContainer: {...styles.input, justifyContent: 'center', paddingLeft: 5 }, 
              inputIOS: { flex: 1, fontFamily: 'Quicksand', margin: 0, height: '100%' }, 
              inputIOSContainer: { flex: 1, margin: 0, height: '100%' }
            }}/>
        )}
        name={name}
        defaultValue=""/>
  )};

  return (
    <DataTable style={styles.background}>
      { title &&
        <DataTable.Header>
          <DataTable.Title>{ title }</DataTable.Title>
        </DataTable.Header>
      }

      <DataTable.Header style={{ paddingLeft: 0, paddingRight: 0 }}>
        { header.map((columnName, index) => (
          <DataTable.Title key={index} style={{ flex: 1, paddingLeft: 5 }}>
            { columnName }
          </DataTable.Title>
        ))}
        
        <IconButton/>
      </DataTable.Header>
      
      { fields.map((row, rowIndex) => (
        <DataTable.Row key={rowIndex} style={{ flex: 1, paddingLeft: 0, paddingRight: 0, width: '100%' }}>
            { props.components.map((component, index) => (
              <>
                { component === "input" && 
                  <Input 
                    key={index} 
                    name={`${title}.${rowIndex}.${Object.keys(props.newRow)[index]}`}/> 
                }
                { component === "dropdown" && 
                  <Dropdown 
                    key={index} 
                    label={header[index]}
                    name={`${title}.${rowIndex}.${Object.keys(props.newRow)[index]}`}/>
                }
              </>
            ))}

            <IconButton 
              color={colors.red} 
              icon="minus-box" 
              size={35} 
              style={{margin: 0, padding: 0, width: '5%'}}
              onPress={( ) => remove(rowIndex)}/>
        </DataTable.Row>
      ))}

      { props.pagination &&
        <DataTable.Pagination
          page={page}
          onPageChange={page => setPage(page)}
          numberOfPages={Math.ceil(rows.length/5)}
          itemsPerPage={5}
          label={`${from + 1}-${to} of ${rows.length}`}/>
      }

      <DataTable.Row style={{ alignItems: 'flex-end' }}>
        <SuccessButtonSmall 
          title="Save"
          action={handleSubmit(onSubmit)}/> 
        <ActionButtonSmall 
          title="Add Row"
          action={( ) => append(props.newRow)}/>
      </DataTable.Row>
    </DataTable>
  );
}