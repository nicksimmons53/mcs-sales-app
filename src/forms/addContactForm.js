import React from "react";
import { Button, FormControl, Input, Popover } from "native-base";
import { useForm } from "react-hook-form";
import TextInput from "../components/textInput";
import { useCreateContactMutation } from "../services/client";
import { showNotification } from "../components/notification";

export default function AddContactForm({ clientId }) {
  const { control, errors, handleSubmit, reset } = useForm();
  const [createContact, { isLoading, isUpdating }] = useCreateContactMutation();
  const [loading, setLoading] = React.useState(false);

  const onSubmit = values => {
    setLoading(true);
    createContact({
      clientId: clientId,
      body: {
        ...values,
        clientId: clientId,
      },
    })
      .unwrap()
      .then(res => {
        setLoading(false);
        showNotification({
          text: "Contact Successfully Added",
        });
        reset({
          name: "",
          title: "",
          phone: "",
          email: "",
        });
      });
  };

  return (
    <Popover.Content>
      <Popover.Arrow />
      <Popover.CloseButton />
      <Popover.Header>Add Contact</Popover.Header>
      <Popover.Body>
        <FormControl>
          <TextInput control={control} field={"name"} title={"Name"} />

          <TextInput control={control} field={"title"} title={"Title"} />

          <TextInput control={control} field={"phone"} title={"Phone"} />

          <TextInput control={control} field={"email"} title={"Email"} />
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
