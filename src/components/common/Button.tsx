import React, { HtmlHTMLAttributes } from 'react';

interface IButton {
  text: string;
  onClick: () => void;
}

export function Button({ text, onClick }: IButton) {
  return (
    <>
      <button type="button" onClick={onClick}>
        {text}
      </button>
    </>
  );
}
