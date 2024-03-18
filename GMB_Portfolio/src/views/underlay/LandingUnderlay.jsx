import React, { useState, useEffect } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { Navbar } from '../../components/Navbar/navbar'
import { Hero } from '../../components/Hero/hero'
import { BelowHeroContent } from '../../components/TabNav/BelowHero.jsx'
import { ContactContainer } from '../../components/Cards/CardContainers/contact.jsx';
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
        large: { lg: "translateX(calc(0rem - 21vw))" },
        med_Large: { md_lg: "translateX(calc(0rem - 25vw))" },
        medium: { md: "translateX(calc(1rem - 20vw))"  },
        med_small: { md_sm: "translateX(calc(0rem - 18vw))"  },
        xx_small: { xs: "translateX(calc(0rem + 1vw))" },
        Samsung: { sm: "translateX(calc(0rem - 22vw))" },
        Iphone: { cust: "translateX(calc(1rem - 0vw))" },      
    };

    const heroTransform = {
      x_small: { xs: "translateX(calc(0rem + 5vw)) translateY(calc(0rem - 9.5vh))" },
      customHero: { cust: "translateX(calc(0rem + 5vw)) translateY(calc(0rem - 9.5vh))" },
      SamsungHero: { sm: "translateX(calc(0rem + 5vw)) translateY(calc(0rem - 9.5vh))" },
      IphoneHero: { cust: "translateX(calc(0rem + 19vw)) translateY(calc(0rem - 9.5vh))" },      
  };
      // transforms pointer movement based on screen size
      const transformObj = screenSize > 1100 ? heroTransform.customHero : 
                                screenSize > 1000 ? heroTransform.customHero :
                                screenSize > 900 ? heroTransform.customHero : 
                                screenSize > 800 ? heroTransform.customHero :
                                screenSize > 700 ? heroTransform.customHero : 
                                screenSize > 600 ? heroTransform.customHero :
                                screenSize > 500 ? heroTransform.customHero : 
                                screenSize >= 480 ? heroTransform.SamsungHero :
                                screenSize > 400 ? heroTransform.IphoneHero :
                                screenSize > 300 ? heroTransform.IphoneHero : 
                                screenSize > 200 ? heroTransform.x_small : 
                                heroTransform.x_small;
    
    // transforms pointer movement based on screen size
    const transformTheFooter = screenSize > 1100 ? footerTransform.large : 
                             screenSize > 1000 ? footerTransform.large :
                             screenSize > 900 ? footerTransform.med_Large : 
                             screenSize > 800 ? footerTransform.med_Large :
                             screenSize > 700 ? footerTransform.medium : 
                             screenSize > 600 ? footerTransform.medium :
                             screenSize > 500 ? footerTransform.med_small : 
                             screenSize >= 480 ? footerTransform.Samsung :
                             screenSize > 400 ? footerTransform.Iphone :
                             screenSize > 300 ? footerTransform.Iphone : 
                             screenSize >= 280 ? "translateX(calc(0rem + 10vw))" : 
                             footerTransform.xx_small;

     // Extract the CSS transform value from the selected object
  const footerTranslateValue = Object.values(transformTheFooter)[0];
  const heroTranslateValue = Object.values(transformObj)[0];


    return (
        <Box h='auto' display="flex" flexDirection="column">
          {/* Navbar fixed to the top */}
          <Box position="fixed" top="0" right="0" width="100%" zIndex="banner">
            <Navbar />
          </Box>
          {/* Scrollable main content */}
          <Box /* Adjust top margin based on NavBar height */
            mb='auto' /* Dynamically calculated based on Footer height and additional space */
            overflowY="auto" /* Allows content to scroll */
            position="relative" /* Necessary for accurate scrolling */
            transform={heroTranslateValue}
            overflow="visible"
          >
            <Hero />
            {/* This sets the Portfolio view on load */}
            <BelowHeroContent currentView={"WebApps"} />
            <ContactContainer/>
          </Box>
            
            
          {/* Footer fixed to the bottom */}
          <Box  bottom="0" transform={footerTranslateValue} width="107vw" zIndex="banner">
            <Footer />
          </Box>
        </Box>
      );
    }
    