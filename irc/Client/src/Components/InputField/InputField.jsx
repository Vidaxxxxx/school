import { Container, Input, InputGroup, InputRightElement, ButtonGroup, IconButton, Icon, Alert, AlertIcon } from "@chakra-ui/react"
import { FormErrorMessage, FormControl } from "@chakra-ui/form-control";
import { FaImages } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { Formik } from "formik";
import * as Yup from "yup";
import chatInputHandler from "./chatInputHandler";
import { useAuth } from "../Authentication/AuthProvider";
import React from "react";
import { useSocket } from "../SocketIO/socket";
import hasActiveChannel from "./hasActiveChannel";
import isValidCommand from "./isValidCommand";
import { useChannel } from "../Channels/ChannelProvider";

export default function InputField() {

    const { activeChannel } = useChannel();
    const [userJoined, setUserJoined] = React.useState({ status: false, username: "" });
    const [userLeft, setUserLeft] = React.useState({ status: false, username: "" });

    const io = useSocket();

    React.useEffect(() => {
        io.on(`channel_${activeChannel._id}_joined`, (user) => {
            setUserJoined({ status: true, username: user.username });
        });

        io.on(`channel_${activeChannel._id}_left`, (user) => {
            setUserLeft({ status: true, username: user.username });
        })

        return () => {
            io.off(`channel_${activeChannel._id}_joined`);
            io.off(`channel_${activeChannel._id}_left`);
        }
    }, [userJoined, userLeft])

    /**
     * Handles the submission of the input field by passing the typed string to the chatInputHandler
     *
     * @param {Array} values - the values from the form
     * @param {Object} actions - formik actions object
     * @return {void} 
     */
    const submissionHandler = (values, actions) => {
        actions.resetForm();
        chatInputHandler(values, io, activeChannel);
    }

    return (
        <Container w={{ md: "100%", xl: "80%" }} h="full" maxWidth={"100%"} padding={"10px"}>
            <Formik
                initialValues={{ message: "" }}
                validationSchema={Yup.object({
                    message: Yup.string()
                        .required("No empty messages!")
                        .min(1, "Must be at least 1 character")
                        .max(255, "Must be less than 255 characters"),
                })}
                validate={(values) => {
                    const errors = {};
                    if (!activeChannel && !isValidCommand(values.message)) {
                        errors.message = "No channel selected.";
                    }
                    else {
                        return;
                    }
                    return errors;
                }}
                onSubmit={submissionHandler}
            >
                {(formik) => (
                    <FormControl isInvalid={formik.touched && formik.errors.message}>

                        {/*Message Errors display*/}
                        <FormErrorMessage
                            fontSize="xs"
                            position="absolute"
                            zIndex={1}
                            top={"-35px"}
                            left={"10px"}
                            display={(userLeft.status || userJoined.status) ? "none" : "flex"}
                        >
                            {formik.errors.message}
                        </FormErrorMessage>

                        <Alert
                            status='info'
                            position="absolute"
                            zIndex={1}
                            top={"-70px"}
                            width={"80%"}
                            borderRadius={"md"}
                            display={userJoined.status ? "flex" : "none"}
                            onClick={() => {
                                setUserJoined({ status: false, username: "" });
                            }}
                        >
                            <AlertIcon />
                            User {userJoined.username} joined
                        </Alert>

                        <Alert
                            status='warning'
                            position="absolute"
                            zIndex={1}
                            top={"-70px"}
                            width={"80%"}
                            borderRadius={"md"}
                            display={userLeft.status ? "flex" : "none"}
                            onClick={() => {
                                setUserLeft({ status: false, username: "" });
                            }}
                        >
                            <AlertIcon />
                            User {userLeft.username} left
                        </Alert>




                        <InputGroup>
                            <Input
                                w="80%"
                                h="50px"
                                bg={"gray 700"}
                                placeholder={"Message"}
                                value={formik.values.message}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="message"
                            />

                            {/* Buttons */}
                            <InputRightElement h="100%" w="19%">
                                <ButtonGroup colorScheme="gray">
                                    <IconButton
                                        aria-label="Select images"
                                        icon={<Icon w="6" h="6"><FaImages /></Icon>}
                                    />
                                    <IconButton
                                        aria-label="Send"
                                        icon={<Icon w="6" h="6"><LuSend /></Icon>}
                                        type="submit"
                                        onClick={formik.submitForm}
                                    />
                                </ButtonGroup>
                            </InputRightElement>
                        </InputGroup>

                    </FormControl>

                )}
            </Formik>

        </Container >
    );
}

