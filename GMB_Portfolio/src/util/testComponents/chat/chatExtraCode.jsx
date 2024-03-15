
  // expands the right side
  const rightHalfMove = `@keyframes rightHalfMove {
    0% {
      width: 225px; /* Original Width */
      opacity: .2; /* Start transparent */
      background: none;
    }
    20%{
      opacity: .4;
    }
    40%{
      opacity: .6;
    }
    60%{
      opacity: .8;
    }
    80%{
      opacity: .9; /* End opaque */
    }
    100% {
      width: 176%; /* Expanded Width */
      opacity: 1;
      background: url("https://u-static.fotor.com/images/text-to-image/result/PRO-b684fa1c35d648049a5524d3ac49aaba.jpg") no-repeat center center;
      background-size: cover;
    }
  }`;
  const leftHalfMove = `@keyframes leftHalfMove {   /* begins with the shape the same size appoximately as above keyframe, then shinks in from the left using calc() back to original size */
    0% {
      width: 0%;  /* beginns with an equivalent expanded width where the other left off */
    }
    100% {
      width: 30%;                   /* Original Width */
      //left: calc(100% - 4.5em);     /* ends at left calc(...) */
   
    }
  }`;
  const topMoveUp = `@keyframes topMoveUp {
    0%{
      height: 0%;
    }
    100%{
      height: 100%;
      backgroundColor: 'rgba(255, 255, 255, 0.2)'
    }
  }`;
  const bottomMoveUp = `@keyframes bottomMoveUp {
    0%{
      height: ;
      top: 0%;
      backgroundColor: 'rgba(255, 255, 255, 0.4)'
    }
    100%{
      // height: 225px;
      top: -150px;
      backgroundColor: 'rgba(255, 255, 255, 0.6)'
    }
  }`;
  const bottomMoveDown = `@keyframes bottomMoveDown {
    0%{
      height: 0%;
      top: 0%;
      backgroundColor: 'rgba(255, 255, 255, 0.4)'
    }
    100%{
      // height: 225px;
      top: -150px;
      backgroundColor: 'rgba(255, 255, 255, 0.6)'
    }
  }`;
return (
    <Flex direction="row" align="top" justify="center">
    <Box
  sx={{
    position: 'absolute',
    padding: '2rem', // Space around the content
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white
    backdropFilter: 'blur(10px)', // Creates the frosted glass effect
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
    border: '2px solid rgba(255, 255, 255, 0.2)', // Subtle border
    width: ['auto', null, 'auto'], // 175px for smaller screens, 225px for larger
    height: ['auto', null, 'auto'],
    _before: {
      content: '""',
      position: 'absolute',
      right: 'var(--r, 80%)',
      bottom: '11em',
      width: '225px', // Width of the bubble
      height: '225px', // Height of the bubble
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: '10%', // Circular shape
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      filter:"drop-shadow(16px -16px 20px rgba(41, 138, 147, 0.8)) ",
      transition: "right 0.5s ease-in-out",
      clipPath:'polygon(0% 0%, 100% 0, 100% 75%, 75% 75%, 80% 100%, 50% 75%, 0% 75%)', 
      animation: 'leftHalfMove 2s forwards',
      
    },
    _after: {
      content: '""',
      position: 'absolute',
      right: '-203px', // Adjust the size of the extension
      top: 0,
      bottom: 0,
      width: '200px', // Width of the extended area
      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Match the Box background
      borderLeft: '2px solid rgba(255, 255, 255, 0.2)', // Border on the left side of the extension
      
    },
  }}
>
  
   <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center" // Center the children horizontally
      position="absolute"
      left="-150px"
      top="15em"
      width={['250px', null, 'auto']} // Responsive width
      height={['200px', null, '250px']} // Responsive height
      backgroundColor="rgba(255, 255, 255, 0.3)"
      borderRadius="20%"
      filter="drop-shadow(-16px 16px 20px rgba(41, 138, 147, 0.6)) hue-rotate(180deg)"
      clipPath="inset(10px 20px 30px 40px round 15px 50px)"
      animation="rightHalfMove 2s forwards"
      transition="background 2s ease-in-out"
      p="0 2rem 0 3rem" // Padding for the entire box
    >
  

    <Box
      ref={divRef}
      contentEditable
      suppressContentEditableWarning={true}
      onBlur={handleBlur}
      padding="8px"
      maxWidth="250px"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      _focus={{
        outline: 'none',
        borderColor: 'blue.500',
      }}
      whiteSpace="nowrap"
      overflow="hidden"
      textOverflow="ellipsis"
    >
      {apikey}
    </Box>
    <Box>
      <Select 
        value={selectValue}
        onChange={handleSelectChange}
        placeholder="Select option"
      >
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
    
    </Box>
  </Box>

  
<style>
{rightHalfMove}
{leftHalfMove}
{topMoveUp}
{bottomMoveUp}
</style>

    <Box height= "70vh"  width={{base:"100vw", sm:"50vw", lg:"50vw"}}>
        <MainContainer>
          <ChatContainer>       
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
            >
              {messages.map((message, i) => {
                console.log(message)
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />        
          </ChatContainer>
        </MainContainer>
      </Box>
    </Box>
    <Box
        position="absolute"
        right={-52}
        top="0"
        width="200px" // Match the width of the _after pseudo-element
        height="100%"
        p="10px" // Optional padding inside the right-hand side area
      >
        <Image 
          src="path-to-your-image.jpg" 
          alt="Descriptive Alt Text"
          mb="10px" // Margin-bottom for spacing between image and text
        />
        <Text fontSize="sm">
         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem beatae esse officiis quam impedit labore optio tenetur facilis sed. Labore perspiciatis provident repellat harum enim, exercitationem reprehenderit! Qui, quidem explicabo.
        </Text></Box>
    </Flex>
  )
}
