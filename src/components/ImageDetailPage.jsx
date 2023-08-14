import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heading, Text, Button, Flex, Textarea, Box, FormControl, FormLabel, Input, FormErrorMessage, VStack } from '@chakra-ui/react';
import axios from 'axios';

const ImageDetailPage = () => {
    const { videoId } = useParams();
    const [videoData, setVideoData] = useState(null);
    const [comments, setComments] = useState([]);
    const [otherVideos, setOtherVideos] = useState([]);
    const [username, setUsername] = useState('');
    const inputRef = useRef(null);
    const [usernameError, setUsernameError] = useState('');
    const [commentError, setCommentError] = useState('');
    const [products, setProducts] = useState([]);



    useEffect(() => {
        axios.get(`http://localhost:3000/api/videos?videoId=${videoId}`)
            .then((res) => {
                setVideoData(res.data);
                console.log(JSON.stringify(res.data))
            })
            .catch((error) => {
                console.error('Error fetching video data:', error);
            });

        axios.get(`http://localhost:3000/api/comments?videoId=${videoId}`)
            .then((res) => {
                setComments(res.data);
            })
            .catch((error) => {
                console.error('Error fetching comments:', error);
            });

        axios.get('http://localhost:3000/api/videos')
            .then((res) => {
                setOtherVideos(res.data.filter(video => video.videoId !== videoId));
            })
            .catch((error) => {
                console.error('Error fetching other videos:', error);
            });

        // Get products
        axios.get(`http://localhost:3000/api/products?videoId=${videoId}`)
            .then((res) => {
                setProducts(res.data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, [videoId]);

    const handleCommentSubmit = () => {
        if (!username || !inputRef.current.value) {
            if (!username) setUsernameError('Username is required.');
            if (!inputRef.current.value) setCommentError('Comment is required.');
            return;
        }

        setUsernameError('');
        setCommentError('');

        const commentData = {
            videoId: videoId,
            userName: username,
            comment: inputRef.current.value,
        };

        axios.post(`http://localhost:3000/api/comments`, commentData)
            .then((res) => {
                if (res.data.success) {
                    // Update comments after submitting a new comment
                    axios.get(`http://localhost:3000/api/comments?videoId=${videoId}`)
                        .then((res) => {
                            setComments(res.data);
                        })
                        .catch((error) => {
                            console.error('Error fetching comments:', error);
                        });

                    // Clear the comment input field and username
                    inputRef.current.value = '';
                    setUsername('');
                }
            })
            .catch((error) => {
                console.error('Error submitting comment:', error);
            });
    };

    const handleUsernameChange = (value) => {
        setUsername(value);
        setUsernameError('');
    };

    const handleCommentChange = (value) => {
        inputRef.current.value = value;
        setCommentError('');
    };

    return (
        <Flex minHeight="84vh" maxHeight="84vh" p="4" justifyContent="space-between" bgGradient="linear(to bottom, rgba(10, 80, 100, 0.8), rgba(0, 0, 0, 1))">
            {/* Left side for product list */}
            <VStack spacing={4} width="20%" align="stretch">
                {products.map((product) => (
                    <Box key={product.productId} p="4" borderWidth="1px" borderRadius="md" bg="gray.800" color="white">
                        <Text fontWeight="bold" fontSize="lg">{product.title}</Text>
                        <Text fontSize="md">{product.price}</Text>
                        <Link
                            href={product.linkProduct}
                            target="_blank"
                            rel="noopener noreferrer"
                            color="blue.300"
                            onClick={(e) => {
                                e.preventDefault();
                                window.open(product.linkProduct, '_blank');
                            }}
                        >
                            Lihat Produk
                        </Link>
                    </Box>
                ))}
            </VStack>

            <Flex direction="column" align="center" width="40%">
                {/* Center for selected image */}
                {videoData && (
                    <iframe
                        title={videoData.videoId}
                        width="100%"
                        height="700vh"
                        src={`https://www.youtube.com/embed/${videoData.embedYoutubeId}`}
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    />
                )}
            </Flex>

            <VStack align="stretch" spacing="4" width="15%" bg="gray.700" p="4" borderRadius="md">
                <Heading size="md" color="white" mb="2">
                    Comments
                </Heading>

                {/* List of comments */}
                <Box flex="1" overflowY="auto">
                    {comments.map((comment) => (
                        <Box key={comment.id} p="2" my="2" borderRadius="md" bg="gray.700">
                            <Flex justifyContent="space-between">
                                <Text fontWeight="bold" color="white">
                                    {comment.userName}
                                </Text>
                                <Text fontSize="sm" color="gray.300">
                                    {comment.timestamp}
                                </Text>
                            </Flex>
                            <Text color="white" mt="1">
                                {comment.comment}
                            </Text>
                        </Box>
                    ))}
                </Box>


                {/* Input and button */}
                <Box>
                    <FormControl isInvalid={usernameError !== ''} mb="2">
                        <FormLabel color="white">Username</FormLabel>
                        <Input
                            type="text"
                            value={username}
                            onChange={(e) => handleUsernameChange(e.target.value)}
                            bg="gray.600"
                            color="white"
                            _placeholder={{ color: 'gray.400' }}
                        />
                        <FormErrorMessage color="red">{usernameError}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={commentError !== ''} mb="2">
                        <FormLabel color="white">Comment</FormLabel>
                        <Textarea
                            ref={inputRef}
                            onChange={(e) => handleCommentChange(e.target.value)}
                            bg="gray.600"
                            color="white"
                            _placeholder={{ color: 'gray.400' }}
                        />
                        <FormErrorMessage color="red">{commentError}</FormErrorMessage>
                    </FormControl>
                    <Button
                        onClick={handleCommentSubmit}
                        colorScheme="blue"
                        w="100%" // Set the width to 100% to match input width
                    >
                        Submit
                    </Button>
                </Box>
            </VStack>
        </Flex>
    );
}

export default ImageDetailPage;
