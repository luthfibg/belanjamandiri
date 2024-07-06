import { createTheme } from '@mui/material/styles';
import { blueGrey, yellow } from '@mui/material/colors';

const lightTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      light: blueGrey[200], // light blue-grey
      main: blueGrey[500],  // blue-grey
      dark: blueGrey[700],  // dark blue-grey
      contrastText: '#fff'
    },
    secondary: {
      light: yellow[200],   // light yellow
      main: yellow[600],    // golden yellow
      dark: yellow[800],    // dark golden yellow
      contrastText: '#000'
    },
    background: {
      default: '#fafafa',   // light grey
      paper: '#ffffff',     // white
      paper2: 'rgba(255, 255, 255, 0.4)',
    },
    text: {
      primary: '#000',       // black
      secondary: '#424242',  // dark grey
      disabled: '#9e9e9e',   // grey
      contrastText: '#000'
    }
  },
  typography: {
    allVariants: {
      resize: 'none',
      textDecorationLine: 'none',
    }
  },
  transitions: {
    duration: '0.6s',
  }
});

export default lightTheme;
