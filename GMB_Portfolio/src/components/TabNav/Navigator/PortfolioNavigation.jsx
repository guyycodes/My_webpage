import { Box, Flex, Link, Text, Image, Button, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState, } from 'react';
import { motion } from "framer-motion"
import pointer from '../../../../public/images/pointer.png';


export const PortfolioNavigator = ({ onMobileViewChange, viewChangeFromParent, onActiveLinkChange }) => {
// Set the initial state where the pointer starts
const [activeLink, setActiveLink] = useState(viewChangeFromParent);
const [screenSize, setScreenSize] = useState(window.innerWidth);

const isMobileView = screenSize <= 480;

// moves pointer y-axis to acomodate for the navigation items being moultiple words
const pointerTransform = {large:'20px', small: '20px'}
const pointerTopPosition = screenSize > 626 ? pointerTransform.large : pointerTransform.small;

// Navigation items
const navItems = [
  { label: 'WebApps', id: 'WebApps' },
  { label: 'MobileApps', id: 'MobileApps' },
  { label: 'Components', id: 'Components' },
  { label: 'Cloud', id: 'Cloud'},
  
];

// dynamic values based on the screen width to adjust features
const imgTransform = {
  large: { WebApps: '3px', MobileApps: '90px', Components: '175px', Cloud:'263px'},
  medium: { WebApps: '0px', MobileApps: '70px', Components: '145px', Cloud:'217px' },
  custom: { WebApps: '-3px', MobileApps: '73px', Components: '145px', Cloud:'218px' },   
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
    display='flex'
    flexDirection='column'
    left={0}
    right={0}
    transform='translateY(calc(-20vh))'
    bg='whitesmoke'
    borderRadius={8}
    margin="auto"
    p={5}
    color='black'
    alignItems='center'
    justify='center'
    width={{ base: '100%%', sm: '100%', md: '100%' }}
    boxShadow="0 0 8px 12px rgba(187, 189, 191, 0.6)"
  >
    <Box>
      <Text fontSize="lg" 
        fontWeight="bold">
        Portfolio
      </Text>
    </Box>
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