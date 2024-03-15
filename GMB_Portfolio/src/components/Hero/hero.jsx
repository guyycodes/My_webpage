import React from "react";
import { Image, Flex } from '@chakra-ui/react'
import backdrop from '../../../public/images/backdrop.png'
import { HeroText } from "./heroText";
import { HeroImage } from "./heroImage";


export const Hero = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center" 
      position="relative"
      borderRadius={'50%'}
      boxShadow="0 15px 5px rgba(0, 0, 0, 0.3);"
      overflow="hidden"
      h={{ base: '70vh', md: '60vh' }}
      w='full'
      m="0 auto"
      mb={4}
      >
      {/* Render backdrop image */}
        <Image
          src={backdrop}
          
          alt='mountain background with various scenery'
          w='full'
          h='full'
          objectFit="cover"
          objectPosition="center"
          
          position="absolute"
          zIndex={0}
          
        />
    <HeroImage/>
    <HeroText/>
    </Flex>
  )
}
