// UI/UI/Components/Style/Cards/Styles.tsx
import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import { BaseCardProps } from './index';

export const useCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: (props: BaseCardProps) => (props.fullWidth ? '100%' : 275),
      height: 200
    }
  })
);
