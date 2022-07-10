import React from "react";
import { Box, FormControl, Input } from "native-base";
import { Controller } from "react-hook-form";

export default function TextInput({ control, field, title }) {
  return (
    <Box flex={1}>
      <FormControl.Label>{title}</FormControl.Label>
      <Controller
        control={control}
        name={field}
        render={({ field: { onBlur, onChange, value } }) => (
          <Input
            onBlur={onBlur}
            value={value}
            onChangeText={text => onChange(text)}
          />
        )}
      />
    </Box>
  );
}
