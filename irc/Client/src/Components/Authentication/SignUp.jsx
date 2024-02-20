import {
    VStack,
    Button,
    ButtonGroup,
    Heading,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from "@chakra-ui/react";

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import TextField from './TextField';
import PasswordField from "./PasswordField";
import { ArrowBackIcon } from "@chakra-ui/icons";
import axios from 'axios';
import { useState, useEffect } from "react";


async function submissionHandler(values, actions, setStatus) {
    const vals = { ...values };

    actions.resetForm();

    const host = process.env.BACKEND_URL || "http://localhost";
    const port = process.env.BACKEND_PORT || "4000";
    const serverUrl = `${host}:${port}/auth/signup`;

    try {
        const response = await axios.post(serverUrl, vals);
        setStatus("success");
    } catch (error) {
        setStatus("error");
    }
}

function SignUp() {
    const navigate = useNavigate();
    let [status, setStatus] = useState(null);

    useEffect(() => {
    }, [status]);

    const validationSchema = Yup.object({
        username: Yup.string()
            .required("Username required!")
            .min(4, "Username must be at least 4 characters")
            .max(28, "Username must be less than 32 characters"),
        password: Yup.string()
            .required("Password required!")
            .min(8, 'Password must be at least 8 characters')
            .max(32, 'Password must be less than 32 characters'),
    });

    const onSubmit = (values, actions) => submissionHandler(values, actions, setStatus)


    return (
        <>
            <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <VStack
                    as={Form}
                    w={{ base: "90%", md: "500px" }}
                    h="100vh"
                    m="auto"
                    justify="center"
                    spacing="1rem"
                >

                    <Heading>Sign Up</Heading>

                    {/* Username */}
                    <TextField
                        name="username"
                        placeholder="Enter username"
                        autoComplete="off"
                        label="Username"
                    />

                    {/* Password */}
                    <PasswordField
                        name="password"
                        placeholder="Enter password"
                        autoComplete="off"
                        label="Password"
                    />

                    <ButtonGroup pt="1rem" spacing="1rem">
                        <Button colorScheme="teal" type="submit">
                            Sign Up
                        </Button>
                        <Button
                            onClick={() => navigate('/login')}
                            leftIcon={<ArrowBackIcon />}
                        >
                            Back
                        </Button>
                    </ButtonGroup>



                </VStack>

            </Formik>
            {status === "success" && (
                <Alert status="success" size="sm" pos={"absolute"} bottom={"0"}>
                    <AlertIcon />
                    <AlertTitle>Registred successfully!</AlertTitle>
                    <AlertDescription>
                        New account created. Please go back to login.
                    </AlertDescription>
                </Alert >
            )
            }
            {
                status === "error" && (
                    <Alert status="error" size="sm" pos="absolute" bottom="0" >
                        <AlertIcon />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            Registration failed. Please try again.
                        </AlertDescription>
                    </Alert>
                )
            }
        </>
    );
};

export default SignUp;