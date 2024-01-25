// Credits: coopercodes and andiicodes
import { useState, useRef, useEffect } from 'react'
import { Box, Select, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, Button, HStack } from '@chakra-ui/react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

export const ChatBot = () => {
  const [specificOption, setSpecificOption] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAI, setSelectedAI] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [image, setImage] = useState(null);
  const[currModel, setCurrModel] = useState("");
  const fileInputRef = useRef(null);
////////////////////////////////////////////////////
  const API_KEY = `${apiKey}`;
// "Explain things like you would to a 10 year old learning how to code."
  const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
    "role": "system", "content": "Explain things like you're talking to a software professional with 5 years of experience, and do not be rude."
  }

  const googleSystemMessage = {
    history: [
        {"role": "user", "parts": [{"text": "Explain things like you're talking to a software professional with 5 years of experience. And do not maintain a memory context of more than 3 messages from me."}]},
        {"role": "model", "parts": [{"text": "Great to meet you. What would you like to know?"}]},
    ],
    generationConfig: {
      "maxOutputTokens": 50000,
    },
  };
  const [messageState, setMessageState] = useState(googleSystemMessage);
  
////////////////////////////////////////////////////
  const handleSelectChange = (e) =>{ setSelectedAI(e.target.value)};
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleModelChange = (e) => {setCurrModel(e.target.value)}
////////////////////////////////////////////////////
  const handleApiKeyChange = (e) => {setApiKey(e.target.value)};
  const setImageUpload = (file) => {setImage(file)}
  const handleSubmitApiKey = () => {
    // Handle the submission of the API key here
    closeModal();
  };
