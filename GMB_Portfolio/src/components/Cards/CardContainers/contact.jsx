import React, { useState, useEffect, useRef } from "react";
import {Box, 
  Text, 
  Input, 
  FormControl, 
  FormLabel,
  Button, 
  Center, 
  VStack, 
  Heading, 
  Textarea, 
  useToast, 
  useColorModeValue,
  HStack
 } from "@chakra-ui/react";


export const ContactContainer = () => {
    
    // recipient email
const recipientEmail = "guymorganb@gmail.com";
    
    const toast = useToast();
    const bg = useColorModeValue("#f5f5f5", "#2d3748")
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    
    const contactBoxRef = useRef();
  
    const handleMouseMove = e => {
      const rect = contactBoxRef.current.getBoundingClientRect();
      const xVal = e.clientX - rect.left;
      const yVal = e.clientY - rect.top;
      const yRotation = 130 * ((xVal - rect.width / 2) / rect.width);  // Changed rotation degree from 20 to 30
      const xRotation = -130 * ((yVal - rect.height / 2) / rect.height); // Changed rotation degree from 20 to 30

      setRotateX(xRotation);
      setRotateY(yRotation);
    };

    const handleMouseLeave = e => {
      setRotateX(0);
      setRotateY(0);
    };

    useEffect(() => {
      if (!contactBoxRef.current) return;
  
      contactBoxRef.current.addEventListener('mousemove', handleMouseMove);
      contactBoxRef.current.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        if (contactBoxRef.current) {
          contactBoxRef.current.removeEventListener('mousemove', handleMouseMove);
          contactBoxRef.current.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    }, []);

    const stopMotion = () => {
      if (!contactBoxRef.current) return;
    
      // Reset the form state to its standard state
      setRotateX(0);
      setRotateY(0);
    
      // Assuming handleMouseMove and handleMouseLeave are defined at the component level
      contactBoxRef.current.removeEventListener('mousemove', handleMouseMove);
      contactBoxRef.current.removeEventListener('mouseleave', handleMouseLeave);
    };

    const startMotion = () => {
      if (!contactBoxRef.current) return;
    
      // Reset the form state to its standard state
      contactBoxRef.current.addEventListener('mousemove', handleMouseMove);
      contactBoxRef.current.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        if (contactBoxRef.current) {
          contactBoxRef.current.removeEventListener('mousemove', handleMouseMove);
          contactBoxRef.current.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    };

    // handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const sanitizedMessage = encodeURIComponent(message.trim()); // Basic sanitization. Explicitly encode URI to make it safe for mailto:
        const mailToLink = `mailto:${recipientEmail}?subject=Message from ${name}&body=${sanitizedMessage}`;
        window.open(mailToLink);

        toast({
            title: "Contact Sequence.",
            description: "Message will open in your Browsers default email provider..",
            status: "success",
            duration: 5000,
            isClosable: true,
        });

        // clear form
        setName('');
        setEmail('');
        setMessage('');
    };
  
    return (
      <Center display="flex" flexDirection="column" h='auto'>
        <Box
          w={["100%", "100%", "100%", "100%"]}
          p={4}
          m={4}
          borderRadius="md"
          borderWidth={1}
          boxShadow="2xl"
          bg={bg}
        >
          <Heading as="h2" size="lg">My Business Info</Heading>
          <Text mt={2}><strong>Name:</strong> Dummy Business Name</Text>
          <Text><strong>Email:</strong> dummy-email@gmail.com</Text>
          <Text><strong>Mailing Address:</strong> 123 Dummy Street, City, State, ZIP</Text>
        </Box>
        <Box
           ref={contactBoxRef}
           w={["100%", "100%", "100%", "100%"]}   //<-- Increase size
           p={6}
           borderRadius="2xl"       //<-- more border Radius
           borderWidth={4}          //<-- Increase borderWidth
           boxShadow="0px 10px 20px rgba(0,0,0,0.2), 0px 20px 40px rgba(0,0,0,0.3)"  //<-- change boxShadow
           mt="4%"                 //<-- Move form up
           transform={`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateY}deg)`}
           //<-- Add 3D rotation on the Box
           transition="transform 1s"
           bg={bg}
        >
        <Heading>Get in Touch</Heading>
          <VStack spacing={3} mt={4} as="form" onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input 
                        type="text" 
                        placeholder="Enter your name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
            </FormControl>
            <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input 
                        type="email" 
                        placeholder="Enter your email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
            </FormControl>
            <FormControl isRequired>
                    <FormLabel>Message</FormLabel>
                    <Textarea 
                        placeholder="Enter your message" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                    />
            </FormControl>
            <Button type="submit" colorScheme="teal" variant="outline">
                    Send Message
                </Button>
                <HStack>
                <Button type="submit" p={1} colorScheme="teal" variant="outline" onClick={stopMotion}>
                    Stop Motion
                </Button>
                <Button type="submit" p={1} colorScheme="teal" variant="outline" onClick={startMotion}>
                    Activate Motion
                </Button>
                </HStack>
          </VStack>
        </Box>
      </Center>
    );
  };


