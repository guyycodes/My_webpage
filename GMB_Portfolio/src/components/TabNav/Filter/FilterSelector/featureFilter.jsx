import React, { useState, useEffect, useRef } from "react";
import { Spinner, Box, Flex, Text, IconButton, VStack ,HStack, Button, Tooltip, Input, InputGroup, InputRightElement, Center } from "@chakra-ui/react";
import { CalendarIcon, ViewIcon } from '@chakra-ui/icons';
import { sortByLocation } from "../../../../util/sortByLocation.js";
import Trie from '../../../../util/textSearchTrie.js'
import { WideCardsContainer } from "../../../Cards/CardContainers/wideCardContainer.jsx";
import { DynamicCardContainer } from "../../../Cards/CardContainers/dynamicCardContainer";
import { GalleryContainer } from "../../../Cards/CardContainers/slidingGalaryContainer";
// import { MyCalendar } from "../cardTemplates/cardContainers/calander.jsx";
// import { RenderPagination } from "../../pagination/RenderPagination";


export const FeatureFilter = ({ cardData, secondaryNavSelection, CardContainerComponent }) => {
    // Ref for the dropdown container
    const dropdownRef = useRef();
    // set the card data
    const [items, setItems] = useState(cardData);
    // State for search query
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setLoading] = useState(false);
    // State for the index of the currently focused suggestion
    const [focusedSuggestionIndex, setFocusedSuggestionIndex] = useState(-1);

    const trie = useRef(new Trie());
    
    // Populate the trie with titles from cardData
    useEffect(() => {
        // console.log(cardData)
        setItems(cardData);
        cardData.forEach(item => {
            if (item.title) {
                trie.current.insert(item.title.toLowerCase());
            }
        });
    }, [cardData]);
    
    // to-do sort by location using google cloud

    // sort by date
    const sortByDate = () => {
        // Sorting logic
        const sortedItems = [...items].sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
        setItems(sortedItems);
    };

    // Function to handle search
    const handleSearch = () => {
        setLoading(true);
        
        const filteredItems = cardData.filter(item =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        setTimeout(() => {
          setItems(filteredItems);
          setSuggestions([]); // Clear suggestions after search
          setLoading(false);
        }, 1250);
      };

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim() === '') {  
            setSuggestions([]);
        } else {
            const completions = trie.current.findCompletions(query.toLowerCase());
            setSuggestions(completions);
        }
      };
      // handling the calander events in the cild component
      const handleTileClick = (title) => {
        setSearchQuery(title);
      };

    // Function to handle key press in search input
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            // ... existing Enter key logic
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault(); // Prevent the default input behavior

            setFocusedSuggestionIndex(prevIndex => {
                const newIndex = e.key === 'ArrowDown'
                    ? Math.min(prevIndex + 1, suggestions.length - 1)
                    : Math.max(prevIndex - 1, 0);

                // Adjust scroll position
                if (dropdownRef.current) {
                    const suggestionElements = dropdownRef.current.childNodes;
                    const focusedElement = suggestionElements[newIndex];
                    if (focusedElement) {
                        const dropdownRect = dropdownRef.current.getBoundingClientRect();
                        const focusedRect = focusedElement.getBoundingClientRect();

                        if (focusedRect.bottom > dropdownRect.bottom) {
                            dropdownRef.current.scrollTop += (focusedRect.bottom - dropdownRect.bottom);
                        } else if (focusedRect.top < dropdownRect.top) {
                            dropdownRef.current.scrollTop -= (dropdownRect.top - focusedRect.top);
                        }
                    }
                }

                return newIndex;
            });
        }
    };

    return (
        <Box width={["90%", "80%", "75%"]} mx="auto" mt={6}>
                {/* Outer Flex container keeps search bar in place upon search*/}
            <Flex justifyContent="space-between" mb={16} flexDirection="column-reverse" >
                {/* Middle section: Search bar */}
                <Box width={"100%"} mx="auto">
          
                        <InputGroup size="md" m={1}>
                            <Input 
                            placeholder={ "Search..."}
                            value={searchQuery}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            bg="white"
                            border="1px"
                            pr="3.5rem"
                            borderColor="gray.300"
                            w="full"
                            >
                                
                            </Input>
                            <InputRightElement width="4.5rem" children={isLoading ? <Spinner size="md" /> : null}>
                            <Button 
                                h="1.75rem" 
                                size="sm" 
                                onClick={handleSearch} 
                                bg="#74b9ff" 
                                _hover={{ bg: 'blue.100' }}
                                border='.5px solid gray'
                                p={0}
                            >
                                🔎
                            </Button>
                            </InputRightElement>
                        </InputGroup>
                        
                    {/* Dropdown for suggestions */}
                    {suggestions.length > 0 && (
                            <VStack 
                            ref={dropdownRef}
                            align="stretch" 
                            mt="2rem" 
                            position="absolute"
                            width="full"
                            zIndex="dropdown"
                            bg="rgba(255, 255, 255, 0.5)"
                            maxH="100px" // Adjust this value if necessary
                            overflowY="scroll" // Force scrollbar visibility
                            borderRadius="md"
                            boxShadow="md"
                            sx={{ // Custom scrollbar styles
                                '&::-webkit-scrollbar': {
                                    width: '8px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    width: '12px',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    background: 'gray',
                                    borderRadius: '10px',
                                },
                            }} 
                        >
                            {suggestions.slice(0, 5).map((suggestion, index) => ( // Only show first 5 suggestions
                                <Button
                                    key={index}
                                    variant="ghost"
                                    justifyContent="start"
                                    bg={index === focusedSuggestionIndex ? "#F2994A" : "transparent"} // Highlight focused item
                                    borderRadius="0"
                                    onClick={() => setSearchQuery(suggestion)}
                                >
                                    {suggestion}
                                </Button>
                            ))}
                        </VStack>
                    )}
                </Box>
                {/* Right section: View and icons */}
                <HStack spacing={4} alignSelf="center">
                    
                    {(CardContainerComponent === WideCardsContainer || CardContainerComponent  === DynamicCardContainer || CardContainerComponent === GalleryContainer) && (
                        <>
                        <Tooltip label="Sort by Date" placement="top">
                            <IconButton aria-label="Sort by Date" icon={<CalendarIcon />} onClick={sortByDate} />
                        </Tooltip>
                        <Tooltip label="Sort by Location" placement="top">
                            <IconButton aria-label="Sort by Location" icon={<ViewIcon />} onClick={sortByLocation} />
                        </Tooltip>
                        <Text>View</Text>
                        </>
                    )}
                </HStack>
            </Flex>
                {/* Separation line */}
            <Box borderBottom="1px" borderColor="gray.200" mb={4} />
                {/* Rendering the card templates through the card container, passing in the sorted data */}
                  {/* Conditional rendering of the card containers and calander */}
                  {isLoading ? 
                    <Center> 
                        <Box height="100vh" display="flex" alignItems="top" justifyContent="center">
                            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl"/>
                        </Box> 
                    </Center> : 
                    <>
                        {secondaryNavSelection === 'Schedule' && <MyCalendar data={items} onTileClick={handleTileClick}/>}
                        {CardContainerComponent && <CardContainerComponent data={items} />}
                    </>
                }
        </Box>
    );
};
