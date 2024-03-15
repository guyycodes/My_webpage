import React from "react";
import { Box, Image} from '@chakra-ui/react'
import me from '../../../public/images/me.png'
import pineCone from '../../../public/images/Ellipse4.png'


export const HeroImage = () => {

    return(
  <Box
      pos="relative"
      display="flex"
      alignItems="end"
      justifyContent="center"
      width={{ base: '80%', md: '80%' }}
      minHeight={{ base: '150px', sm: '300px', md: '550px'}}
      order={{ base: 0, sm: 0, md: 0, lg: 0, xl:0 }}
      left={{ base: 0, sm: 0, md: 0, lg: 0, xl:0 }}
      bottom={{ base: 0, sm: 2 }}
      top={{ base: 0, sm: 0, md: 0, lg: 0, xl:0 }}
      
    >
       
      <Image
          src={me}
          alt='Picture of me'
          boxSize={{ base: '100%', md: '70%'}}
          h="130%"
          objectFit="cover"
          
      />
    <>
      <Box
        pos="absolute"
        top={{ sm: '90%', md: '85%', lg: "85%"}}
        left={{ base: 0, sm: -6, md: 0, lg: 0, xl:0 }}
        display={{ base: 'none', sm: "flex"}}
        zIndex={0}
      >
         <Image
            src={pineCone}
            alt='Pinecone'
            boxSize={{ base: '50%', sm: '40%', md: '50%', lg: "60%"}}
            h="auto"
            objectFit="contain"
          />
      </Box>
      <Box
        pos="absolute"
        top={{ sm: '95%', md: '84%', lg: "82%", xl: "65%"}}
        left={["79%"]}
        display={{ base: 'none', sm: "flex"}}
        zIndex={0}
      >
      </Box>
    </>
      
  </Box>
  )

}