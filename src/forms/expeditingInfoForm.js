import React from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  Heading,
  HStack,
  VStack,
} from "native-base";
import { jobReleaseChoices, yesOrNo } from "../constants/dropdownValues";
import { useForm } from "react-hook-form";
import Picker from "../components/picker";
import DatePicker from "../components/datePicker";
import TextInput from "../components/textInput";
import MultiLineText from "../components/multiLineText";
import { useUpdateDetailsMutation } from "../services/client";
import { showNotification } from "../components/notification";

export default function ExpeditingInfoForm({ clientId, data }) {
  const { control, handleSubmit, errors, setValue } = useForm();
  const [updateDetails, result] = useUpdateDetailsMutation();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setValue("expediting_details", data);
  }, [data, setValue]);

  const onSubmit = values => {
    setLoading(true);

    updateDetails({
      id: clientId,
      type: "expediting_details",
      body: {
        ...values.expediting_details
      },
    })
      .unwrap()
      .then(res => {
        setLoading(false);
        showNotification({
          text: "Expediting Data Successfully Updated",
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
      mb={50}>
      <Heading p={2}>Expediting Details</Heading>
      <Divider bg={"coolGray.400"} />

      <FormControl p={2}>
        <HStack>
          <VStack flex={1} m={2}>
            <Picker
              choices={yesOrNo}
              control={control}
              field={"expediting_details.vendorPortal"}
              title={"Is there a vendor portal?"}
            />

            <TextInput
              control={control}
              field={"expediting_details.vendorPortalURL"}
              title={"Vendor Portal URL"}
            />

            <Picker
              choices={yesOrNo}
              control={control}
              field={"expediting_details.portalAccountCreated"}
              title={"Has the vendor portal account been created?"}
            />

            <TextInput
              control={control}
              field={"expediting_details.portalUsername"}
              title={"Portal Username"}
            />

            <TextInput
              control={control}
              field={"expediting_details.portalPassword"}
              title={"Portal Password"}
            />
          </VStack>

          <Divider bg={"coolGray.400"} orientation={"vertical"} />

          <VStack flex={1} m={2}>
            <Picker
              choices={jobReleaseChoices}
              control={control}
              field={"expediting_details.jobReleaseMethod"}
              title={"How are jobs released?"}
            />

            <Picker
              choices={yesOrNo}
              control={control}
              field={"expediting_details.poErrorHandling"}
              title={"PO Correction Handling?"}
            />

            <TextInput
              control={control}
              field={"expediting_details.estimatedHomes"}
              title={"Estimated Number of Homes per Year"}
            />

            <DatePicker
              control={control}
              field={"expediting_details.estimatedStartDate"}
              title={"Estimated Start Date"}
            />

            <Picker
              choices={yesOrNo}
              control={control}
              field={"expediting_details.inHouseProgram"}
              title={"Is the client using the In-House Program?"}
            />
          </VStack>
        </HStack>

        <Divider bg={"coolGray.400"} />

        <VStack m={2}>
          <MultiLineText
            control={control}
            title={"Notes"}
            field={"expediting_details.notes"}
          />
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
