import React from "react";
import { Box, VStack, HStack, Heading, Text, Button, Image, useColorModeValue, Flex, Link, Tooltip } from '@chakra-ui/react';

export const DynamicCard = ({ cardData, onSelect, selectedCard }) => {
    const smallImageHeight = "177.5px";
    const imageHeight = ["310px", '375px' ];

    const hoverStyle = {
        transition: "transform 0.25s ease-in-out",
        '&:hover': {
          transform: 'scale(1.1)' // This will make the card larger on hover
        }
    };
   // Function to render all cards
   const renderAllCards = () => {
    let allCards = [];
    for (let i = 0; i < cardData.length; i += 4) {
      // Left-hand side card
      if (cardData[i]) {
        allCards.push(renderLeftCard(cardData[i], `left-${i}`));
      }

      // Right-hand side cards
      const rightCardsBatch = cardData.slice(i + 1, i + 4);
      if (rightCardsBatch.length > 0) {
        allCards.push(renderRightCards(rightCardsBatch, `group-${Math.floor(i / 4)}`));
      }
    }
    console.log(cardData)
    console.log(allCards)
    return allCards;
  };

 // Function to render a single card
 const renderLeftCard = (card, key) => {
    const { image, address, title, time, description, link, date } = card;
    return (
    <Box
    onClick={() => onSelect(card)}
    bg={useColorModeValue('white', 'gray.700')}
    maxW="lg"
    borderWidth="1px"
    rounded="lg"
    shadow="lg"
    position="relative"
    key={key}
  >
      <Box  
        w={["100%"]}
        h={imageHeight}
        bgImage={`url(${image})`}
        bgPos="center"
        bgSize="cover"
        bgRepeat="no-repeat"
        roundedTop={["lg", null, "xl"]}
      />
    <Box p="6">
      <Heading fontSize="xl" fontWeight="semibold" as="h3" lineHeight="tight">
        {title}
      </Heading>
      <Text fontSize="xs" as="h1" >{address}</Text>
      <Text mt={2}>{description}</Text>
      <Button mt={4} colorScheme="teal" as={Link} href={link}>
        Learn More
      </Button>
    </Box>
  </Box>
 )
};

const renderRightCards = (cards, groupKey) => {
    return(
        <VStack spacing={4} mb={12} key={groupKey}>
          {cards.map((card, index) => {
          const { image, address, title, time, description, link, date } = card;
            return(
                <Tooltip label="Click to enlarge details" fontSize="md" key={`${groupKey}-card-${index}`}>
                <Flex
                    onClick={() => onSelect(card)}
                    direction={["column", null, "row"]}
                    align="center"
                    bg={useColorModeValue('white', 'gray.700')}
                    maxW="calc(420px + 50px)"
                    borderWidth="1px"
                    rounded="xl"
                    shadow="lg"
                    w="100%"
                    h={smallImageHeight}
                    sx={{ 
                        ... (hoverStyle),
                        "@media screen and (max-width: 1200px)": {
                        fontSize: "smaller", // Adjust font size
                        ".dynamic-button": {
                            p: 1, // Adjust padding for button
                            mt:0,
                            fontSize: "smaller",
                        },
                        ".dynamic-text": {
                            fontSize: "smaller", // Adjust text font size
                        },
                        ".dynamic-heading": {
                            fontSize: "md", // Adjust heading font size
                        },
                        },
                        "@media screen and (max-width: 468px)": {
                            ".dynamic-button": {
                            fontSize: "xxs", // Smaller font size for button
                            p: 1, // Adjust padding for the button
                            mt: 0, // Adjust margin-top for the button
                            left: 10,
                            bottom: 3,
                            },
                            ".dynamic-heading": {
                                fontSize: "xs", // Adjust heading font size
                            },
                        },
                        
                        }}
                >
                    <Box
                    bgImage={`url(${image})`}
                    alt={`Card image`}
                    h='100%'
                    bgPos="center"
                    bgSize="cover"
                    roundedTop={["lg", null, "none"]}
                    roundedLeft={["none", null, "xl"]}
                    w={["100%", null, "40%"]}
                    objectFit="cover"
                    />
                    <Box p="4" flex="1">
 
                    <Text mt={0} >{description}</Text>
                    <Button mt={2} colorScheme="teal" className="dynamic-button" as={Link} href={link}>
                        Learn More
                    </Button>
                    </Box>
                </Flex>
                </Tooltip>
            );
          })}
        </VStack>
    );
};

  return (
    <>
    <HStack spacing={4} align="start" justifyContent="center" width="100%">
        {renderAllCards()}
    </HStack>
    </>
  );
};
