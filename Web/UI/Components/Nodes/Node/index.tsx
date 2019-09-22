// Web/UI/Components/Nodes/Node/index.tsx
import React from 'react';
import { useManagedNodeQuery } from './Node.gen';
import { Section } from 'UI/Components/Layout/Section';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../styles';
import { BaseList } from 'UI/Components/Style/Lists/BaseList';
import { Log } from 'UI/GraphQL/graphqlTypes.gen';
import { ParentListItem } from 'UI/Components/Style/Lists/ListItem/ParentListItem';
import { NodeLifecycle } from './Lifecycle';

interface NodePageProps {
  nodeId: string;
}

function LogListItem(log: Log): React.ReactElement {
  const classes = useStyles({});
  return (
    <ParentListItem label={log.createdAt} key={log.id}>
      <section className={classes.logs}>
        {log.commandResults.map(({ command, result }) => (
          <ParentListItem
            collapseProps={{ style: { background: '#151515' } }}
            label={command}
            key={command}
            className={classes.log}
          >
            <span className={classes.logResult}>{result}</span>
          </ParentListItem>
        ))}
      </section>
    </ParentListItem>
  );
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
      <NodeLifecycle nodeId={nodeId} />
      <div>
        <Typography variant='h4'>Logs</Typography>
        <BaseList fullWidth>
          {data && data.managedNode ? (
            data.managedNode.logs.map((log, i) => <LogListItem {...log} />)
          ) : (
            <div>Loading</div>
          )}
        </BaseList>
      </div>
    </>
  );
}
