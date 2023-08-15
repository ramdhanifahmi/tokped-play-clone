import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, VStack, Image } from '@chakra-ui/react';
import {useUserContext} from "../UserContext.jsx";
import tokpedLogo from '../assets/tokopedia-login.png';

const LoginPage = () => {
    const navigate = useNavigate();

    const { setUser } = useUserContext();

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');

    const handleLogin = () => {
        if (username.trim() === '') {
            setUsernameError('Username is required.');
            return;
        }

        setUsernameError('');

        setUser(username);
        navigate('/home');
    };

    return (
        <VStack spacing={4} alignItems="center" justifyContent="center" minHeight="100vh">
            <Image src={tokpedLogo} alt="Login Image" maxWidth="400px" />
            <Box p={4} borderWidth={1} borderRadius="md" boxShadow="lg" width="400px">
                <FormControl isInvalid={usernameError !== ''}>
                    <FormLabel color="white">Username</FormLabel>
                    <Input
                        type="text"
                        color="white"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />
                </FormControl>
                <Button mt={4} colorScheme="blue" onClick={handleLogin}>
                    Log In
                </Button>
                {usernameError && <Box mt={2} color="red">{usernameError}</Box>}
            </Box>
        </VStack>
    );
};

export default LoginPage;
