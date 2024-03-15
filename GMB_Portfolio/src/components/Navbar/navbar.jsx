import React, {useState} from "react";
import { Box, 
  Flex,IconButton,
  useColorModeValue, 
  Text, 
  Button, 
  Image, 
  Link,
  useBreakpointValue, 
  Menu, 
  MenuItem,
  MenuButton,
  MenuList,
  Spacer,
  Drawer } from "@chakra-ui/react";
  import { HamburgerIcon, ChevronDownIcon } from '@chakra-ui/icons';
import reactLogo from '../../../public/react.svg';
import { CustomThemeSwitchButton } from "../../util/CustomeThemeSwitchButton/CustomThemeSwichButton.jsx";
import { CustomButton } from '../../util/buttons/CustomButtons.jsx'

export const Navbar = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  // controls the light dark mode coloras for the text
  const buttonTextColor = useColorModeValue('yellow.500', 'yellow.200');

  // Function to toggle the sidebar/drawer's open/close status
  const toggleDrawer = () => setIsOpen(!isOpen);

  // Function to close the sidebar/drawer
  const onClose = () => setIsOpen(false);

  // Hook to get responsive text values based on the current viewport size
  const themeSwitchButton = useBreakpointValue({ base: null, sm: <CustomThemeSwitchButton/> });

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
      <Box position="absolute" left="1em" transform="translateY(33%)" zIndex="2">
        <Box
          borderRadius="full"
          border="2px solid yellow"
          display="flex"
          alignItems="center"
          justifyContent="center"
          ml="5vw"
          bg="white"
          height="120px"
          width="120px"
          borderBottomRadius="full"
          borderTop="0"
          _before={{
            content: '""',
            position: "absolute",
            width: "full",
            height: "50%",
            bg: "white",
            borderRadius: "50% 50% 0 0",
            transform: "translateY(-50%)",
            zIndex: "0",
          }}
        >
          <Image
            src={reactLogo}
            boxSize="120px"
            p={2}
            alt="Logo"
            position="absolute"
            bottom="0"
          />
        </Box>
      </Box>
  
      {/* Controls the underline under the navbar */}
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
        left="calc(100vw - 75vw)"
        height="100%"
        align="center"
        zIndex="1"
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          icon={<HamburgerIcon />}
          left={{ base: 47, md: 5 }}
          variant="ghost"
          aria-label="Toggle Navigation"
          onClick={toggleDrawer}
        />
        <Drawer isOpen={isOpen} placement="top" onClose={onClose}>
          {isOpen && <Sidebar />}
        </Drawer>
  
        <Flex
          display={{ base: "none", md: "flex" }}
          position="absolute"
          transform="translateX(33%)"
          height="100%"
          align="center"
          zIndex="1"
        >
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              pr={4}
              mr={6}
              width="auto"
              border="1px solid black"
            >
              About Me
              <ChevronDownIcon />
            </MenuButton>
            <MenuList width="fit-content">
              <MenuItem onClick={() => handleRouting("Full_Rehabs")}>
                Portfolio
              </MenuItem>
              <MenuItem onClick={() => handleRouting("Investment_Property_Analysis")}>
                Deployments
              </MenuItem>
              <MenuItem onClick={() => handleRouting("Room_Addition")}>
                Designed Components
              </MenuItem>
              <MenuItem onClick={() => handleRouting("Kitchen")}>
                Myers-Briggs
              </MenuItem>
              <MenuItem onClick={() => handleRouting("Bathroom")}>Career</MenuItem>
              <MenuItem onClick={() => handleRouting("Room_Addition")}>
                Social
              </MenuItem>
            </MenuList>
          </Menu>
          <Spacer />
          <CustomButton
            children="My Blog"
            onClick={() => console.log("Button clicked")}
          />
        </Flex>
      </Flex>
  
      {/* Hire button */}
      <Box
        display="flex"
        flexDirection="row"
        position="absolute"
        top="50%"
        right="3em"
        transform="translateY(-50%)"
        zIndex="banner"
      >
        <Box pr={4} alignSelf="center">
          {themeSwitchButton && <CustomThemeSwitchButton />}
        </Box>
        <Button
          as="a"
          p={2}
          href="#order"
          variant="outline"
          borderColor={buttonTextColor}
          color={buttonTextColor}
          _hover={{
            bg: buttonTextColor,
            color: "black",
          }}
        >
          Hire Me
        </Button>
      </Box>
    </Flex>
  );
  };
  