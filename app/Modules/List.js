// Library Imports
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Chip, Divider, Icon, ListItem } from 'react-native-elements';
import { colors, styles } from './Styles/ClientList.style';
import {Menu, Searchbar} from "react-native-paper";
import {useSelector} from "react-redux";

const chipStyle = (status) => {
  switch (status) {
    case "Potential":
      return { backgroundColor: colors.black }

    case "Queued":
      return { backgroundColor: colors.blue }

    case "Approved":
      return { backgroundColor: colors.orange }

    case "Pushed":
      return { backgroundColor: colors.green }

    case "Declined":
      return { backgroundColor: colors.red }

    default:
      break;
  }
};

// Class Component that will show the list of Clients
export const ClientList = (props) => {
  let user = useSelector((state) => state.user.info);
  const [ shownItems, setShownItems ] = React.useState(props.list);
  const [ text, setText ] = React.useState("");
  const [ filteredItems, setFilteredItems ] = React.useState([]);

  const handleSearch = value => {
    setText(value);

    if (text !== "") {
      const results = shownItems.filter(item => {
        return item.name.toLowerCase().includes(value.toLowerCase( ));
      });

      setFilteredItems(results);
    } else {
      setShownItems(props.list);
    }
  }

  return (
    <View style={{...styles.background, borderRadius: 5, flex: 2, margin: 5}}>
      <View style={styles.row}>
        <Text style={styles.text}>Clients</Text>
        <View style={{ alignItems: "center", justifyContent: "flex-end", flexDirection: "row" }}>
          <Searchbar placeholder={"Search"} style={{ marginRight: 15, width: '55%' }} value={text} onChangeText={handleSearch}/>
          {/*<Icon name={"filter"} type={"font-awesome"} style={{ color: colors.black }}/>*/}
        </View>
      </View>

      <Divider />

      <ScrollView style={styles.sv}>
        { text.length === 0 ? ( shownItems.map((item, index) => {
          return (
            <ListItem
              key={index}
              bottomDivider
              onPress={( ) => props.action(item.id)}>
              <ListItem.Content>
                <ListItem.Title style={{fontFamily: 'OpenSans', fontWeight: 'bold'}}>{item.name} {item.territory ? `- ${item.territory}` : ""}</ListItem.Title>
                {user.email === "nicks@mcsurfacesinc.com" ?
                  <ListItem.Subtitle>{item.firstName} {item.lastName}</ListItem.Subtitle>
                  :
                  null
                }
              </ListItem.Content>

              <Chip
                title={item.status}
                buttonStyle={chipStyle(item.status)}
                containerStyle={{width: '20%'}}/>
              <ListItem.Chevron/>
            </ListItem>
          )
          }))
          : ( filteredItems.map((item, index) => {
            return (
              <ListItem
                key={index}
                bottomDivider
                onPress={() => props.action(item.id)}>
                <ListItem.Content>
                  <ListItem.Title style={{fontFamily: 'OpenSans', fontWeight: 'bold'}}>{item.name} - {item.territory}</ListItem.Title>
                  {user.email === "nicks@mcsurfacesinc.com" ?
                    <ListItem.Subtitle>{item.firstName} {item.lastName}</ListItem.Subtitle>
                    :
                    null
                  }
                </ListItem.Content>

                <Chip
                  title={item.status}
                  buttonStyle={chipStyle(item.status)}
                  containerStyle={{width: '20%'}}/>
                <ListItem.Chevron/>
              </ListItem>
            )
          }))}
      </ScrollView>
    </View>
  );
};

// Class Component that will show the list of Clients
export const NotificationsList = (props) => {
  return (
    <View style={{...styles.background, borderRadius: 5, flex: 1.5, margin: 5}}>
      <View style={styles.row}>
        <Text style={styles.text}>Notifications</Text>
      </View>

      <Divider />

      <ScrollView style={styles.sv}>
        { props.list.map((item, index) => (
          <ListItem 
            key={index} 
            bottomDivider 
            onPress={( ) => props.action(item.id)}>
              
            <ListItem.Content>
            </ListItem.Content>

            <ListItem.Chevron/>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
};

// Class Component that will show the list of Clients
export const DocumentsList = (props) => {
  return (
    <View style={{...styles.background, borderRadius: 5, flex: 1.5, margin: 5}}>
      <View style={styles.row}>
        <Text style={styles.text}>Documents</Text>
      </View>

      <Divider />

      <ScrollView style={styles.sv}>
        { props.list.map((item, index) => (
          <ListItem 
            key={index} 
            bottomDivider 
            onPress={( ) => props.action(item.id)}>
              
            <ListItem.Content>
            </ListItem.Content>

            <ListItem.Chevron/>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
};

export const TakeoffList = (props) => {
  const [ builder, setBuilder ] = React.useState(null);
  const [ selected, setSelected ] = React.useState(null);

  let builders = ['Test2']
  let addresses = ["123 Street Dr", "1444 Domain Dr", "450 Lockhaven"];
  let bids = [{ name: 'Bid 1', date: '10-02-2021' }, { name: 'Bid 2', date: '12-20-2021' }];

  return (
    <View style={{...styles.background, flexDirection: 'row'}}>
      <View style={{...styles.background, borderRadius: 5, flex: 1, margin: 0}}>
        <View style={{...styles.row, justifyContent: 'flex-start'}}>
          <Text style={styles.text}>Clients</Text>
        </View>

        <Divider/>

        <ScrollView style={styles.sv}>
          { builders.map((item, index) => (
            <ListItem
              key={index}
              bottomDivider
              onPress={( ) => setBuilder(item.name)}>

              <ListItem.Content>
                <ListItem.Title style={{fontFamily: 'OpenSans', fontWeight: 'bold'}}>{item}</ListItem.Title>
              </ListItem.Content>

              <ListItem.Chevron/>
            </ListItem>
          ))}
        </ScrollView>
      </View>

      <Divider orientation="vertical"/>

      <View style={{...styles.background, borderRadius: 5, flex: 1, margin: 0}}>
        <View style={{...styles.row, justifyContent: 'flex-start'}}>
          <Text style={styles.text}>Addresses</Text>
        </View>

        <Divider />

        <ScrollView style={styles.sv}>
          { addresses.map((address, index) => (
            <ListItem
              key={index}
              bottomDivider>

              <ListItem.Content>
                <ListItem.Title style={{fontFamily: 'OpenSans', fontWeight: 'bold'}}>{address}</ListItem.Title>
              </ListItem.Content>

              <ListItem.Chevron/>
            </ListItem>
          ))}
        </ScrollView>
      </View>

      <Divider orientation="vertical"/>

      <View style={{...styles.background, borderRadius: 5, flex: 1.5, margin: 0}}>
        <View style={{...styles.row, justifyContent: 'flex-start'}}>
          <Text style={styles.text}>Bids</Text>
        </View>

        <Divider />

        <ScrollView style={styles.sv}>
          { bids.map((bid, index) => (
            <ListItem
              key={index}
              bottomDivider
              onPress={( ) => console.log(bid.name)}>

              <ListItem.Content>
                <ListItem.Title style={{fontFamily: 'OpenSans', fontWeight: 'bold'}}>{bid.name}</ListItem.Title>
              </ListItem.Content>

              <Text style={{fontFamily: 'OpenSans', fontWeight: 'bold'}}>10/03/2021</Text>

              <ListItem.Chevron/>
            </ListItem>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};