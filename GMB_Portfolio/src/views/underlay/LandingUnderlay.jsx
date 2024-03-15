import React, { useState, useEffect } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { Navbar } from '../../components/Navbar/navbar'
import { Hero } from '../../components/Hero/hero'
import { Footer } from '../../components/Footer/Footer';

export const LandingUnderlay = ({ isCheckboxChecked, input }) => {

    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const [isChecked, setIsChecked] = useState(input);

    const isMobileView = screenSize <= 480;

    // dynamic values based on the screen width to adjust features
    // deals with screen size changes
    useEffect(() => {
        const handleResize = () => {
        const newScreenSize = window.innerWidth;
        setScreenSize(newScreenSize);
        // onMobileViewChange(newScreenSize <= 480);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const footerTransform = {
        large: { lg: "translateX(calc(4rem - 27.5vw))" },
        med_Large: { md_lg: "translateX(calc(3.5rem - 25vw))" },
        medium: { md: "translateX(calc(1rem - 20vw))"  },
        med_small: { md_sm: "translateX(calc(1rem - 18vw))"  },
        small: { sm: "translateX(calc(1.5rem + 15vw))" },
        x_small: { xs: "translateX(calc(1rem + 17vw))" },
        custom: { cust: "translateX(calc(4.5rem - 25vw))" },   
    };
    
    // transforms pointer movement based on screen size
    const currentTransformObj = screenSize > 1100 ? footerTransform.large : 
                             screenSize > 1000 ? footerTransform.large :
                             screenSize > 900 ? footerTransform.custom : 
                             screenSize > 800 ? footerTransform.med_Large :
                             screenSize > 700 ? footerTransform.medium : 
                             screenSize > 600 ? footerTransform.medium :
                             screenSize > 500 ? footerTransform.med_small : 
                             screenSize >= 480 ? footerTransform.med_small :
                             screenSize > 400 ? footerTransform.small :
                             screenSize > 300 ? footerTransform.small : 
                             screenSize > 200 ? footerTransform.x_small : 
                             footerTransform.x_small;

     // Extract the CSS transform value from the selected object
  const footerTranslateValue = Object.values(currentTransformObj)[0];


    return (
        <Box minHeight="100vh" display="flex" flexDirection="column">
          {/* Navbar fixed to the top */}
          <Box position="fixed" top="0" right="0" width="100%" zIndex="banner">
            <Navbar />
          </Box>
    
          {/* Scrollable main content */}
          <Box /* Adjust top margin based on NavBar height */
            mb={{ base: "calc(4rem + 10vh)", md: "calc(4rem + 15vh)" }} /* Dynamically calculated based on Footer height and additional space */
            overflowY="auto" /* Allows content in this box to scroll */
            flex="1"
            position="relative" /* Necessary for accurate scrolling */
            transform="translateX(calc(0rem + 5vw)) translateY(calc(0rem - 9.5vh))"
            m={1}
          >
            {/* Main content goes here - Example: */}
            <Hero />
            {/* You can add more components that make up the main content of the page here. */}
            {/* This container will scroll if the content exceeds the screen height. */}
          </Box>
    
          {/* Footer fixed to the bottom */}
          <Box  bottom="0" transform={footerTranslateValue} width="105vw" zIndex="banner">
            <Footer />
          </Box>
        </Box>
      );
    }
    