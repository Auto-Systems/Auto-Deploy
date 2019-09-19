// UI/UI/Components/Style/Form/index.tsx
import React, { PropsWithChildren, CSSProperties } from 'react';
import clsx from 'clsx';
import { useStyles } from 'UI/Components/Style/Form/Styles';
import useForm from 'react-hook-form';

import { TextField, FormHelperText, Typography, Paper } from '@material-ui/core';
import { BaseButton } from 'UI/Components/Style/Buttons/BaseButton';
import { FormProps } from './type';

const FieldStyle: CSSProperties = {};

export function Form<T>({
  title,
  children,
  onSubmit,
  noSubmit = false,
  Fields,
  invalid = undefined,
  submitLabel = title
}: PropsWithChildren<FormProps<T>>): React.ReactElement {
  const { register, handleSubmit } = useForm<T>();
  const classes = useStyles();

  const isInvalid = (fieldName: string): boolean => (invalid ? invalid.invalidField === fieldName : false);

  return (
    <section className={clsx(classes.section)}>
      <Paper component='form' onSubmit={handleSubmit(onSubmit)} className={clsx(classes.form)}>
        <Typography variant='h4' align='center'>
          {title}
        </Typography>

        {invalid && (
          <FormHelperText error style={{ color: '#b00020' }}>
            {invalid.errorMessage}
          </FormHelperText>
        )}

        {Fields.map(({ registerOpts, inputType, type, ...props }) => (
          <TextField
            key={props.name}
            type={inputType}
            variant='outlined'
            className={clsx(classes.fieldStyle)}
            error={isInvalid(props.name)}
            inputRef={registerOpts ? register(registerOpts) : register}
            {...props}
          />
        ))}
        {children}
        {!noSubmit && <BaseButton color='primary' fullWidth variant='contained' submit label={submitLabel} />}
      </Paper>
    </section>
  );
}
