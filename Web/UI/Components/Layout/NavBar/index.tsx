// UI/UI/Components/Layout/NavBar/index.tsx
import Portalize from 'react-portalize';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useEffect, useState, useMemo } from 'react';
import useReactRouter from 'use-react-router';
import { useStyles } from '../Styles';
import { RouteList } from 'UI/Components/Router/generateList';
import { AppRoutes } from 'UI/Components/Router/AppRoutes';

export default function NavDrawer(): React.ReactElement {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const classes = useStyles();
  const { location } = useReactRouter();

  const toggleNav = (): void => setNavOpen(!navOpen);

  useEffect(() => setNavOpen(false), [location]);

  return useMemo(
    () => (
      <>
        <Portalize server={true} container='#navActions'>
          <IconButton className={classes.menuButton} onClick={() => setNavOpen(!navOpen)}>
            <MenuIcon />
          </IconButton>
        </Portalize>
        <SwipeableDrawer
          open={navOpen}
          onOpen={toggleNav}
          className={classes.drawer}
          onClose={() => setNavOpen(!navOpen)}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <RouteList routes={AppRoutes} />
        </SwipeableDrawer>
      </>
    ),
    [navOpen]
  );
}
