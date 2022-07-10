import React from "react";
import { FormControl } from "native-base";
import { Controller } from "react-hook-form";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function DatePicker({ control, field, title }) {
  return (
    <React.Fragment>
      <FormControl.Label>{title}</FormControl.Label>
      <Controller
        control={control}
        name={field}
        render={({ field: { onBlur, onChange, value } }) => (
          <RNDateTimePicker
            onChange={(event, date) => onChange(date)}
            value={new Date(value) || new Date()}
          />
        )}
      />
    </React.Fragment>
  );
}
