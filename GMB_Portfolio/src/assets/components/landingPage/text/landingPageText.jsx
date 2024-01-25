import { Stack, Box, Text, Flex } from '@chakra-ui/react';
// import {Logo} from '../images/logo';
import { css, keyframes } from '@emotion/react';

export const LandingPageText = ({font_Size}) => {

  return(
    <Text
      fontFamily="Inika"
      lineHeight="0.30"
      fontWeight="regular"
      fontSize={{ base: "36px", sm: "46px", md: "40px", lg: "48px", xl: "56px", "2xl": "56px" }}
      color="#2F80ED"
      mixBlendMode="darken"
      width="100%px"
      height="100%"
      maxWidth="100%"
      textAlign="left"
    >
    
      <span>W</span>
      <Box
        as="span"
        fontFamily="Inria Serif"
        lineHeight="0.48"
        fontSize={{ base: "22px", sm: "18px", md: "31px", lg: "30px", xl: "28px", "2xl": "28px" }}
        color="#333333"
      >
        elcome ✨
        <br></br> 
        <br></br>
        <br></br>
      </Box>
      <Box
        as="span"
        fontFamily="Inria Serif"
        lineHeight="1.0"
        fontSize="12px"
        color="#333333"
      ></Box>
      <Box
        as="span"
        fontFamily="Inria Serif"
        lineHeight="1"
        fontSize={font_Size}
        color="#333333"
      >
       Leader 👨‍💻 and family enthusiast 👪. Driven by growth 🌱 and innovation ∫∫ .
        
       Passionate full-stack developer ✨. Thriving on teamwork 🤝 and innovative problem-solving 🔍."
      </Box>
    </Text>
 
)}
