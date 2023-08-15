import React, {useEffect, useRef, useState} from 'react';
import {
    Box,
    Flex,
    Image,
    InputGroup,
    Input,
    InputRightElement,
    IconButton,
    VStack,
    Text, Avatar, MenuItem, MenuList, MenuButton, Menu
} from '@chakra-ui/react';
import {ChevronDownIcon, SearchIcon} from '@chakra-ui/icons';
import tokopediaPlayIcon from '../assets/tokopedia.png';
import stichAvatar from '../assets/stitch.png';

import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import {useUserContext} from "../UserContext.jsx";

const Header = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const { user, logout } = useUserContext();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleSearch = (value) => {
        setSearchValue(value);

        if (value.trim() === '') {
            setSearchResults([]);
            setShowSearchResults(false);
            return;
        }

        axios.get(`${import.meta.env.VITE_CLIENT_URL}/api/products?title=${value}`)
            .then((res) => {
                setSearchResults(res.data);
                setShowSearchResults(true); // Show the search results when there are results
            })
            .catch((error) => {
                console.error('Error fetching search results:', error);
            });
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setShowSearchResults(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <Box bg="gray.800" p="4" color="white" position="relative">
            <Flex alignItems="center" justifyContent="space-between">
                <Image src={tokopediaPlayIcon} alt="Tokopedia Play Icon" maxW="20vh" ml="10" />
                <Box flex="1" textAlign="center" margin="10px" maxW="60vh">
                    <InputGroup size="md" ref={inputRef}>
                        <Input
                            pr="2.5rem"
                            placeholder="Search products..."
                            value={searchValue}
                            onChange={(e) => handleSearch(e.target.value)}
                            borderRadius="full"
                            bg="white"
                            color="black"
                            border="none"
                            boxShadow="sm"
                            _focus={{
                                bg: 'white',
                                boxShadow: 'md',
                            }}
                        />
                        <InputRightElement width="2.5rem">
                            <IconButton
                                aria-label="Search"
                                icon={<SearchIcon />}
                                bg="green.500"
                                color="white"
                                borderRadius="full"
                                _hover={{ bg: 'green.600' }}
                            />
                        </InputRightElement>
                    </InputGroup>
                    <VStack
                        position="absolute"
                        color="black"
                        zIndex="1"
                        mt="2"
                        bg="white"
                        p="2"
                        borderRadius="md"
                        boxShadow="md"
                        minW="60vh"
                        left="50%"
                        transform="translateX(-50%)"
                        display={showSearchResults ? 'block' : 'none'}
                        textAlign="left"
                    >
                        {searchResults.length > 0 ? (
                            searchResults.map((result) => (
                                <Link
                                    key={result._id}
                                    to={`/image/${result.videoId}`}
                                    textDecoration="none"
                                    color="black"
                                >
                                    <Text>{result.title}</Text>
                                </Link>
                            ))
                        ) : (
                            <Text>No product found</Text>
                        )}
                    </VStack>
                </Box>
                <Box display="flex" alignItems="center">
                    <Link
                        to="/home"
                        style={{ fontSize: '20px', color: 'white', textDecoration: 'none', marginRight: '20px' }}
                    >
                        Home
                    </Link>
                    <Text fontSize="20px" color="white" mr="5">Hello, {user || ''}!</Text>
                    <Menu>
                        <MenuButton as={Avatar} size="sm" name={user || ''} src={stichAvatar}>
                            <ChevronDownIcon />
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={handleLogout} color="green">
                                Log out
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Box>

            </Flex>
        </Box>
    );
};

export default Header;
