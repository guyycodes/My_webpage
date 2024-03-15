import { DotsCard } from '../../components/DotCard/dotCard.jsx';
import { LandingUnderlay } from '../underlay/LandingUnderlay.jsx';
import { Morph } from '../../components/TextMorph/textMorph.jsx';
import React, { useState, useEffect } from 'react';
//VideoButton.module.css. This change signifies that the styles in this file are a module and should be treated as such by the build tool
import styles from './VideoButton.module.css';
import { svgLarge } from '../../../public/SVG/svgLarge.jsx'
import { svgSmall } from '../../../public/SVG/svgSmall.jsx';
import { svgXsmall } from '../../../public/SVG/svgXsmall.jsx';
import { Box, Input } from '@chakra-ui/react';

export const VideoButton = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
 
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1300);
    const [isXSmallScreen, setIsXSmallScreen] = useState(window.innerWidth < 505);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const responsiveFont = { base: "1.1rem", sm: ".9rem", md: "1.659rem", lg: "1.5rem", xl: "1.4rem", "2xl": "1.4rem" }

    useEffect(() => {
      const handleResize = () => {
        const width = window.innerWidth;
        setIsXSmallScreen(width < 505);
        setIsSmallScreen(width >= 505 && width < 1170);
        setIsMobileView(width < 768);
      };
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
  
    return (
      <>
        <Box className={styles.svgMask}>
          <Box className={styles.mainContentContainer}>
            <div>
              {/* Svg positioning is controlled by VideoButton.module.css and the text position is controlled inside dotCard.css */}
             {!isChecked && <DotsCard content={isSmallScreen ? svgSmall() : isXSmallScreen ? svgXsmall() : svgLarge()} content2={<Morph isChecked={()=>{isChecked}}/>}/>} 
            </div>
            <Box className={styles.lowerContainer}>
              {/* for secondary content below the card */}
            </Box>
          </Box>
          <Box className={styles.customSvg}>  
            <Box className={styles.wrapper}>
              <Input     
                type="checkbox"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <Box className={styles.video}>
            <video 
                loop={true} 
                muted={true} 
                autoPlay={true}
              >
                {Date.now() % 2 === 0 
                    ? <source src="https://www.robmillsarchitects.com/files/land/city/RMA_Web_land_city_1.mp4" type="video/mp4" />
                    : Date.now() % 3 === 0 ? <source src="https://www.robmillsarchitects.com/files/land/city/RMA_Web_land_city_2.mp4" type="video/mp4" />
                    : <source src="https://www.robmillsarchitects.com/files/land/city/RMA_Web_land_city_3.mp4" type="video/mp4"/>
                    }
            </video>
              </Box >
              <Box className={styles.text}>
              <Box
                as="span"
                className="videoText"
                data-text={isChecked ? "⏪ Click to return" : "🎯 Click to watch"}
              />
              </Box>
              <Box className={styles.underlay}> 
              {/* Manages the content on the bottom of the screen */}
                <Box className={styles.underlayContent}>
                  {isChecked && <LandingUnderlay isCheckboxChecked={isChecked} input={isChecked} isMobileView={isMobileView} />}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    );
    
};


  //     {
  //       "contents": [
  //         {"role":"user",
  //          "parts":[{
  //            "text": "Write the first line of a story about a magic backpack."}]},
  //         {"role": "model",
  //          "parts":[{
  //            "text": "In the bustling city of Meadow brook, lived a young girl named Sophie. She was a bright and curious soul with an imaginative mind."}]},
  //         {"role": "user",
  //          "parts":[{
  //            "text": "Can you set it in a quiet village in 1600s France?"}]},
  //       ]
  //      }