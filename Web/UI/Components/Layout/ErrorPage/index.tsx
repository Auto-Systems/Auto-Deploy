// UI/UI/Components/Layout/ErrorPage/index.tsx
import React, { PropsWithChildren, ReactElement } from 'react';

interface ErrorPageProps {
  errorCode: number;
  errorMessage: string;
}

export function ErrorPage(props: PropsWithChildren<ErrorPageProps>): ReactElement {
  return (
    <>
      <p>Error {props.errorCode}</p>
      <p>{props.errorMessage}</p>
    </>
  );
}
