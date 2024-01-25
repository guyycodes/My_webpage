import React, { useState, useEffect, useRef } from 'react';
//VideoButton.module.css. This change signifies that the styles in this file are a module and should be treated as such by the build tool
import { Box } from '@chakra-ui/react';

export const Morph = ({ isChecked }) => {
    
    if (!isChecked){
        return null;
    }

    // The strings to morph between. You can change these to anything you want!
    const texts = ["Welcome ✨","A Software Professional 💼", "If it has code 👨‍💻 I can implement it", "Computer Science Undergrad 🎓", "Driven by growth 🌱", 
    "Innovation ∫∫", "Family values 👪", "& Leadership 🤝", "3 years experience in: 📈", 
    "JavaScript 📌", "React 📌", "Java 📌", "C 📌", "Writing SQL & No-Sql Databases 📌", "AWS-Cloud ☁️ & Certified 📌",  
    "Thriving in", "Fast-paced environments 💫", "Passionate for full-stack development ✨",
    "Drives me to ☕", "Innovative & problem-solve with 🔍", "Value & U/X dominating my focus 💎"]
   
    // Controls the speed of morphing.
    const morphTime = 1.350;
    const cooldownTime = 0.25;
    const text1Ref = useRef(null);
    const text2Ref = useRef(null);

    useEffect(() => {
        
    let animationFrameId;
    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;
    const elts = {
        text1: text1Ref.current,
        text2: text2Ref.current,

    }; //css-14oripf
    if (!elts.text1 || !elts.text2) {
        // If the refs are not attached, stop the animation
        return;
    }else
        //console.log(elts.text1, elts.text2)
    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];

    // applies the blur filter to the text.
    const setMorph = (fraction) => {
        // fraction = Math.cos(fraction * Math.PI) / -2 + .5;
        
        elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
        
        fraction = 1 - fraction;
        elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
        
        elts.text1.textContent = texts[textIndex % texts.length];
        elts.text2.textContent = texts[(textIndex + 1) % texts.length];
    }

    const doMorph = () => {
        morph -= cooldown;
        cooldown = 0;
        
        let fraction = morph / morphTime;
        
        if (fraction > 1) {
            cooldown = cooldownTime;
            fraction = 1;
        }
        
        setMorph(fraction);
    }

    const doCooldown = () => {
        morph = 0;
        
        elts.text2.style.filter = "";
        elts.text2.style.opacity = "100%";
        
        elts.text1.style.filter = "";
        elts.text1.style.opacity = "0%";
    }

    // Animation loop, called every frame.
    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        
        let newTime = new Date();
        let shouldIncrementIndex = cooldown > 0;
        let dt = (newTime - time) / 1000;
        time = newTime;
        
        cooldown -= dt;
        
        if (cooldown <= 0) {
            if (shouldIncrementIndex) {
                textIndex++;
            }
            
            doMorph();
        } else {
            doCooldown();
        }
    }

    animate()
    
        // Cancel the animation frame using the stored ID
        // cancelAnimationFrame(animationFrameId);
}, []);


    return (
<>
    <Box
    position="absolute"
    margin="auto"
    width="100%"
    height="80pt"
    top="0"
    bottom="0"
    right="50%"
    filter="url(#threshold) blur(0.6px)"
    >
        <Box ref={text1Ref} 
        as="span" 
        position="absolute"
        display="inline-block"
        width="100%"
        fontFamily="'Noto Sans', sans-serif"
        fontSize="50pt"
        textAlign="center"
        userSelect="none"       
        />
        <Box ref={text2Ref} 
        as="span" 
        position="absolute"
        display="inline-block"
        width="100%"
        fontFamily="'Noto Sans', sans-serif"
        fontSize="50pt"
        textAlign="center"
        userSelect="none"
        />
    </Box>
    <svg >
        <defs>
        <filter id="threshold">
            <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 255 -120"
            />
        </filter>
        </defs>
    </svg>
</>

    );
    
};