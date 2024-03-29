// 1. Import `extendTheme` from Chakra UI
import { extendTheme } from '@chakra-ui/react';

// 2. Extend the theme to include custom colors and global styles
const Theme = extendTheme({
  // Add your color modes config
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  // Global styles that depend on color mode
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.50',
        color: props.colorMode === 'dark' ? 'white' : 'black',
      },
      // You can add more global styles here
    }),
  },
});


export default Theme;