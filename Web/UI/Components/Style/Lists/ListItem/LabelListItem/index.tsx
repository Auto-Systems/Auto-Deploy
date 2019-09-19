// UI/UI/Components/Style/Lists/ListItem/LabelListItem/index.tsx
import React, { FunctionComponent } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import { BaseListItem, BaseListItemProps } from 'UI/Components/Style/Lists/ListItem/BaseListItem';

export interface LabelListItemProps extends BaseListItemProps {
  label: string;
  preLabel?: React.ReactNode;
}

type LabelListItemType = FunctionComponent<LabelListItemProps>;

export const LabelListItem: LabelListItemType = ({ label, children, preLabel, ...props }) => {
  return (
    <BaseListItem {...props}>
      {preLabel}
      <ListItemText primary={label} />
      {children}
    </BaseListItem>
  );
};
