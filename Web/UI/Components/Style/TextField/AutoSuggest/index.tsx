// Web/UI/Components/Style/TextField/AutoSuggest/index.tsx
import React, {
  ChangeEvent,
  useState,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { BaseTextField } from '../BaseTextField';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    suggestPaper: {
      zIndex: theme.zIndex.modal + 5,
      position: 'fixed',
      width: (props) => (props ? `${props.width}px` : '100%'),
      maxHeight: '15rem',
      overflowY: 'auto',
      marginTop: theme.spacing(1),
    },
  }),
);

interface Option {
  label: string;
  value: string;
}

interface AutoSuggestProps {
  initialOptions: Option[];
  label: string;
  onOption: (option: string) => any;
}

export function AutoSuggest({
  initialOptions,
  onOption,
  label,
}: AutoSuggestProps): React.ReactElement {
  const [hideSuggest, setHideSuggest] = useState<boolean>(true);
  const [filter, setFilter] = useState('');

  const input = useRef<HTMLInputElement>(null);

  const classes = useStyles({
    width: input.current ? input.current.clientWidth : '100%',
  });

  const options = useMemo(
    () =>
      initialOptions.filter(({ label }) =>
        label.toLowerCase().includes(filter.toLowerCase()),
      ),
    [filter, initialOptions],
  );

  const handleChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => setFilter(target.value),
    [options],
  );

  const onFocus = useCallback(() => setHideSuggest(false), [hideSuggest]);
  const onBlur = useCallback(
    () => setTimeout(() => setHideSuggest(true), 200),
    [hideSuggest],
  );

  const selectOption = useCallback(
    (selectedOption: Option) => () => {
      setHideSuggest(true);
      setFilter(selectedOption.label);
      onOption(selectedOption.value);
    },
    [initialOptions],
  );

  return (
    <>
      <BaseTextField
        onBlur={onBlur}
        onFocus={onFocus}
        fullWidth
        inputRef={input}
        value={filter}
        onChange={handleChange}
        label={label}
        variant='outlined'
      />
      {options && !hideSuggest && filter && (
        <Paper square className={classes.suggestPaper}>
          {options.map((option) => (
            <MenuItem key={option.value} onClick={selectOption(option)}>
              {option.label}
            </MenuItem>
          ))}
        </Paper>
      )}
    </>
  );
}
