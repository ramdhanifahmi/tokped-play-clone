import { useEffect, useState } from 'react';

function useImageData() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/videos')
            .then(response => response.json())
            .then(data => setImages(data))
            .catch(error => console.error('Error fetching images:', error));
    }, []);

    return images;
}

export default useImageData;
