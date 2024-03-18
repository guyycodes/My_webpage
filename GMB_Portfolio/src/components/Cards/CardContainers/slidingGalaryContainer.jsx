import React, {useState, useEffect} from 'react';
import { Box } from '@chakra-ui/react';
import { SlidingGallery } from '../slideingGallery'; // Replace with the correct path

export const GalleryContainer = ({data}) => {

    const images = data.map(item => item.image);
    const titles = data.map(item => item.title);
    const descriptions = data.map(item => item.description);
    const prices = data.map(item => item.price);
    return (
        <Box>
                <SlidingGallery 
                    images={images}
                    titles={titles}
                    descriptions={descriptions}
                    prices={prices}
                    />
        </Box>
    );
};