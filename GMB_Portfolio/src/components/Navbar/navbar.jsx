import { Box, Flex, useColorModeValue, Text, Button, HStack, Image, Link } from "@chakra-ui/react";
import React from "react";
// import {ThemeToggleButton} from '../../util/ThemeToggle.jsx'
import { NavbarLinks } from "./navbarLinks.jsx";
import reactLogo from '../../../public/react.svg';
import { CustomThemeSwitchButton } from "../../util/CustomeThemeSwitchButton/CustomThemeSwichButton.jsx";
//import { TestCustomThemeSwitchButton } from "../../util/CustomeThemeSwitchButton/testThemeToggleButton.jsx";

export const Navbar = () => {
  const buttonTextColor = useColorModeValue('yellow.500', 'yellow.200');
    return (
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        position="relative"
        height="80px"
        p="1em"
        bg="white"
      >
        {/* Left side of the navbar */}
        <Box
          position="absolute"
          left="0"
          top="0"
          bottom="0"
          right="50%"
          borderBottom="2px solid yellow"
          
        />
  
        {/* Logo container */}
        <Box
          position="absolute"
          
          left="1em"
          transform="translateY(33%)"
          zIndex="2" // Higher z-index to stay above the other elements
        >
          <Box
            borderRadius="full"
            border="2px solid yellow"
            display="flex"
            alignItems="center"
            justifyContent="center"
            ml='5vw'
            bg="white" // Background color to cover the bottom border
            height="120px" // Set a fixed height for the container
            width="120px" // Set a fixed width for the container
            borderBottomRadius="full" // Full border radius only at the bottom
            borderTop="0" // No border at the top
            _before={{
                content: '""',
                position: 'absolute',
                width: 'full',
                height: '50%', // Half the height of the container
                bg: 'white', // Background to cover the top half of the border
                borderRadius: '50% 50% 0 0', // Rounded top, flat bottom
                transform: 'translateY(-50%)', // Shift upward to cover the top half
                zIndex: '0', // Ensure it's above the border but below the logo
              }}
          >
            <Image src={reactLogo} boxSize="120px" p={2} alt="Logo" position="absolute" bottom="0"/>
          </Box>
        </Box>
  
        {/* Right side of the navbar */}
        <Box
          position="absolute"
          left="50%"
          top="0"
          bottom="0"
          right="0"
          borderBottom="2px solid yellow"
        />
  
        {/* Navbar items */}
        <Flex
          position="absolute"
          left="27%"
          transform="translateX(50%)"
          height="100%"
          align="center"
          zIndex="1" // Lower z-index to stay below the logo
          
        >
          {/* Place ThemeToggleButton wherever it fits best in your design */}
          <CustomThemeSwitchButton/>
          <NavbarLinks />
          {/* ... other links */}
        </Flex>
  
        {/* Order button */}
        <Box
          position="absolute"
          top="50%"
          right="1em"
          transform="translateY(-50%)"
          zIndex="banner"
        >
          <Button
            as="a"
            href="#order"
            variant="outline"
            borderColor={buttonTextColor}
            color={buttonTextColor}
            _hover={{
              bg: buttonTextColor, // Background color on hover
              color: 'black', // Text color on hover
            }}
          >
            Order Online
          </Button>
        </Box>
      </Flex>
    );
  };
  