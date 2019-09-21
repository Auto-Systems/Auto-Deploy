// Web/UI/Components/Style/Buttons/Base64Input/index.tsx
import React, { useCallback, useRef, ChangeEvent } from 'react';
import { BaseButton } from 'UI/Components/Style/Buttons/BaseButton';

interface Base64InputProps {
  onChange: (value: string) => any;
  label: string
}

export function Base64Input({
  onChange,
  label
}: Base64InputProps): React.ReactElement {
  const fileInput = useRef<HTMLInputElement>(null);
  const clickInput = useCallback(
    () => setTimeout(() => fileInput.current && fileInput.current.click(), 400),
    [],
  );

  const setFile = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      var f = target.files[0]; // FileList object
      var reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          var binaryData = e.target.result;
          //Converting Binary Data to base 64
          onChange(window.btoa(binaryData));
        };
      })(f);
      // Read in the image file as a data URL.
      reader.readAsBinaryString(f);
    },
    [onChange],
  );

  return (
    <>
      <input
        ref={fileInput}
        type='file'
        onChange={setFile}
        style={{ display: 'none' }}
        required
      />
      <BaseButton
        fullWidth
        color='primary'
        variant='outlined'
        label={label}
        onClick={clickInput}
      />
    </>
  );
}
