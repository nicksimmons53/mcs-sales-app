import React from "react";
import { Button, FormControl, HStack, Popover, useToast, VStack } from "native-base";
import { states, territories } from "../constants/dropdownValues";
import { useForm } from "react-hook-form";
import TextInput from "../components/textInput";
import Picker from "../components/picker";
import {
  useCreateAddressMutation,
  useCreateClientMutation,
} from "../services/client";
import { useSelector } from "react-redux";
import { showNotification } from "../components/notification";

export default function AddClientForm() {
  const user = useSelector(state => state.auth.user);
  const { control, errors, handleSubmit, reset } = useForm();
  const [createClient, { isLoading, isUpdating }] = useCreateClientMutation();
  const [createAddress, status] = useCreateAddressMutation();
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();

  const onSubmit = values => {
    setLoading(true);
    createClient({
      ...values.client,
      userId: user.id,
      employeeNumber: user.sageEmployeeNumber,
    })
      .unwrap()
      .then(res => {
        createAddress({
          id: res.data.insertId,
          body: {
            ...values.address,
            type: "Corporate",
            clientId: res.data.insertId,
          },
        });
        setLoading(false);
        showNotification({
          text: "Client Successfully Created",
        });
        reset({
          client: {
            name: "",
            territory: "",
          },
          address: {
            address1: "",
            address2: "",
            city: "",
            state: "",
            zip: "",
          },
        });
      });
  };

  return (
    <Popover.Content>
      <Popover.Arrow />
      <Popover.CloseButton />
      <Popover.Header>Add Client</Popover.Header>
      <Popover.Body>
        <FormControl>
          <TextInput
            control={control}
            field={"client.name"}
            title={"Client Name"}
          />

          <Picker
            choices={territories}
            control={control}
            field={"client.territory"}
            title={"Territory"}
          />

          <TextInput
            control={control}
            field={"address.address1"}
            title={"Corporate Address 1"}
          />

          <TextInput
            control={control}
            field={"address.address2"}
            title={"Corporate Address 2"}
          />

          <TextInput
            control={control}
            field={"address.city"}
            title={"Corporate City"}
          />

          <HStack>
            <VStack flex={1} mr={2}>
              <Picker
                choices={states}
                control={control}
                field={"address.state"}
                title={"Corporate State"}
              />
            </VStack>

            <VStack flex={1}>
              <TextInput
                control={control}
                field={"address.zip"}
                title={"Corporate Zip"}
              />
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
