import React from "react";
import { Text, IconButton, HStack } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

export const RenderPagination = ({ items, currentPage, itemsPerPage, handlePageChange }) => (
    <HStack justifyContent="center" spacing={2} my={4}>
        <IconButton 
            aria-label="Previous page" 
            icon={<ArrowLeftIcon />} 
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))} // Ensures the page doesn't go below 1
        />
        {Array.from({ length: Math.ceil(items.length / itemsPerPage) }, (_, i) => (
            <Text 
                key={i} 
                onClick={() => handlePageChange(i + 1)} 
                cursor="pointer"
            >
                {i + 1}
            </Text>
        ))}
        <IconButton 
            aria-label="Next page" 
            icon={<ArrowRightIcon />} 
            onClick={() => handlePageChange(Math.min(Math.ceil(items.length / itemsPerPage), currentPage + 1))} // Ensures the page doesn't go above the max
        />
    </HStack>
);
