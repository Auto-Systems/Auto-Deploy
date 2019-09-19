// UI/UI/Components/Style/Theme.tsx
import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';
import { blue, indigo } from '@material-ui/core/colors';

// Primary #18ffff
// Secondary

export const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: indigo,
    error: {
      main: red.A400
    },
    background: {
      default: '#fff'
    }
  },
  overrides: {
    MuiDrawer: {
      modal: {
        // @ts-ignore
        zIndex: `1200 !important` as number
      }
    }
  }
});
