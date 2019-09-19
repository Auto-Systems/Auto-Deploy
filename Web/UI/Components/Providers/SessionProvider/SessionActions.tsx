// UI/UI/Components/Providers/SessionProvider/SessionActions.tsx
import React, { FunctionComponent, MouseEvent, useState } from 'react';
import { useIsAuthed, useLogout } from 'UI/Components/Providers/SessionProvider';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export const SessionActions: FunctionComponent = () => {
  const { isAuthed } = useIsAuthed();
  const [logoutFN] = useLogout();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = ({ currentTarget }: MouseEvent<HTMLElement>): void => setAnchorEl(currentTarget);

  const handleClose = (): void => setAnchorEl(null);

  const onMenuItem = (option: string): (() => void) => () => {
    if (option === 'Logout') logoutFN();
    handleClose();
  };

  return !isAuthed ? (
    <></>
  ) : (
    <>
      <IconButton
        aria-label='Account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleMenu}
        color='inherit'
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        PaperProps={{
          style: {
            top: '4.05em'
          }
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={onMenuItem('Logout')}>Logout</MenuItem>
      </Menu>
    </>
  );
};
