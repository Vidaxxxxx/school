import {
    FormControl,
    FormErrorMessage,
    FormLabel,
} from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Field, useField } from "formik";
import React, { useState } from 'react';

const PasswordField = ({ label, ...props }) => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const [field, meta] = useField(props);

    return (
        <FormControl isInvalid={meta.touched && meta.error}>
            <FormLabel>{label}</FormLabel>
            <InputGroup>
                <Input
                    as={Field}
                    {...field} {...props}
                    pr="4.5rem"
                    type={show ? 'text' : 'password'}
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
            <FormErrorMessage fontSize="xs">{meta.error}</FormErrorMessage>
        </FormControl>
    );
};



export default PasswordField;