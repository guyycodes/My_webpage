import { Flex, Link as ChakraLink, useColorModeValue, Box, Link } from "@chakra-ui/react";
import React from "react";



export const NavbarLinks = () => {
    const links = ['Menus', 'Locations', 'About', 'Happenings', 'Gallery', 'Catering'];
  return (
    <Flex align="center">
      {links.map((link, index) => (
        <NavbarLink key={link} href="#" isLast={index === links.length - 1}>
          {link}
        </NavbarLink>
      ))}
    </Flex>
  );
};
  
  const NavbarLink = ({ href, children, isLast }) => {
    const textColor = useColorModeValue('gray.800', 'black'); // controls the light dark mode coloras for the text
    return (
      <Box as="span" mx="2" position="relative">
        <ChakraLink href={href} color={textColor} mx="2">{children}</ChakraLink>
        
        {!isLast && (
        <Box as="span" sx={{
          position: 'absolute',
          right: '-1em', // Adjust the position based on your spacing
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 'lg', // Adjust the size of the dot as needed
          lineHeight: '1em', // Adjust line height to center the dot vertically
        }}>
          •
        </Box>
      )}
    </Box>
  );
};
