// UI/UI/Components/Style/Lists/ListItem/BaseListItem/index.tsx
import React, { FunctionComponent } from 'react';
import ListItem, { ListItemTypeMap } from '@material-ui/core/ListItem';
import { OverrideProps } from '@material-ui/core/OverridableComponent';

export type BaseListItemProps = OverrideProps<ListItemTypeMap<{ button?: true; component?: React.ReactNode }, 'div'>, 'div'>;

type BaseListItemType = FunctionComponent<BaseListItemProps>;

export const BaseListItem: BaseListItemType = ({ children, ...props }) => {
  return (
    <ListItem button {...props}>
      {children}
    </ListItem>
  );
};
