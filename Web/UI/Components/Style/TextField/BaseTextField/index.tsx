// UI/UI/Components/Style/TextField/BaseTextField/index.tsx
import React, { PropsWithChildren, CSSProperties } from 'react';
import TextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField';

const FieldStyle: CSSProperties = { marginTop: '1em', width: '100%' };

interface BaseTextFieldProps extends OutlinedTextFieldProps {
  outlined?: boolean;
}

export function BaseTextField({ outlined = true, ...props }: PropsWithChildren<BaseTextFieldProps>): React.ReactElement {
  return <TextField style={FieldStyle} variant={outlined ? 'outlined' : props.variant} {...props} />;
}
