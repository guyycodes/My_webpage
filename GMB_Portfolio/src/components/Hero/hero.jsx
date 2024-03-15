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
      h={{ base: 'auto', sm: '85vh' }}
      w='full'
      m="0 auto"
      mb={4}
      >
      {/* Render backdrop image */}
        <Image
          src={backdrop}
          borderRadius={'50%'}
          alt='mountain background with various scenery'
          w='full'
          h='full'
          objectFit="cover"
          objectPosition="center"
          p={.5}
          position="absolute"
          zIndex={0}
          boxShadow="0 15px 5px rgba(0, 0, 0, 0.3);"
        />
    <HeroImage/>
    <HeroText/>
    </Flex>
  )
}
