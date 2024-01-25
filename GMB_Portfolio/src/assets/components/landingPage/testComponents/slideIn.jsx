import React from 'react';
import { Box, useDisclosure, Button } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';


const MotionBox = motion(Box);

export const SlideInComponent = () => {
    const { isOpen, onToggle } = useDisclosure();
    // listen for mouse move
    // when mouse moves slide in a circle with a banner
    // 
    return (
        <>
            <Button onClick={onToggle}>Toggle Slide In</Button>
            <AnimatePresence>
                {isOpen && (
                    <MotionBox
                        initial={{ x: '-200%' }}
                        animate={{ x: '100' }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', stiffness: 100 }}
                        position="absolute"
                        left="0"
                        top="0"
                        w="200px"
                        h="100%"
                        bg="teal.500"
                    >
                        {/* Content of the sliding component */}
                        Your content here
                    </MotionBox>
                )}
            </AnimatePresence>
        </>
    );
};

