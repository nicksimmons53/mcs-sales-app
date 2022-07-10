import React from "react";
import { Button, FormControl, Input, Popover, Select } from "native-base";
import { useUpdateProgramsMutation } from "../services/client";
import { useForm } from "react-hook-form";
import Picker from "../components/picker";
import { programs } from "../constants/dropdownValues";
import { showNotification } from "../components/notification";

export default function AddProgramForm({ clientId, selectedPrograms }) {
  const { control, errors, handleSubmit, reset } = useForm();
  const [updatePrograms, result] = useUpdateProgramsMutation();
  const [loading, setLoading] = React.useState(false);
  const [choices, setChoices] = React.useState([]);

  React.useEffect(() => {
    let currentData = selectedPrograms.map(program => program.selection);
    setChoices(programs.filter(type => !currentData.includes(type.value)));
  }, [selectedPrograms]);

  const onSubmit = values => {
    setLoading(true);
    let value = {
      clientId: clientId,
    };
    value[values.program.toLowerCase()] = 1;

    updatePrograms({
      id: clientId,
      body: { ...value },
    })
      .unwrap()
      .then(res => {
        setLoading(false);
        showNotification({
          text: "Program Successfully Added",
        });
        reset({
          program: "",
        });
      });
  };

  return (
    <Popover.Content>
      <Popover.Arrow />
      <Popover.CloseButton />
      <Popover.Header>Add Program</Popover.Header>
      <Popover.Body>
        <FormControl>
          <Picker
            choices={choices}
            control={control}
            field={"program"}
            title={"Programs"}
          />
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
