// UI/UI/Routes/Home/Styles.tsx
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%'
    },
    section: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    topSection: {
      color: 'white',
      width: '100%',
      minHeight: '195px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    sectionAlt: {
      padding: '0 16px',
      [theme.breakpoints.up('md')]: {
        padding: '0 40px'
      },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    mainSect: {
      paddingTop: '96px',
      margin: '0 auto'
    },
    blogSection: {
      width: '100%',
      height: '20vh'
    },
    topText: {
      color: theme.palette.common.white
    },
    demoTitle: {
      alignSelf: 'flex-start'
    },
    gridCard: {
    },
    card: {}
  })
);
