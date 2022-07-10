import React from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  Heading,
  Text,
  VStack,
} from "native-base";
import { carpet } from "../constants/dropdownValues";
import { useGetClientProgramDetailsQuery, useUpdateProgramInfoMutation } from "../services/client";
import Loading from "../screens/loading";
import { useForm } from "react-hook-form";
import Picker from "../components/picker";
import TextInput from "../components/textInput";
import MultiLineText from "../components/multiLineText";
import { showNotification } from "../components/notification";

export default function CarpetDetailsForm({ programs, clientId }) {
  const { control, errors, handleSubmit, setValue } = useForm();
  const { data, error, isLoading } = useGetClientProgramDetailsQuery({
    program: "carpet",
    clientId: clientId,
  });
  const [updateInfo, result] = useUpdateProgramInfoMutation();
  const [loading, setLoading] = React.useState(false);

  if (data === undefined || isLoading) {
    return <Loading />;
  } else {
    setValue("carpet", data.program);
  }

  if (programs.Carpet === 0 || programs.Carpet === null || error) {
    return (
      <Center h={"100%"}>
        <Text>Program has not been included in client selections.</Text>
        <Text>If you believe this is an error, please contact Support.</Text>
      </Center>
    );
  }

  if (data === undefined || isLoading) {
    return <Loading />;
  }

  const onSubmit = values => {
    setLoading(true);

    updateInfo({
      type: "carpet",
      body: { ...values.carpet, clientId: clientId },
    })
      .unwrap()
      .then(res => {
        setLoading(false);
        showNotification({
          text: "Program Data Successfully Updated",
        });
      });
  };

  return (
    <Box
      alignItems={"center"}
      borderColor={"coolGray.600"}
      borderRadius={"md"}
      borderWidth={1}
      m={2}
      mb={20}>
      <Heading p={2}>Carpet Program Details</Heading>
      <Divider bg={"coolGray.400"} />

      <FormControl>
        <VStack p={4}>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            Preferences
          </Text>
          <Divider bg={"coolGray.400"} my={2} />

          <Picker
            choices={carpet.carpetPad}
            control={control}
            field={"carpet.preferredPadding"}
            title={"Preferred Padding Brand"}
          />
        </VStack>

        <VStack p={4}>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            Specifications
          </Text>
          <Divider bg={"coolGray.400"} mb={2} />

          <TextInput
            control={control}
            field={"carpet.wasteFactor"}
            title={"Waste Percentage"}
          />
        </VStack>

        <VStack p={4}>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            General
          </Text>
          <Divider bg={"coolGray.400"} mb={2} />

          <Picker
            choices={carpet.takeoffResp}
            control={control}
            field={"carpet.takeoffResponsibility"}
            title={"Who Will Be Doing Takeoffs?"}
          />

          <VStack mb={2}>
            <MultiLineText
              control={control}
              field={"carpet.notes"}
              title={"Notes"}
            />
          </VStack>
        </VStack>

        <Divider bg={"coolGray.400"} />

        <Center>
          <Button
            _loading={{
              bg: "success.400",
            }}
            bg={"success.400"}
            isLoading={loading}
            isLoadingText={"Submitting"}
            m={5}
            onPress={handleSubmit(onSubmit)}
            width={"35%"}>
            Save
          </Button>
        </Center>
      </FormControl>
    </Box>
  );
}
