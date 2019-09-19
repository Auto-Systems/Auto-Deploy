// UI/UI/Components/Layout/Section/Styles.tsx
import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import { SectionProps } from './';

export const useSectionStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: (props: SectionProps) =>
        props.title ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
    },
    section: {
      background: (props: SectionProps) => props.background && theme.palette[props.background].main,
      display: 'flex',
      justifyContent: 'center'
    },
    sectionTextDiv: {
      alignSelf: 'center',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    sectionText: {
      marginLeft: '1rem',
      marginRight: '1rem'
    }
  })
);
