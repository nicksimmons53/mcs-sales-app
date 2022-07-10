import React from "react";
import { Box, Center, Fab, Icon, Text } from "native-base";
import InteractiveTable from "../components/interactiveTable";
import { useForm } from "react-hook-form";
import { levels, units } from "../constants/dropdownValues";
import {
  useGetClientProgramPricingQuery,
  useGetCountertopOptionsQuery,
  useUpdateProgramPricingMutation,
} from "../services/client";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Loading from "../screens/loading";
import { showNotification } from "../components/notification";

export default function CountertopsPricingForm({ programs, clientId }) {
  const { control, handleSubmit, errors, reset, setValue } = useForm();
  const [types, setTypes] = React.useState(null);
  const [colors, setColors] = React.useState(null);
  const { data, error, isLoading } = useGetClientProgramPricingQuery({
    program: "Countertops",
    clientId: clientId,
  });
  const [updateParts, result] = useUpdateProgramPricingMutation();
  const countertopOptions = useGetCountertopOptionsQuery();

  React.useEffect(() => {
    if (isLoading || countertopOptions.isLoading) {
      return <Loading navigation={null} />;
    } else {
      // Reformat Countertop Type/Color Options
      setTypes(
        countertopOptions.data.types.map(item => ({
          label: item.type,
          value: item.type,
        })),
      );
      setColors(
        countertopOptions.data.colors.map(item => ({
          label: item.color,
          value: item.color,
        })),
      );
    }

    if (data) {
      reset({
        Edges: data.parts.filter(part => part.programTable === "Edges"),
        Sinks: data.parts.filter(part => part.programTable === "Sinks"),
        Miscellaneous: data.parts.filter(part => part.programTable === "Miscellaneous"),
        Level_1: data.parts.filter(part => part.programTable === "Level 1"),
        Level_2: data.parts.filter(part => part.programTable === "Level 2"),
        Level_3: data.parts.filter(part => part.programTable === "Level 3"),
        Level_4: data.parts.filter(part => part.programTable === "Level 4"),
        Level_5: data.parts.filter(part => part.programTable === "Level 5"),
        Level_6: data.parts.filter(part => part.programTable === "Level 6"),
        Level_7: data.parts.filter(part => part.programTable === "Level 7"),
        Level_8: data.parts.filter(part => part.programTable === "Level 8"),
        Level_9: data.parts.filter(part => part.programTable === "Level 9"),
        Level_10: data.parts.filter(part => part.programTable === "Level 10"),
      });
    }
  }, [reset, isLoading, data, setValue, countertopOptions]);

  if (programs.Countertops === 0 || programs.Countertops === null) {
    return (
      <Center h={"100%"}>
        <Text>Program has not been included in client selections.</Text>
      </Center>
    );
  }

  const onSubmit = values => {
    let pricingData = [
      ...values.Edges.map(row => ({
        ...row,
        programTable: "Edges",
        program: "Countertops",
        clientId: clientId,
      })),
      ...values.Sinks.map(row => ({
        ...row,
        programTable: "Sinks",
        program: "Countertops",
        clientId: clientId,
      })),
      ...values.Miscellaneous.map(row => ({
        ...row,
        programTable: "Miscellaneous",
        program: "Countertops",
        clientId: clientId,
      })),
      ...values.Level_1.map(row => ({
        ...row,
        programTable: "Level_1",
        program: "Countertops",
        clientId: clientId,
      })),
      ...values.Level_2.map(row => ({
        ...row,
        programTable: "Level_2",
        program: "Countertops",
        clientId: clientId,
      })),
      ...values.Level_3.map(row => ({
        ...row,
        programTable: "Level_3",
        program: "Countertops",
        clientId: clientId,
      })),
      ...values.Level_4.map(row => ({
        ...row,
        programTable: "Level_4",
        program: "Countertops",
        clientId: clientId,
      })),
      ...values.Level_5.map(row => ({
        ...row,
        programTable: "Level_5",
        program: "Countertops",
        clientId: clientId,
      })),
      ...values.Level_6.map(row => ({
        ...row,
        programTable: "Level_6",
        program: "Countertops",
        clientId: clientId,
      })),
      ...values.Level_7.map(row => ({
        ...row,
        programTable: "Level_7",
        program: "Countertops",
        clientId: clientId,
      })),
      ...values.Level_8.map(row => ({
        ...row,
        programTable: "Level_8",
        program: "Countertops",
        clientId: clientId,
      })),
      ...values.Level_9.map(row => ({
        ...row,
        programTable: "Level_9",
        program: "Countertops",
        clientId: clientId,
      })),
      ...values.Level_10.map(row => ({
        ...row,
        programTable: "Level_10",
        program: "Countertops",
        clientId: clientId,
      })),
    ];

    pricingData.forEach(row => {
      updateParts({
        body: { ...row },
      });
    });

    showNotification({
      text: "Billing Parts Successfully Added",
    });
  };

  return (
    <Box flex={1} m={2} mb={10}>
      <InteractiveTable
        title={"Edges"}
        components={{
          type: { header: "Type", type: "input", choices: null },
          unit: { header: "Unit", type: "select", choices: units },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Sinks"}
        components={{
          description: { header: "Description", type: "input", choices: null },
          unit: { header: "Unit", type: "select", choices: units },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Miscellaneous"}
        components={{
          description: { header: "Description", type: "input", choices: null },
          unit: { header: "Unit", type: "select", choices: units },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Level 1"}
        components={{
          type: { header: "Type", type: "select", choices: types },
          color: { header: "Color", type: "select", choices: colors },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Level 2"}
        components={{
          type: { header: "Type", type: "select", choices: types },
          color: { header: "Color", type: "select", choices: colors },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Level 3"}
        components={{
          type: { header: "Type", type: "select", choices: types },
          color: { header: "Color", type: "select", choices: colors },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Level 4"}
        components={{
          type: { header: "Type", type: "select", choices: types },
          color: { header: "Color", type: "select", choices: colors },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Level 5"}
        components={{
          type: { header: "Type", type: "select", choices: types },
          color: { header: "Color", type: "select", choices: colors },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Level 6"}
        components={{
          type: { header: "Type", type: "select", choices: types },
          color: { header: "Color", type: "select", choices: colors },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Level 7"}
        components={{
          type: { header: "Type", type: "select", choices: types },
          color: { header: "Color", type: "select", choices: colors },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Level 8"}
        components={{
          type: { header: "Type", type: "select", choices: types },
          color: { header: "Color", type: "select", choices: colors },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Level 9"}
        components={{
          type: { header: "Type", type: "select", choices: types },
          color: { header: "Color", type: "select", choices: colors },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Level 10"}
        components={{
          type: { header: "Type", type: "select", choices: types },
          color: { header: "Color", type: "select", choices: colors },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />

      <Fab
        bg={"#4ade80"}
        shadow={2}
        size={"lg"}
        icon={<FontAwesome5 name={"save"} size={32} color={"white"} flex={1} />}
        onPress={handleSubmit(onSubmit)}
      />
    </Box>
  );
}
