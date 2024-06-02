import React, { useState } from "react";

import {
  FormControl,
  VStack,
  FormLabel,
  Input,
  Center,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "../atoms";
import { apiUrl } from "../atoms";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { errorHeading, successHeading, normalHeading } from "../utils/Utils";

function LoginPage() {
  const baseApiUrl = useRecoilValue(apiUrl);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useRecoilState(userState);

  const redirectToHomePage = () => {
    setTimeout(() => navigate("/"), 2000);
  };
  const handleEnterPress = (event) => {
    if (event.keyCode === 13) {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    const loginData = {
      username: username,
      password: password,
    };
    try {
      await axios.post(baseApiUrl + "login", loginData).then(({ data }) => {
        const loggedInUser = { id: data.id, username: data.username };
        setUser(loggedInUser);
        console.log(user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        redirectToHomePage();
        setSuccess(true);
      });
    } catch (error) {
      setError(true);
    }
  };
  const showHeading = () => {
    if (success) {
      return successHeading("Success!", "Redirecting to homepage...");
    } else if (error) {
      return errorHeading("Error!", "Wrong credentials.");
    } else {
      return normalHeading("Please log in.", "Insert your credentials.");
    }
  };

  return (
    <Center mt="100px">
      <VStack minWidth="40%" justifySelf="center" spacing="30px">
        {showHeading()}
        <FormControl isRequired>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email..."
            onChange={(event) => {
              setUsername(event.target.value);
              setError(false);
            }}
            onKeyDown={handleEnterPress}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password..."
            onChange={(event) => {
              setPassword(event.target.value);
              setError(false);
            }}
            onKeyDown={handleEnterPress}
          />
        </FormControl>
        <Button
          colorScheme="teal"
          rounded="full"
          width="50%"
          onClick={handleLogin}
          isLoading={success}
        >
          Log in
        </Button>
      </VStack>
    </Center>
  );
}

export default LoginPage;
