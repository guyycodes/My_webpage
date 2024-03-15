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
            lineHeight="1.2"
            fontWeight="bold"
            fontSize={{ base: "1.5rem", sm: "2rem", md: "2rem", lg: "2rem", xl:'2rem' , "2xl":'2.25rem' }}
            textShadow="1px 1px 1px rgba(255, 255, 255, 0.8), -1px -1px 1px rgba(0, 0, 0, 0.2),4px 4px 5px rgba(0, 0, 0, 0.5),1px 1px 2px rgba(0, 0, 0, 0.1)"
          >
            <Text as="span" color="#ffffff">
              Welcome to 
            </Text>
            <br/>
            <Text as="span" color="#F2994A">
            🍃NOREN
            </Text>
            {''}
            <Text as="span" color="#8fbc8f">
              WOOD🍃
            </Text>
          </Text>
        <Text
          fontFamily="Noto Sans"
          lineHeight="1.75"
          fontSize={{ base: ".9rem", sm: '1rem', md: "1rem", lg: "1rem", xl:'1rem' }}
          color="#ffffff"
          textAlign="center"
          textShadow="1px 1px 1px rgba(255, 255, 255, 0.8), -1px -1px 1px rgba(0, 0, 0, 0.2),4px 4px 5px rgba(0, 0, 0, 0.5),1px 1px 2px rgba(0, 0, 0, 0.1)"
          backgroundColor="rgba(169, 169, 169, 0.5)"
          borderRadius="10px"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.5)"
          p={1}
          >
          “ Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
          Quidem laborum iste nisi iusto dolorum enim rem nesciunt odio.. “
        </Text>
      </Box>

    )

}