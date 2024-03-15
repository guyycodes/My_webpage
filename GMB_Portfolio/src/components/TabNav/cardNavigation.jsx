import { Box, Flex, Link, Text, Image, Button, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState, } from 'react';
import { motion } from "framer-motion"
import pointer from '../../../public/images/pointer.png';


export const CardNavbar = ({ onMobileViewChange, viewChangeFromParent, onActiveLinkChange }) => {
// Set the initial state where the pointer starts
const [activeLink, setActiveLink] = useState(viewChangeFromParent);
const [screenSize, setScreenSize] = useState(window.innerWidth);

const isMobileView = screenSize <= 480;

// moves pointer y-axis to acomodate for the navigation items being moultiple words
const pointerTransform = {large:'20px', small: '20px'}
const pointerTopPosition = screenSize > 626 ? pointerTransform.large : pointerTransform.small;

// Navigation items
const navItems = [
  { label: 'Schedule', id: 'Schedule' },
  { label: 'Gallery', id: 'Gallery' },
  { label: 'Specials', id: 'Specials' },
  { label: 'Contact', id: 'Contact'},
  { label: 'About', id: 'About'},
];

// dynamic values based on the screen width to adjust features
const imgTransform = {
  large: { Schedule: '3px', Gallery: '90px', Specials: '175px', Contact:'263px', About:'345px' },
  medium: { Schedule: '0px', Gallery: '70px', Specials: '145px', Contact:'217px', About:'290px'  },
  custom: { Schedule: '-3px', Gallery: '73px', Specials: '145px', Contact:'218px', About:'283px'  },   
};

// Responsive styles for Links and Separators
const linkStyle = { 
  fontSize: screenSize > 944 ? 'md' : screenSize > 410 ? 'xs' : 'xs', // Smaller font size for very small screens
  mr: screenSize > 410 ? 2 : 2, // Smaller margin for very small screens
};

// adjusts margin 
const separatorStyle = { 
  mx: screenSize > 410 ? 2 : 2, // Smaller margin for very small screens
};

// transforms pointer movement based on screen size
const currentTransform = screenSize > 944 ? imgTransform.large : 
                         screenSize > 564 ? imgTransform.medium :
                         imgTransform.custom;

// handle the active link in the nav bar, set it and pass it up to the parent
const setActiveLinkAndNotifyParent = (linkId) => {

  setActiveLink(linkId);
  onActiveLinkChange(linkId); // Notifying the parent component
};

// deals with screen size changes
useEffect(() => {
  const handleResize = () => {
    const newScreenSize = window.innerWidth;
    setScreenSize(newScreenSize);
    onMobileViewChange(newScreenSize <= 480);
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, [onMobileViewChange]);

// Mobile Navigation Component with 2x2 Grid
const MobileNav = () => (
  <Grid templateColumns="repeat(2, 1fr)" gap={4} justifyItems="center">
    {navItems.map((item, index) => (
      <GridItem key={item.id} colSpan={index === 4 ? 2 : 1}>
        <Button
          onClick={() =>{ setActiveLinkAndNotifyParent(item.id) }}
          colorScheme={activeLink === item.id ? "blue" : "gray"}
          w="100%" // Full width of the grid item
        >
          {item.label}
        </Button>
      </GridItem>
    ))}
  </Grid>
);

// Default Navigation Component
const DefaultNav = () => (
    <>
      {navItems.map((item, index) => (
        <React.Fragment key={item.id}>
          <Link
            onClick={() => setActiveLinkAndNotifyParent(item.id)}
            sx={linkStyle}
            color={activeLink === item.id ? "blue" : "black"} // Highlight active link
          >
            {item.label}
          </Link>
          {index < navItems.length - 1 && <Text sx={separatorStyle}> | </Text>}
        </React.Fragment>
      ))}
    </>
);

return (
  <Flex
    position="absolute"
    bottom={isMobileView ? '-100px' : '-40px'}
    left={0}
    right={0}
    bg='whitesmoke'
    borderRadius={8}
    margin="auto"
    px={6}
    py={6}
    color='black'
    alignItems='center'
    justify='center'
    width={{ base: '100%%', sm: '100%', md: '85%' }}
    boxShadow="0 0 0 8px rgba(187, 189, 191, 0.5)"
  >
    {/* Pointer outside of the conditional rendering */}
    <Text 
        fontSize="lg" 
        fontWeight="bold"
      /> 
    <Box 
      display="flex" 
      alignItems="center" 
      pos="relative"
    >
{!isMobileView && (
        <Box
          style={{ pointerEvents: 'none' }}
          pos="absolute"
          left="0"
          h="100%"
        >
          <motion.div
            animate={{ x: currentTransform[activeLink], y: pointerTopPosition }}
            transition={{ duration: 0.250 }}
          >
            <Image src={pointer} />
          </motion.div>
        </Box>
      )}
      <Flex justifyContent="space-between">
        {isMobileView ? <MobileNav /> : <DefaultNav />}
      </Flex>
    </Box>
  </Flex>
);
};