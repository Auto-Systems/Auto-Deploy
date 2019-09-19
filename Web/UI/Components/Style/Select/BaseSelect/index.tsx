// UI/ui/Components/Styles/Select/BaseSelect/index.tsx
import React, { FunctionComponent, useRef, useState, useEffect, ChangeEvent } from 'react';
import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import Select, { SelectProps } from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

export type SelectChange = ChangeEvent<{ name?: string; value: unknown }>;

export interface SelectItem {
  /**
   * Friendly label displayed to user
   */
  label: string;
  /**
   * Value given to state.
   */
  value?: string;
}

export interface BaseSelectProps extends SelectProps {
  label: string;
  items: SelectItem[];
  /**
   * Props to spread to the form control
   */
  controlProps?: FormControlProps;
}

type BaseSelectType = FunctionComponent<BaseSelectProps>;

export const BaseSelect: BaseSelectType = ({ label, items, controlProps, ...props }) => {
  const inputLabel = useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    if (inputLabel && inputLabel.current) setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl variant='outlined' fullWidth={props.fullWidth} style={{ marginTop: '1em' }} {...controlProps}>
      <InputLabel ref={inputLabel} htmlFor='outlined-age-simple'>
        {label}
      </InputLabel>
      <Select input={<OutlinedInput labelWidth={labelWidth} name='age' id='outlined-age-simple' />} {...props}>
        {items.map(({ label, value = label }, i) => (
          <MenuItem key={i} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
