import React from 'react';

interface Iinput {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

export function Input({ type, value, onChange }: Iinput) {
  return (
    <>
      <input type={type} value={value} onChange={onChange} />
    </>
  );
}
