import {Box, Grid, Image, Text} from "@chakra-ui/react";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {useUserContext} from "../UserContext.jsx";

const HomePage = ({ videos, handleClickImage }) => {
    const navigate = useNavigate();
    const { user } = useUserContext();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <Content>
            <Grid templateColumns="repeat(5, 1fr)" gap={4}>
                {videos.map((video, index) => (
                    <ImageGrid key={index} video={video} handleClickImage={handleClickImage} />
                ))}
            </Grid>
        </Content>
    );
};

const ImageGrid = ({ video, handleClickImage }) => {
    return (
        <Link to={`/image/${video.videoId}`} style={{ flex: '1' }}>
            <Box
                p="4"
                border="1px solid gray"
                borderRadius="md"
                _hover={{
                    boxShadow: 'md',
                    transform: 'scale(1.05)',
                }}
                mx="5"
                mb="4"
            >
                <Image src={video.urlImageThumbnail} alt={video.productName} width="100%" maxH="30vh" height="auto" />
                <Text mt="2" color="white">
                    {video.productName}
                </Text>
            </Box>
        </Link>
    );
};

const Content = ({ children }) => (
    <Box p="4" flex="1" display="flex" alignItems="center" justifyContent="center">
        {children}
    </Box>
);

export default HomePage;
