// UI/UI/Components/Layout/Styles.tsx
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const drawerWidth = '240px';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      width: '100%'
    },
    toolbar: theme.mixins.toolbar
  })
);
