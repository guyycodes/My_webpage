import React from 'react';
import { useColorMode, Box } from '@chakra-ui/react';
import { Global, css } from '@emotion/react';

export const TestCustomThemeSwitchButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const isChecked = colorMode === 'dark';
  // Styles for the toggle switch
  const switchStyles = css`
    position: relative;
    width: 3em;
    height: 1.5em;
    border-radius: 0.75em;
    background: ${isDark ? 
      'linear-gradient(to right, hsl(223,90%,60%), hsl(223,90%,60%))' : 
      'linear-gradient(to right, hsl(213,90%,60%), hsl(193,70%,60%))'};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: ${isDark ? 'flex-end' : 'flex-start'};
    padding: 2px;
    box-shadow: inset 0 0 5px rgba(0,0,0,0.3);
    -webkit-tap-highlightColor: transparent;
  `;

  // Styles for the handle of the switch
  const handleStyles = css`
    height: 1.25em;
    width: 1.25em;
    backgroundColor: white;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    transform: ${isDark ? 'translateX(0.125em)' : 'translateX(-0.125em)'};
    transition: transform 0.25s ease;
  `;

  // Additional global styles
  const globalStyles = css`
    body {
      transition: backgroundColor 0.4s ease-out,Color 0.4s ease-out;
      backgroundColor: ${isDark ? 'hsl(223,90%,10%)' : 'hsl(223,90%,90%)'};
     Color: ${isDark ? 'hsl(223,90%,90%)' : 'hsl(223,90%,10%)'};
    }
  `;

  return (
    <>
      <Global styles={globalStyles} />
      <Box as='main' display='flex' justifyContent='center' alignItems='center' height='100vh'>
        {/* The actual switch container */}
        <Box as='label' css={switchStyles}>
          {/* The hidden checkbox, controlling the switch */}
          <Box as='input'
               type='checkbox'
               position='absolute'
               opacity='0'
               width='100%'
               height='100%'
               cursor='pointer'
               onChange={toggleColorMode}
               checked={isDark} />
          {/* The handle that moves left and right */}
          <Box css={handleStyles} />
          <svg className="switch__scene" viewBox="0 0 48 24" width="48px" height="24px" aria-hidden="true"style={{ 
              position: 'absolute', 
              transform: isChecked ? 'translateX(1.5em)' : 'translateX(0)',  // shifts the scene based on checked state
              transition: 'transform 0.4s cubic-bezier(0.83, 0, 0.17, 1)'
            }}>
      <symbol id="switch-cloud" viewBox="0 0 10 6">
        <path d="m7.5,1c-.238,0-.463.049-.675.125-.55-.681-1.381-1.125-2.325-1.125-1.13,0-2.103.633-2.614,1.556-.124-.033-.251-.056-.386-.056-.828,0-1.5.672-1.5,1.5s.672,1.5,1.5,1.5c.134,0,.262-.023.386-.056.511.924,1.484,1.556,2.614,1.556.943,0,1.775-.444,2.325-1.125.212.076.437.125.675.125,1.105,0,2-.895,2-2s-.895-2-2-2Z"/>
      </symbol>
      <symbol id="switch-star" viewBox="0 0 4 4">
        <path d="m2.277.172l.379.767c.045.091.132.154.233.169l.847.123c.253.037.355.348.171.527l-.613.597c-.073.071-.106.173-.089.273l.145.843c.043.252-.222.445-.448.326l-.757-.398c-.09-.047-.197-.047-.287,0l-.757.398c-.227.119-.491-.073-.448-.326l.145-.843c.017-.1-.016-.202-.089-.273L.094,1.758c-.183-.179-.082-.49.171-.527l.847-.123c.101-.015.188-.078.233-.169l.379-.767c.113-.23.441-.23.554,0Z"/>
      </symbol>
      <defs>
        <linearGradient id="switch-sun1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="hsl(18,90%,50%)" />
          <stop offset="1" stopColor="hsl(43,90%,50%)" />
        </linearGradient>
        <linearGradient id="switch-sun2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="hsl(43,90%,50%)" />
          <stop offset="1" stopColor="hsl(33,90%,50%)" />
        </linearGradient>
        <linearGradient id="switch-moon1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="hsl(213,90%,95%)" />
          <stop offset="1" stopColor="hsl(213,90%,85%)" />
        </linearGradient>
        <linearGradient id="switch-moon2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="hsla(213,90%,95%,0)" />
          <stop offset="1" stopColor="hsla(213,90%,95%,1)" />
        </linearGradient>
        <linearGradient id="switch-moon3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="hsla(213,90%,75%,1)" />
          <stop offset="1" stopColor="hsla(213,90%,75%,0)" />
        </linearGradient>
        <linearGradient id="switch-cloud1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="hsla(0,0%,100%,1)" />
          <stop offset="1" stopColor="hsla(0,0%,100%,0)" />
        </linearGradient>
      </defs>
      <g className="switch__stars" fill="hsl(213,90%,95%)">
        <g className="switch__star" transform="translate(28,14) scale(0)">
          <use href="#switch-star" width="4px" height="4px" />
        </g>
        <g className="switch__star" transform="translate(21,13) scale(0)">
          <use href="#switch-star" width="4px" height="4px" />
        </g>
        <g className="switch__star" transform="translate(17,10) scale(0)">
          <use href="#switch-star" width="4px" height="4px" />
        </g>
        <g className="switch__star" transform="translate(24,6) scale(0)">
          <use href="#switch-star" width="4px" height="4px" />
        </g>
        <g className="switch__star" transform="translate(31,5) scale(0)">
          <use href="#switch-star" width="4px" height="4px" />
        </g>
      </g>
      <g className="switch__handle" transform="translate(12,12)">
        <g className="switch__handle-side">
          <circle r="8" fill="url(#switch-sun1)" />
          <circle r="6.5" fill="url(#switch-sun2)" />
        </g>
        <g className="switch__handle-side" opacity="0">
          <circle r="8" fill="url(#switch-moon1)" />
          <circle r="6.5" fill="url(#switch-moon2)" />
          <clipPath id="switch-moon-clip">
            <circle className="switch__moon-hole" r="1.5" cx="-6" cy="2" />
            <circle className="switch__moon-hole" r="1.5" cx="-1" cy="3" />
            <circle className="switch__moon-hole" r="2" cx="-1" cy="8" />
            <circle className="switch__moon-hole" r="1" cx="2" cy="0" />
            <circle className="switch__moon-hole" r="5" cx="8" cy="6" />
          </clipPath>
          <circle r="8" fill="url(#switch-moon3)" clip-path="url(#switch-moon-clip)" />
        </g>
      </g>
      <g fill="url(#switch-cloud1)">
        <use className="switch__cloud" href="#switch-cloud" width="10" height="6" transform="translate(34,9)" />
        <use className="switch__cloud" href="#switch-cloud" width="10" height="6" transform="translate(24,13) scale(0.8)" />
        <use className="switch__cloud" href="#switch-cloud" width="10" height="6" transform="translate(24,5) scale(0.6)" />
      </g>
      </svg>
        </Box>
      </Box>
    </>
  );
};
