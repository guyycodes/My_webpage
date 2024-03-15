import React from "react";
import { Box, Text} from '@chakra-ui/react'


export const HeroText = () => {
    return(
        <Box 
        maxWidth={{ base: '90%', md: '60%', lg: '50%'}}
        mb={{ base: 'calc(100vh - 90vh)', md: 'calc(100vh - 75vh)', lg: 'calc(100vh - 75vh)'}}
        zIndex={1}
        >
       <Text
            fontFamily="EB Garamond"
            lineHeight="1"
            fontWeight="bold"
            fontSize={{ base: "1.5rem", sm: "2rem", md: "2rem", lg: "2rem", xl:'2rem' , "2xl":'2.25rem' }}
            textShadow="1px 1px 1px rgba(255, 255, 255, 0.8), -1px -1px 1px rgba(0, 0, 0, 0.2),4px 4px 5px rgba(0, 0, 0, 0.5),1px 1px 2px rgba(0, 0, 0, 0.1)"
          >
            <Text as="span" color="#ffffff">
              Welcome to 
            </Text>
            <br/>
            <Text as="span" color="#F2994A">
            GuyMorganB
            </Text>
            {''}
            <Text as="span" color="#8fbc8f">
              .com🍃
            </Text>
          </Text>
        <Text
          fontFamily="Noto Sans"
          lineHeight="1.7"
          fontSize={{ base: ".9rem", sm: '1rem', md: "1rem", lg: "1rem", xl:'1rem' }}
          color="#ffffff"
          textAlign="center"
          textShadow="1px 1px 1px rgba(255, 255, 255, 0.8), -1px -1px 1px rgba(0, 0, 0, 0.2),4px 4px 5px rgba(0, 0, 0, 0.5),1px 1px 2px rgba(0, 0, 0, 0.1)"
          backgroundColor="rgba(169, 169, 169, 0.5)"
          borderRadius="20px"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.5)"
          p={1}
          >
          “ I am a freelance web developer and AWS certified cloud practitioner with over seven years of experience in service management.  
          I specialize in building user-friendly and scalable web applications using a variety of tech stacks. I also have extensive knowledge and skills in cloud computing. “
        </Text>
      </Box>

    )

}