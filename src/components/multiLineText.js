import React from "react";
import { FormControl, TextArea } from "native-base";
import { Controller } from "react-hook-form";

export default function MultiLineText({ control, field, title }) {
  return (
    <React.Fragment>
      <FormControl.Label>{title}</FormControl.Label>
      <Controller
        control={control}
        name={field}
        render={({ field: { onBlur, onChange, value } }) => (
          <TextArea
            onBlur={onBlur}
            value={value}
            onChangeText={text => onChange(text)}
          />
        )}
      />
    </React.Fragment>
  );
}
