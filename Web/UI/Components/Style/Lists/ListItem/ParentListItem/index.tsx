// UI/UI/Components/Style/Lists/ListItem/ParentListItem/index.tsx
import React, { FunctionComponent, useState } from 'react';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { useTheme } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import { LabelListItem, LabelListItemProps } from 'UI/Components/Style/Lists/ListItem/LabelListItem';
import { BaseList } from 'UI/Components/Style/Lists/BaseList';

interface ParentListItemProps extends LabelListItemProps {
  label: string;
  startOpen?: boolean;
}

export type ParentListItemType = FunctionComponent<ParentListItemProps>;

export const ParentListItem: ParentListItemType = ({ label, children, startOpen = false, ...props }) => {
  const theme = useTheme<Theme>();
  const [open, setOpen] = useState<boolean>(startOpen);

  const toggleOpen = (): void => setOpen(!open);

  return (
    <>
      <LabelListItem label={label} onClick={toggleOpen} {...props}>
        {open ? <ExpandLess /> : <ExpandMore />}
      </LabelListItem>
      <Collapse style={{ paddingLeft: '32px' }} in={open} timeout='auto' unmountOnExit>
        <BaseList style={{ paddingLeft: '32px' }}>{children}</BaseList>
      </Collapse>
    </>
  );
};
