import { VStack, Button, ButtonGroup, Heading } from "@chakra-ui/react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import TextField from './TextField';
import PasswordField from "./PasswordField";
import axios from 'axios';
import { useAuth } from "./AuthProvider";
import { useSocket } from "../SocketIO/socket";

async function submissionHandler(values, actions, onLogin, io) {
  const data = { ...values };

  actions.resetForm();

  const host = process.env.BACKEND_URL || "http://localhost";
  const port = process.env.BACKEND_PORT || "4000";
  const serverUrl = `${host}:${port}/auth/login`;

  try {
    const response = await axios.post(serverUrl, data);
    const { token } = response.data;

    io.emit("authenticate", token);

    onLogin(token);
  } catch (error) {
    console.log(error);
  }
}


function Login() {
  const navigate = useNavigate();
  const { onLogin } = useAuth();
  const io = useSocket();
  const onSubmit = (values, actions) => submissionHandler(values, actions, onLogin, io);


  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={Yup.object({
        username: Yup.string()
          .required("Username required!")
          .min(4, "Username must be at least 4 characters")
          .max(28, "Username must be less than 32 characters"),
        password: Yup.string()
          .required("Password required!")
          .min(8, 'Password must be at least 8 characters')
          .max(32, 'Password must be less than 32 characters'),
      })}
      onSubmit={onSubmit}
    >
      <VStack
        as={Form}
        w={{ base: "90%", md: "500px" }}
        h="100vh"
        m="auto"
        justify="center"
      >

        <Heading>Log In</Heading>

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
            Log In
          </Button>
          <Button onClick={() => navigate('/signup')}>
            Sign Up
          </Button>
        </ButtonGroup>

      </VStack>

    </Formik >
  );
};

export default Login;
