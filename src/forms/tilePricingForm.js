import React from "react";
import { Box, Center, Fab, Icon, Text } from "native-base";
import InteractiveTable from "../components/interactiveTable";
import { useForm } from "react-hook-form";
import { levels, units } from "../constants/dropdownValues";
import { useGetClientProgramPricingQuery, useUpdateProgramPricingMutation } from "../services/client";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Loading from "../screens/loading";
import { showNotification } from "../components/notification";

export default function TilePricingForm({ programs, clientId }) {
  const { control, handleSubmit, errors, reset, setValue } = useForm();
  const { data, error, isLoading } = useGetClientProgramPricingQuery({
    program: "Tile",
    clientId: clientId,
  });
  const [updateParts, result] = useUpdateProgramPricingMutation();

  React.useEffect(() => {
    if (isLoading) {
      return <Loading navigation={null} />;
    }

    if (data) {
      reset({
        Backsplash_Fireplace_Wall_Tile: data.parts.filter(part => part.programTable === "Backsplash/Fireplace Wall Tile"),
        Backsplash_Fireplace_Deco: data.parts.filter(part => part.programTable === "Backsplash/Fireplace Deco"),
        Shower_Floor___Tile: data.parts.filter(part => part.programTable === "Shower Floor - Tile"),
        Shower_Floor___Mesh: data.parts.filter(part => part.programTable === "Shower Floor - Mesh"),
        Floor_Tile: data.parts.filter(part => part.programTable === "Floor Tile"),
        Floor_Tile_Deco: data.parts.filter(part => part.programTable === "Floor Tile Deco"),
        Bathroom_Wall_Tile: data.parts.filter(part => part.programTable === "Bathroom Wall Tile"),
        Deco_w__Waterproofing: data.parts.filter(part => part.programTable === "Deco w/ Waterproofing"),
        Floor_Stone: data.parts.filter(part => part.programTable === "Floor Stone"),
        Bathroom_Wall_Stone: data.parts.filter(part => part.programTable === "Bathroom Wall Stone"),
        Backsplash_Wall_Stone: data.parts.filter(part => part.programTable === "Bathroom Wall Stone"),
        Fireplace_Wall_Stone: data.parts.filter(part => part.programTable === "Fireplace Wall Stone"),
        Shower_Floor___Stone: data.parts.filter(part => part.programTable === "Shower Floor - Stone"),
        Shower_Floor___Deco: data.parts.filter(part => part.programTable === "Shower Floor - Deco"),
        Patterns: data.parts.filter(part => part.programTable === "Patterns"),
        Accents: data.parts.filter(part => part.programTable === "Accents"),
        Bath_Accessories: data.parts.filter(part => part.programTable === "Bath Accessories"),
        Miscellaneous: data.parts.filter(part => part.programTable === "Miscellaneous"),
      });
    }
  }, [reset, isLoading, data, setValue]);

  if (programs.Tile === 0 || programs.Tile === null) {
    return (
      <Center h={"100%"}>
        <Text>Program has not been included in client selections.</Text>
      </Center>
    );
  }

  const onSubmit = values => {
    let pricingData = [
      ...values.Backsplash_Fireplace_Wall_Tile.map(row => ({
        ...row,
        programTable: "Backsplash/Fireplace Wall Tile",
        program: "Tile",
        clientId: clientId,
      })),
      ...values.Backsplash_Fireplace_Deco.map(row => ({
        ...row,
        programTable: "Backsplash/Fireplace Deco",
        program: "Tile",
        clientId: clientId,
      })),
      ...values.Shower_Floor___Tile.map(row => ({
        ...row,
        programTable: "Shower/Floor - Tile",
        program: "Tile",
        clientId: clientId,
      })),
      ...values.Shower_Floor___Mesh.map(row => ({
        ...row,
        programTable: "Shower Floor - Mesh",
        program: "Tile",
        clientId: clientId,
      })),
      ...values.Floor_Tile_Deco.map(row => ({
        ...row,
        programTable: "Floor Tile Deco",
        program: "Tile",
        clientId: clientId,
      })),
      ...values.Bathroom_Wall_Tile.map(row => ({
        ...row,
        programTable: "Bathroom Wall Tile",
        program: "Tile",
        clientId: clientId,
      })),
      ...values.Deco_w__Waterproofing.map(row => ({
        ...row,
        programTable: "Deco w/ Waterproofing",
        program: "Tile",
        clientId: clientId,
      })),
      ...values.Floor_Stone.map(row => ({
        ...row,
        programTable: "Floor Stone",
        program: "Tile",
        clientId: clientId,
      })),
      ...values.Bathroom_Wall_Stone.map(row => ({
        ...row,
        programTable: "Bathroom Wall Stone",
        program: "Tile",
        clientId: clientId,
      })),
      ...values.Backsplash_Wall_Stone.map(row => ({
        ...row,
        programTable: "Backsplash_Wall_Stone",
        program: "Tile",
        clientId: clientId,
      })),
      ...values.Fireplace_Wall_Stone.map(row => ({
        ...row,
        programTable: "Fireplace Wall Stone",
        program: "Tile",
        clientId: clientId,
      })),
      ...values.Shower_Floor___Stone.map(row => ({
        ...row,
        programTable: "Shower Floor - Stone",
        program: "Tile",
        clientId: clientId,
      })),
      ...values.Shower_Floor___Deco.map(row => ({
        ...row,
        programTable: "Shower Floor - Deco",
        program: "Tile",
        clientId: clientId,
      })),
      ...values.Patterns.map(row => ({
        ...row,
        programTable: "Patterns",
        program: "Tile",
        clientId: clientId,
      })),
      ...values.Accents.map(row => ({
        ...row,
        programTable: "Accents",
        program: "Tile",
        clientId: clientId,
      })),
      ...values.Bath_Accessories.map(row => ({
        ...row,
        programTable: "Bath Accessories",
        program: "Tile",
        clientId: clientId,
      })),
      ...values.Miscellaneous.map(row => ({
        ...row,
        programTable: "Miscellaneous",
        program: "Tile",
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
        title={"Backsplash/Fireplace Wall Tile"}
        components={{
          level: { header: "Level", type: "select", choices: levels },
          unit: { header: "Unit", type: "select", choices: units },
          cost: { header: "Material", type: "input", choices: null },
          costWithTax: { header: "Material w/ Tax", type: "input", choices: null },
          laborCost: { header: "Labor", type: "input", choices: null },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Backsplash/Fireplace Deco"}
        components={{
          level: { header: "Level", type: "select", choices: levels },
          unit: { header: "Unit", type: "select", choices: units },
          cost: { header: "Material", type: "input", choices: null },
          costWithTax: { header: "Material w/ Tax", type: "input", choices: null },
          laborCost: { header: "Labor", type: "input", choices: null },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Shower Floor - Tile"}
        components={{
          level: { header: "Level", type: "select", choices: levels },
          unit: { header: "Unit", type: "select", choices: units },
          cost: { header: "Material", type: "input", choices: null },
          costWithTax: { header: "Material w/ Tax", type: "input", choices: null },
          laborCost: { header: "Labor", type: "input", choices: null },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Shower Floor - Mesh"}
        components={{
          level: { header: "Level", type: "select", choices: levels },
          unit: { header: "Unit", type: "select", choices: units },
          cost: { header: "Material", type: "input", choices: null },
          costWithTax: { header: "Material w/ Tax", type: "input", choices: null },
          laborCost: { header: "Labor", type: "input", choices: null },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Floor Tile"}
        components={{
          level: { header: "Level", type: "select", choices: levels },
          unit: { header: "Unit", type: "select", choices: units },
          cost: { header: "Material", type: "input", choices: null },
          costWithTax: { header: "Material w/ Tax", type: "input", choices: null },
          laborCost: { header: "Labor", type: "input", choices: null },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Floor Tile Deco"}
        components={{
          level: { header: "Level", type: "select", choices: levels },
          unit: { header: "Unit", type: "select", choices: units },
          cost: { header: "Material", type: "input", choices: null },
          costWithTax: { header: "Material w/ Tax", type: "input", choices: null },
          laborCost: { header: "Labor", type: "input", choices: null },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Bathroom Wall Tile"}
        components={{
          level: { header: "Level", type: "select", choices: levels },
          unit: { header: "Unit", type: "select", choices: units },
          cost: { header: "Material", type: "input", choices: null },
          costWithTax: { header: "Material w/ Tax", type: "input", choices: null },
          laborCost: { header: "Labor", type: "input", choices: null },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Deco w/ Waterproofing"}
        components={{
          level: { header: "Level", type: "select", choices: levels },
          unit: { header: "Unit", type: "select", choices: units },
          cost: { header: "Material", type: "input", choices: null },
          costWithTax: { header: "Material w/ Tax", type: "input", choices: null },
          laborCost: { header: "Labor", type: "input", choices: null },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Floor Stone"}
        components={{
          level: { header: "Level", type: "select", choices: levels },
          unit: { header: "Unit", type: "select", choices: units },
          cost: { header: "Material", type: "input", choices: null },
          costWithTax: { header: "Material w/ Tax", type: "input", choices: null },
          laborCost: { header: "Labor", type: "input", choices: null },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Bathroom Wall Stone"}
        components={{
          level: { header: "Level", type: "select", choices: levels },
          unit: { header: "Unit", type: "select", choices: units },
          cost: { header: "Material", type: "input", choices: null },
          costWithTax: { header: "Material w/ Tax", type: "input", choices: null },
          laborCost: { header: "Labor", type: "input", choices: null },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Backsplash Wall Stone"}
        components={{
          level: { header: "Level", type: "select", choices: levels },
          unit: { header: "Unit", type: "select", choices: units },
          cost: { header: "Material", type: "input", choices: null },
          costWithTax: { header: "Material w/ Tax", type: "input", choices: null },
          laborCost: { header: "Labor", type: "input", choices: null },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Fireplace Wall Stone"}
        components={{
          level: { header: "Level", type: "select", choices: levels },
          unit: { header: "Unit", type: "select", choices: units },
          cost: { header: "Material", type: "input", choices: null },
          costWithTax: { header: "Material w/ Tax", type: "input", choices: null },
          laborCost: { header: "Labor", type: "input", choices: null },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Shower Floor - Stone"}
        components={{
          level: { header: "Level", type: "select", choices: levels },
          unit: { header: "Unit", type: "select", choices: units },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Shower Floor - Deco"}
        components={{
          level: { header: "Level", type: "select", choices: levels },
          unit: { header: "Unit", type: "select", choices: units },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Patterns"}
        components={{
          description: { header: "Description", type: "input", choices: null },
          unit: { header: "Unit", type: "select", choices: units },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Accents"}
        components={{
          description: { header: "Description", type: "input", choices: null },
          unit: { header: "Unit", type: "select", choices: units },
          totalCost: { header: "Total", type: "input", choices: null },
        }}
        control={control}
      />
      <InteractiveTable
        title={"Bath Accessories"}
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
