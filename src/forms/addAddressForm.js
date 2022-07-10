import React from "react";
import { Button, FormControl, HStack, Popover, VStack } from "native-base";
import { states, types } from "../constants/dropdownValues";
import TextInput from "../components/textInput";
import { useForm } from "react-hook-form";
import Picker from "../components/picker";
import { useCreateAddressMutation } from "../services/client";
import { showNotification } from "../components/notification";

export default function AddAddressForm({ clientId, selectedAddresses }) {
  const { control, errors, handleSubmit, reset } = useForm();
  const [createAddress, { isLoading, isUpdating }] = useCreateAddressMutation();
  const [loading, setLoading] = React.useState(false);
  const [choices, setChoices] = React.useState([]);

  React.useEffect(() => {
    let currentData = selectedAddresses.map(address => address.type);
    setChoices(types.filter(type => !currentData.includes(type.value)));
  }, [selectedAddresses, setChoices]);

  const onSubmit = values => {
    setLoading(true);
    createAddress({
      id: clientId,
      body: {
        ...values,
        clientId: clientId,
      },
    })
      .unwrap()
      .then(res => {
        setLoading(false);
        showNotification({
          text: "Address Successfully Added",
        });
        reset({
          type: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          zip: "",
        })
      });
  };

  return (
    <Popover.Content>
      <Popover.Arrow />
      <Popover.CloseButton />
      <Popover.Header>Add Address</Popover.Header>
      <Popover.Body>
        <FormControl>
          <Picker
            choices={choices}
            control={control}
            field={"type"}
            title={"Type"}
          />

          <TextInput control={control} field={"address1"} title={"Address 1"} />

          <TextInput control={control} field={"address2"} title={"Address 2"} />

          <TextInput control={control} field={"city"} title={"City"} />

          <HStack>
            <VStack flex={1} mr={2}>
              <Picker
                choices={states}
                control={control}
                field={"state"}
                title={"State"}
              />
            </VStack>
            <VStack flex={1}>
              <TextInput control={control} field={"zip"} title={"Zip"} />
            </VStack>
          </HStack>
        </FormControl>
      </Popover.Body>
      <Popover.Footer justifyContent="center">
        <Button
          _loading={{
            bg: "success.400",
          }}
          bg={"success.400"}
          isLoading={loading}
          isLoadingText={"Submitting"}
          onPress={handleSubmit(onSubmit)}
          width={"35%"}>
          Save
        </Button>
      </Popover.Footer>
    </Popover.Content>
  );
}
