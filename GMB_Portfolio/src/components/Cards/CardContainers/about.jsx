import React from 'react';
import { Box, Center, Image, Text } from '@chakra-ui/react';
import image from '../../../../public/images/me.png'

export const AboutContentContainer = () => {

  return (
    <Center h="80vh" p={8} flexDir='column'>
        <Box w={["100%", "80%", "66.67%", "33.33%"]} m='auto'>
            <Image 
                src={image} 
                alt="Your alternative text can go here"
                w="100%"
                objectFit='contain' 
                borderRadius='md'
            />
        </Box>
        <Box w={["100%", "80%", "80%", "66.67%"]} m='auto'>
            <Text textSize='md'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco 
            laboris nisi ut aliquip ex ea commodo consequat.
            </Text>
        </Box>
    </Center>
  );
};

