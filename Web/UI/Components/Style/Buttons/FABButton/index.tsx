// UI/ui/Components/Forms/Button/FABButton/index.tsx
import React, { FunctionComponent, CSSProperties } from 'react';
import { PositionProperty, AlignSelfProperty } from 'csstype';
import Fab, { FabProps } from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export enum FABLocationENUM {
  'flex-end' = 'flex-end',
  'flex-start' = 'flex-start',
  'bottom-right' = 'bottom-right',
  'bottom-left' = 'bottom-left'
}

export type FABLocation = 'flex-end' | 'flex-start' | 'bottom-right' | 'bottom-left' | FABLocationENUM;

interface FABButtonProps extends FabProps {
  /**
   * CSS position
   */
  position?: PositionProperty;

  /**
   * Align FAB
   * @default 'flex-end'
   */
  location?: FABLocation;
  
  /**
   * Override Icon
   */
  icon?: React.ReactElement
}

type FABButtonType = FunctionComponent<FABButtonProps>;

/**
 * FABButton
 * @param {'absolute' | 'fixed' | 'relative'} props.position CSS Position of FAB
 * @param {boolean} props.end Defaults to true, Aligns the FAB to flex-end
 */
export const FABButton: FABButtonType = ({ position = 'relative', location = 'flex-end', ...props }) => {
  const locationCSS: { [k in FABLocation]: CSSProperties } = {
    'flex-end': { alignSelf: 'flex-end' },
    'flex-start': { alignSelf: 'flex-start' },
    'bottom-right': { right: '1em', bottom: '1em' },
    'bottom-left': { left: '1em', bottom: '1em' }
  };
  const style: CSSProperties = { ...props.style, position, ...locationCSS[location], marginTop: '1em' };

  const Icon = props.icon ? props.icon : <AddIcon />;

  return (
    <div style={style}>
      <Fab {...props} aria-label='Add'>
        {Icon}
      </Fab>
    </div>
  );
};
