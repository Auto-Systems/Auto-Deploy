// UI/UI/Components/Layout/AppBar/index.tsx
import React, { useMemo } from 'react';
import TopAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { SessionActions } from 'UI/Components/Providers/SessionProvider/SessionActions';
import { useConfig } from 'UI/Components/Providers/ConfigProvider';
import { useStyles } from '../Styles';

function AppBar(): React.ReactElement {
  const { appName } = useConfig();
  const classes = useStyles();
  return useMemo(
    () => (
      <>
        <TopAppBar position='fixed' className={classes.appBar}>
          <Toolbar>
            <div id='navActions'>
              <></>
            </div>
            <Typography variant='h6' className={classes.title}>
              {appName}
            </Typography>
            <SessionActions />
          </Toolbar>
        </TopAppBar>
        <div className={classes.toolbar} />
      </>
    ),
    []
  );
}

export default AppBar;
