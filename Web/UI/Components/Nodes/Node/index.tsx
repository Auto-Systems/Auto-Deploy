// Web/UI/Components/Nodes/Node/index.tsx
import React from 'react';
import { useManagedNodeQuery } from './Node.gen';
import { Section } from 'UI/Components/Layout/Section';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../styles';
import { BaseList } from 'UI/Components/Style/Lists/BaseList';
import { LabelListItem } from 'UI/Components/Style/Lists/ListItem/LabelListItem';

interface NodePageProps {
  nodeId: string;
}

export function NodePage({ nodeId }: NodePageProps): React.ReactElement {
  const { data } = useManagedNodeQuery({ variables: { nodeId } });
  const classes = useStyles({});
  return (
    <>
      <Section
        title={{
          title:
            data && data.managedNode
              ? `${data.managedNode.name} Management`
              : undefined,
        }}
        background='secondary'
        className={classes.topSection}
      />
      <div>
        <Typography>Logs</Typography>
        <BaseList fullWidth>
        {data && data.managedNode ? data.managedNode.logs.map(({ command, result }, i) => <LabelListItem key={i} label={command} secondary={result} />) : <div>Loading</div>}
        
        </BaseList>
      </div>
    </>
  );
}
