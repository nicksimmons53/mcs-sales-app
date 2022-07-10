import React from "react";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  HStack,
  IconButton,
  Input,
  Select,
  Text, VStack,
} from "native-base";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Picker from "./picker";
import { Controller, useFieldArray } from "react-hook-form";
import { useDeleteBillingPartsMutation } from "../services/client";

export default function InteractiveTable({ title, components, control }) {
  const [highlighted, setHighlighted] = React.useState(false);
  const [rowsToDelete, setRowsToDelete] = React.useState([]);
  const { fields, append } = useFieldArray({
    control,
    name: `${title.replace(/[-\s\/]/g, "_")}`,
    keyName: "key",
  });
  const [deleteParts, result] = useDeleteBillingPartsMutation();
  const [loading, setLoading] = React.useState(false);

  const selectOne = (value, row) => {
    if (value === true) {
      setRowsToDelete(rowsToDelete => [...rowsToDelete, row]);
      setHighlighted(!highlighted);
    } else {
      setRowsToDelete(rowsToDelete.filter(item => item.id !== row.id));
    }
  };

  const removeLines = async () => {
    setLoading(true);

    await rowsToDelete.forEach(row => {
      deleteParts({
        id: row.id,
      });
    });

    setRowsToDelete([]);
    setLoading(false);
  };

  const TextInput = ({ control, field, index }) => (
    <Controller
      control={control}
      name={`${title.replace(/[-\s\/]/g, "_")}[${index}].${field}`}
      render={({ field: { onBlur, onChange, value } }) => {
        let parsedValue = value !== null ? value.toString() : "";

        return (
          <Input
            value={parsedValue}
            flex={1}
            onChangeText={text => onChange(text)}
          />
        );
      }}
    />
  );

  const Picker = ({ choices, control, field, index }) => (
    <Controller
      control={control}
      name={`${title.replace(/[-\s\/]/g, "_")}[${index}].${field}`}
      render={({ field: { onChange, value } }) => {
        let parsedValue = value !== null ? value.toString() : "";

        return (
          <Select
            flex={1}
            onValueChange={itemValue => onChange(itemValue)}
            placeholder={"Select"}
            selectedValue={parsedValue}>
            {choices.map(choice => (
              <Select.Item
                key={choice}
                label={choice.label}
                value={choice.value}
              />
            ))}
          </Select>
        );
      }}
    />
  );

  return (
    <Box borderColor={"coolGray.600"} borderWidth={1} borderRadius={"md"} m={2}>
      <HStack alignItems={"center"} justifyContent={"space-between"}>
        <Text fontSize={"md"} fontWeight={"bold"} p={2}>
          {title}
        </Text>

        <IconButton
          icon={
            <FontAwesome5 name={"plus"} size={24} color={"#4ade80"} flex={1} />
          }
          onPress={() =>
            append(
              Object.keys(components).reduce(
                (acc, curr) => ((acc[curr] = ""), acc),
                {},
              ),
            )
          }
        />
      </HStack>

      <Divider bg={"coolGray.400"} />

      <HStack>
        <Center mx={2}>
          <Checkbox accessibilityLabel={"checkbox"} isDisabled />
        </Center>

        <Divider bg={"coolGray.400"} orientation={"vertical"} />

        {Object.keys(components).map((column, index) => (
          <VStack flex={1}>
            <Text fontSize={"sm"} fontWeight={"bold"} key={column} p={2}>
              {components[column].header}
            </Text>
          </VStack>
        ))}
      </HStack>

      <Divider bg={"coolGray.400"} />

      {fields.length !== 0 &&
        fields.map((row, index) => (
          <Box key={index}>
            <HStack>
              <Center mx={2}>
                <Checkbox
                  accessibilityLabel={"checkbox"}
                  value={false}
                  onChange={value => selectOne(value, row)}
                />
              </Center>

              <Divider bg={"coolGray.400"} orientation={"vertical"} />

              {Object.keys(row).map((cell, cellIndex) => {
                if (cell in components) {
                  if (components[cell].type === "input") {
                    return (
                      <VStack flex={1}>
                        <TextInput
                          control={control}
                          field={cell}
                          index={index}
                          key={cellIndex}
                        />
                      </VStack>
                    );
                  } else if (components[cell].type === "select") {
                    return (
                      <VStack flex={1}>
                        <Picker
                          choices={components[cell].choices}
                          control={control}
                          field={cell}
                          index={index}
                          key={cellIndex}
                        />
                      </VStack>
                    );
                  }
                }
              })}
            </HStack>
          </Box>
        ))}

      {rowsToDelete.length !== 0 ? (
        <Button
          _loading={{
            bg: "#dc2626",
          }}
          bg={"#dc2626"}
          isLoading={loading}
          isLoadingText={"Deleting"}
          onPress={() => removeLines()}>
          Delete Selected Rows
        </Button>
      ) : null}
    </Box>
  );
}
