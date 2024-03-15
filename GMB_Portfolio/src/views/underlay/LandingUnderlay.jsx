import React, { useState } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { Navbar } from '../../components/Navbar/navbar'

export const LandingUnderlay = ({ isCheckboxChecked, input }) => {

    const [isChecked, setIsChecked] = useState(input);
    
    return (

        <Box position="fixed" top="0" right="0%" width="100%" zIndex="banner">
            <Navbar />
        </Box>
  
    );
}
