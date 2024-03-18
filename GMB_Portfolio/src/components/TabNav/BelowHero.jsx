import React, { useState, useEffect } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { PortfolioNavigator } from './Navigator/PortfolioNavigation.jsx'
import { PropogateTemplates } from './Filter/FilterContainer.jsx'

// Structure and background for the content pages
export const BelowHeroContent = ({ currentView, changeViewFromChild }) => {

  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 480);
  const [activeLink, setActiveLink] = useState(currentView)
  
  // change the view to icons for mobile
  const handleMobileViewChange = (isMobile) => {
    setIsMobileView(isMobile);
  };

  // set the active link from the child component, this handles the top-page navbar only
  const handleActiveLinkChange = (activeLinkId) => {
    changeViewFromChild(activeLinkId)
    setActiveLink(activeLinkId)

  };
  // this is the container for everything below the hero
  return (
    <Flex
      direction="column" 
      // position='relative'
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white
        backdropFilter: 'blur(5px)', // Creates the frosted glass effect
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)', // Soft shadow for depth
        border: '2px solid rgba(255, 255, 255, 0.2)', // Subtle border
        borderRadius: '10px',
        boxShadow:"0 0 2px 4px rgba(187, 189, 191, 0.3)",
      }}
    >
        {/* This is the container for the navigator bar */}
      <Flex  >
      </Flex>
      <Box position="relative" width='100%' transform='translateY(calc(20vh))' >
          <PortfolioNavigator viewChangeFromParent={currentView} onMobileViewChange={handleMobileViewChange} onActiveLinkChange={setActiveLink} />
        </Box>
      {/* This section displays the cards */}
      <Box mt={isMobileView ? '90px' : '40px'}>
        <PropogateTemplates secondaryNavSelection={activeLink} />
      </Box>
 
    </Flex>
  );
};
