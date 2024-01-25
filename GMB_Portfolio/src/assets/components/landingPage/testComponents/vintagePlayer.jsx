import React from 'react';
import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Button,
  Image,
  Flex
} from '@chakra-ui/react';
// Import your custom images or SVGs
import {svgSmall} from '../../../utils/svgs/svgSmall.jsx';
import { motion } from 'framer-motion';

export const VintageMediaPlayer = () => {
  // Example of a custom button - you would create similar components for each control
  const CustomButton = ({ onClick, label }) => (
    <Button
      onClick={onClick}
      colorScheme="orange"
      variant="solid"
    >
      {label}
    </Button>
  );

  return (
    <Flex direction="column" align="center" justify="center">
      <Box
        bgImage={`url(${svgSmall})`}
        bgRepeat="no-repeat"
        bgSize="cover"
        w="full"
        p={4}
        borderRadius="lg"
        // Apply additional styles as needed
      >
        {/* Place your media player components here */}
        <Flex direction="row" justify="space-between" align="center">
          {/* Add custom sliders, buttons, and other controls */}
          <CustomButton label="Play" onClick={() => {/* Play logic */}} />
          <Slider aria-label="volume-slider" defaultValue={30}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          {/* More custom controls */}
        </Flex>
      </Box>
    </Flex>
  );
};
