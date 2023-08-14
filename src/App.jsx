import React, {useEffect, useState} from 'react';
import {Box, InputRightElement, Flex, Grid, Image, Text, InputGroup, Input, IconButton} from '@chakra-ui/react';
import {BrowserRouter as Router, Route, Link, useParams, Outlet, Routes} from 'react-router-dom';
import ImageDetailPage from "./components/ImageDetailPage.jsx";
import axios from "axios";
import Header from "./components/Header.jsx";
import HomePage from "./components/HomePage.jsx";

const App = () => {
    const [videos, setVideos] = useState([]);
    const [selectedVideoId, setSelectedVideoId] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_CLIENT_URL}/api/videos`)
            .then((res) => {
                setVideos(res.data);
            })
            .catch((error) => {
                console.error('Error fetching videos:', error);
            });
    }, []);

    const handleClickImage = (videoId) => {
        setSelectedVideoId(videoId);
    };

    return (
        <Router>
            <div style={{ minHeight: '100vh', overflow: 'hidden', background: 'linear-gradient(rgba(10, 80, 100, 0.8), rgba(0, 0, 0, 1))', display: 'flex', flexDirection: 'column'  }}>
                <Header />
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden'  }}>
                    <Routes style={{ flex: 1 }}>
                        <Route path="/" element={<HomePage videos={videos} handleClickImage={handleClickImage} />} />
                        <Route path="/image/:videoId" element={<ImageDetailPage />} />
                    </Routes>
                    <Footer>
                        <Box textAlign="center">Copyright Tokopedia</Box>
                    </Footer>
                </div>
            </div>
        </Router>
    );
};

const Footer = ({ children }) => (
    <Box bg="gray.800" p="4" textAlign="center" color="green">
        {children}
    </Box>
);


export default App;
