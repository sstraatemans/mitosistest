import { createTheme } from '@vanilla-extract/css';

const [themeClass, themeVars] = createTheme({
  color: {
    brand: 'blue',
    white: '#fff'
  }
});

export { themeClass, themeVars };
