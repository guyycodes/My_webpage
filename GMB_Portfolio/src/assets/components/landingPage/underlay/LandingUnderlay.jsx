import { Morph } from "../textMorph/textMorph.jsx";
import { Flex, Box } from '@chakra-ui/react';
import {LandingNav} from "./landingNav.jsx";
import { SlideInComponent } from "../testComponents/slideIn.jsx";
import { VintageMediaPlayer } from "../testComponents/vintagePlayer.jsx";
import { ChatBot } from "../chat/chat.jsx";
// import { useLocation } from 'react-router-dom';
export const LandingUnderlay = ({ isCheckboxChecked, isMobileView }) => {

    const location = window.location.href // Get the current location
    const isMorphPresent = location.pathname === "/";

    return (
        <Flex 
            direction={{ base: "column", md: "column", lg: "column" }} 
            height="5vh" 
            justify={{ base: "space-between", md: "space-between", lg:"space-between" }} 
            // align={{ base: "center", md: "center", lg: "center" }} 
            // overflow="hidden"
            ml={{ base: "21%", md: "center", lg: "10%" }} // paddingLeft of 10% for large screen size and higher.
            // pb={14}
        >
            <Box width="auto">
                {/* <TopNavContentPages isMorphPresent={isMorphPresent}/> */}
                
                <ChatBot/>
          
             
            </Box>
            <Box width="100%" transform="translateY(calc(100vh - 130vh))">
                <Morph />
            </Box>
            <Flex 
                justify="center" 
                align="center" 
                width="100%"
            >
                
                {/* <Hero isCheckboxChecked={isCheckboxChecked} isMobileView={isMobileView}/> */}
            </Flex>
        </Flex>
    );
}
