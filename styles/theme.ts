import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      light: '#6a7784',
      main: '#3f4b57',
      dark: '#18232e',
      contrastText: '#fff',
    },
    secondary: {
      light: '#d4fbff',
      main: '#a2c8db',
      dark: '#7297a9',
      contrastText: '#000',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;