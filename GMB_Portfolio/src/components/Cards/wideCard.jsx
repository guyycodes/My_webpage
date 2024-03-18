import React from 'react';
import {Box, Text, VStack, Button, Heading, Flex, useColorModeValue, Link} from '@chakra-ui/react';

export const WideCard = ({ image, address, title, time, description, link, date }) => {
    const cardWidth = ["100%", "100%", "90vw"]; // Responsive card width
    const imageHeight = ["200px", "250px", "310px"]; // Responsive image height
    const boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)'; // Box shadow
    const hoverBoxShadow = '0 8px 25px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10)'; // Hover box shadow
  
    return (
      <Box
        w={cardWidth}
        borderRadius="lg"
        overflow="hidden"
        boxShadow={boxShadow}
        transition="box-shadow 0.2s ease-in-out"
        _hover={{
          boxShadow: hoverBoxShadow,
          transition: "transform 0.25s ease-in-out",
          '&:hover': {
            transform: 'scale(1.1)' // This will make the card larger on hover
          }
        }}
        p="0"
        m="4" // Added margin for some spacing between cards
      >
        <Flex
          direction={["column", null, "row"]}
          h="auto"
          bg={useColorModeValue('white', 'gray.800')}
          align="center"
        >
          <Box
            w={["100%", null, "40%"]}
            h={imageHeight}
            bgImage={`url(${image})`}
            bgPos="center"
            bgSize="cover"
            bgRepeat="no-repeat"
          />
          <VStack
            p={["4", "6"]}
            w={["100%", null, "60%"]}
            align="start"
            justify="center"
            spacing={4}
          >
            
            {/* Address of the event */}
            <Link
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
              isExternal
              fontSize={["sm", "md"]}
              color="gray.500"
              _hover={{ textDecoration: 'underline' }}
            >
              {address}
            </Link>
  
            {/* Title of the event */}
            <Link
              href={link}
              isExternal
              _hover={{ textDecoration: 'underline', color: 'blue.500' }}
            >
              <Heading fontSize={["lg", "xl"]} noOfLines={1}>
                {title}
              </Heading>
            </Link>
  
            {/* Date of the event */}
            <Text fontSize={["sm", "md"]} color="gray.500">
              {date}
            </Text>
            {/* Time of the event */}
            <Text fontSize={["xs", "sm"]} color="gray.500">
              {time}
            </Text>
  
            {/* Description of the event */}
            <Text fontSize={["sm", "md"]} noOfLines={[3, null, 2]}>
              {description}
            </Text>
  
            {/* Register button */}
            <Button
              as={Link} // Use Chakra Link as the button
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              mt="auto"
              width="full"
              bg="blue.600"
              color="white"
              _hover={{
                bg: 'blue.500',
                textDecoration: 'underline' // Add underline on hover for visual feedback
              }}
            >
              Register
            </Button>
          </VStack>
        </Flex>
      </Box>
    );
  };