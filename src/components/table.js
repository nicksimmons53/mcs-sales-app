import React from "react";
import {
  Box,
  Divider,
  HStack,
  IconButton,
  Popover,
  Pressable,
  Text,
} from "native-base";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { FlatList } from "react-native";
import { AlertNotification } from "./alert";

export default function Table({
  title,
  columnNames,
  data,
  addIcon,
  form,
  action,
  rowAction,
  alertHeader,
  alertBody,
  fields,
  position,
}) {
  const [alert, showAlert] = React.useState(false);
  const [selectedItem, setItem] = React.useState(null);

  return (
    <Box borderColor={"coolGray.600"} borderWidth={1} borderRadius={"md"} m={2}>
      <HStack alignItems={"center"} justifyContent={"space-between"}>
        <Text fontSize={"md"} fontWeight={"bold"} p={2}>
          {title}
        </Text>

        <HStack>
          {addIcon && form && (
            <Box>
              <Popover
                placement={position || "bottom"}
                trigger={triggerProps => (
                  <IconButton
                    icon={
                      <FontAwesome5
                        name={"plus-circle"}
                        size={24}
                        color={"#4ade80"}
                        flex={1}
                      />
                    }
                    {...triggerProps}
                  />
                )}>
                {form}
              </Popover>
            </Box>
          )}

          {addIcon && action && (
            <Box>
              <IconButton
                icon={
                  <FontAwesome5
                    name={"plus-circle"}
                    size={24}
                    color={"#4ade80"}
                    flex={1}
                  />
                }
                onPress={action}
              />
            </Box>
          )}
        </HStack>
      </HStack>

      <Divider bg={"coolGray.400"} />

      <HStack>
        {columnNames.map(column => (
          <Text flex={1} fontSize={"sm"} fontWeight={"bold"} key={column} p={2}>
            {column}
          </Text>
        ))}
      </HStack>

      <Divider bg={"coolGray.400"} />

      <FlatList
        data={data}
        scrollEnabled={false}
        keyExtractor={item => item.key}
        ListEmptyComponent={
          <HStack>
            <Text flex={1} fontSize={"sm"} p={2}>
              No Data Found
            </Text>
          </HStack>
        }
        renderItem={({ item, index }) => {
          return (
            <Pressable
              onPress={() => {
                if (rowAction) {
                  setItem(item);
                  if (alertHeader) {
                    showAlert(true);
                  } else {
                    rowAction(selectedItem);
                  }
                }
              }}>
              <HStack>
                {fields.map((cell, index) => {
                  return (
                    <Text flex={1} fontSize={"sm"} key={cell} p={2}>
                      {item[cell] === null ? "No Data" : item[cell]}
                    </Text>
                  );
                })}
              </HStack>

              {index !== data.length - 1 && <Divider bg={"coolGray.400"} />}

              <AlertNotification
                header={alertHeader}
                body={alertBody}
                shown={alert}
                setShown={showAlert}
                action={() => rowAction(selectedItem)}
              />
            </Pressable>
          );
        }}
      />
    </Box>
  );
}
