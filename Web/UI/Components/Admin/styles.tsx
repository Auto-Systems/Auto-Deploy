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
    }
  })
);
