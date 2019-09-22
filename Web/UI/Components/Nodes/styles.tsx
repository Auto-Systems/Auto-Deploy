// UI/UI/Components/Admin/Home/styles.tsx
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topSection: {
      color: 'white',
      width: '100%',
      minHeight: '195px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    userTable: {
      width: '100%'
    },
    logs: {
      color: 'white',
      whiteSpace: 'pre-wrap',
      backgroundColor: '#151515',
      boxSizing: 'border-box',
      margin: '0 auto',
      padding: '20px',
      borderBottomLeftRadius: '5px',
      borderBottomRightRadius: '5px',
    },
    log: {
      backgroundColor: '#151515',
      '&:hover': {
        background: 'grey'
      }
    },
    logResult: {

    }
  })
);
