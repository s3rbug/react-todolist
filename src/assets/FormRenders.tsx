import React from "react";
import { TextField } from "@material-ui/core";

export const RenderTextField = ({
    label,
    input,
    autoFocus,
    fullWidth,
    margin,
    meta: { touched, invalid, error },
    ...custom
}: any) => (
    <TextField
        margin={margin}
        fullWidth={fullWidth}
        autoFocus={autoFocus}
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
);
