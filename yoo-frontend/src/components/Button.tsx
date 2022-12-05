import React from 'react';

interface IButton {
  type: string;
  onClick: () => void;
}

export function Button({ type, onClick }: IButton) {
  return (
    <>
      <button type="button" onClick={onClick}>
        alert button
      </button>
    </>
  );
}
