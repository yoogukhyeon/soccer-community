import React, { useState } from 'react';
import { Input } from './components/Input';
import { Button } from './components/Button';

function App() {
  const [value, setValue] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const onClick = (): void => {
    alert(`${value} 입력값을 입력받았습니다.`);
  };

  return (
    <div className="App">
      <h1>input and button</h1>
      <Input type="text" value={value} onChange={onChange} />
      <Button type="button" onClick={onClick} />
    </div>
  );
}

export default App;
