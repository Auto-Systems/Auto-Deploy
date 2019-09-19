// UI/UI/Components/Style/Lists/ListItem/LinkListItem/index.tsx
import React, { FunctionComponent } from 'react';
import { LabelListItem, LabelListItemProps } from 'UI/Components/Style/Lists/ListItem/LabelListItem';
import { Link } from 'react-router-dom';

export interface LinkListItemProps extends LabelListItemProps {
  to: string;
}

type LinkListItemType = FunctionComponent<LinkListItemProps>;

export const LinkListItem: LinkListItemType = props => {
  return <LabelListItem component={Link} {...props} />;
};