////////////////Chat-GTP////////////////////////////
  const [messages, setMessages] = useState([
    {
      message: "Welcome to the Chat-GPT / Googe Gemini prompt Dashboard! Input your Api key and choose from many AI chat options below",
      sentTime: "just now",
      sender: `${currModel}`,
    }
  ]);
  ////handles directing which AI provider is getting directed towards
  const handleSend = async (message) => {
    
    if(selectedAI == "Chat-GPT"){
      const newMessage = {
        message,
        direction: 'outgoing',
        sender: "user"
      };
      if(!API_KEY){
        //return;
      }
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
    }/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    else if(selectedAI == "Google-Gemini"){
      // const newMessage = {"role": "user", "parts": [{"text": message}]};
      if(!API_KEY){
        //return;
      }
      const newMessage = {
        message,
        direction: 'outgoing',
        sender: "user"
      };
      const newMessages = [...messages, newMessage];
      setMessages(newMessages);

      setIsTyping(true);
      console.log("your message" + message)
     await  processMessageToGoogle(message);  // make sure to pass all the messages
  };
}

  async function processMessageToGoogle (chatMessage) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    console.log("model"+ currModel)
    const model = genAI.getGenerativeModel({ model: `${currModel}`});
    
    const chat = model.startChat(googleSystemMessage);
    
    try{
      // Send your message to the ongoing chat
     const result = await chat.sendMessage(chatMessage);
      // Get the response from the result
      const response = result.response;
      const text = response.candidates[0].content.parts[0].text;
      console.log(text)
      
      // const updatedHistory = [...messageState.history, {"role": "user", "parts": [{"text": chatMessage}]}];
      // setMessageState({ ...messageState, history: updatedHistory });
      setIsTyping(false);
      // Update state with the new response if necessary:
      // setGoogleMessages(text); 
      // append to googleMessages state by using setGoogleMessages(...)
      setMessages([...chatMessage, {message: text,sender: "Google-Gemini"}]);

    }catch(err){
      console.error(err)
    } 
  }
  
  async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act. 
    const apiRequestBody = {
      "model": `${currModel}`,
      "messages": [
        systemMessage,  // The system message DEFINES the logic of our chatGPT
        ...apiMessages // The messages from our chat with ChatGPT
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + `${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setMessages([...chatMessages, {message: 
        data.choices[0].message.content, 
        sender: "ChatGPT"}]);
      setIsTyping(false);
    });
  }


  // expands the right side
  const leftHalfMove = `@keyframes leftHalfMove {   /* begins with the shape the same size appoximately as above keyframe, then shinks in from the left using calc() back to original size */
    0% {
      width: 0%;  /* beginns with an equivalent expanded width where the other left off */
    }
    100% {
      width: 30%;                   /* Original Width */
      //left: calc(100% - 4.5em);     /* ends at left calc(...) */
   
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
    <Box
    sx={{
      position: 'absolute',
      padding: ['0 0 0 10px', '0 0 0 0', '0 1em 0 1em'], // Space around the content
      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white
      backdropFilter: 'blur(10px)', // Creates the frosted glass effect
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
      border: '2px solid rgba(255, 255, 255, 0.2)', // Subtle border
      width: ['auto', null, 'auto'], // 175px for smaller screens, 225px for larger
      height: ['auto', null, 'auto'],
      _before: {
        content: 'url("https://media.tenor.com/2YQj1-QHrtMAAAAi/vutura-chatbot.gif")',
        objectFit:'cover',
        overflow:'hidden',
        
        position: 'absolute',
        right: ['10px', '-15%' ,'85%', '90.5%'],
        top: '-5em',
        width: '235px', // Width of the bubble
        height: '150px', // Height of the bubble
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '10%', // Circular shape
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.9)',
        filter:"drop-shadow(16px -16px 20px rgba(41, 138, 147, 0.8)) ",
        transition: "right 0.5s ease-in-out",
        clipPath:'polygon(0% 0%, 80% 0, 80% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)', 
        animation: ['bottomMoveDown 2s forwards', 'bottomMoveDown 2s forwards', null, 'leftHalfMove 2s forwards'],
        
      },
    }}
  >

  <Box 
    margin="10px"  
    textAlign="center" 
    justifyContent="right"
    pt="5px" 
    display="flex" 
    > 
        <Button
          onClick={openModal}
          marginLeft="10px"
        >
          Enter Api-key to chat
        </Button>
  </Box>
<style>
{bottomMoveDown}
{leftHalfMove}
</style>
      <Box height= "70vh"  width={{base:"100vw", sm:"50vw", lg:"50vw"}}>
        <MainContainer >
          <ChatContainer >       
            <MessageList
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content={`${currModel} is typing`} /> : null}
            >
            {messages.map((message, i) => {
                // console.log(message)
                return <Message key={i} model={message} />
              })}

            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />        
          </ChatContainer>
        </MainContainer>
      </Box>
      <HStack>
      <Select 
        margin="5px 5px 5px" 
        width="19vw" 
        onChange={handleSelectChange}
        backgroundColor="whitesmoke"
        >
          <option value="option1">Select your AI provider</option>
          <option value="Chat-GPT">Chat-GPT</option>
          <option value="Google-Gemini">Google-Gemini</option>
      </Select>
      {selectedAI === 'Chat-GPT' && (
        <Select
          placeholder="Select specific Chat-GPT"
          margin="5px"
          width="19vw"
          onChange={handleModelChange}
          backgroundColor="whitesmoke"
        >
          <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
          <option value="gpt-3.5-turbo-1106">gpt-3.5-turbo-1106</option>
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-4-1106-preview">gpt-4-1106-preview</option>
        </Select>
      )}
          {selectedAI === 'Google-Gemini' && (
        <Select
          placeholder="Select specific Google-Gemini"
          margin="5px"
          width="19vw"
          onChange={handleModelChange}
          backgroundColor="whitesmoke"
        >
          <option value="gemini-pro">Gemini Pro</option>
        </Select>
      )}
      </HStack>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter your API Key</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input 
              placeholder="Enter API key here" 
              value={apiKey} 
              onChange={handleApiKeyChange} 
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmitApiKey}>
              Submit
            </Button>
            <Button variant="ghost" onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
   </Box>
  
  )
}

