import React from "react";
import { TextField, IconButton } from "@material-ui/core";

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

type IconProps = {
    color: string | undefined;
};

type RenderIconButtonType = {
    Icon: React.FC<IconProps>;
    props: object;
    iconColor?: string;
};

export const RenderIconButton = ({
    Icon,
    iconColor,
    ...props
}: RenderIconButtonType) => {
    return (
        <IconButton {...props}>
            <Icon color={iconColor} />
        </IconButton>
    );
};
