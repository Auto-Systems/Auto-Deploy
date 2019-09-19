// UI/UI/Components/Style/Buttons/BaseButton/index.tsx
import React, { FunctionComponent, CSSProperties } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';

export interface BaseButtonProps extends ButtonProps {
  label: string;
  mainColor?: 'red' | 'green';
  submit?: boolean;
}

export type BaseButtonType = FunctionComponent<BaseButtonProps>;

export const BaseButton: BaseButtonType = ({ label, children, mainColor, submit = false, ...props }) => {
  const style: CSSProperties = { color: mainColor, marginTop: '1em' };

  return (
    <Button {...props} type={submit ? 'submit' : undefined} style={{ ...props.style, ...style }}>
      {children}
      {label}
    </Button>
  );
};
