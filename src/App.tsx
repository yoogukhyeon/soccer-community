import React, { useState } from 'react';
import { Input } from './components/Input';
import { Button } from './components/Button';
import styled from 'styled-components';
import Layout from './components/layout/Layout';

const Container = styled.div`
  max-width: 850px;
  width: 100%;
  height: 1000px;
  margin: 0 auto;

  ${({ theme }) => theme.media.desktop`
      border: 2px solid blue;
  `}
  ${({ theme }) => theme.media.tablet`
      border: 2px solid yellow;
  `}
  ${({ theme }) => theme.media.mobile`
      border: 2px solid purple;
  `}
`;

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
      <Container>
        <Layout>
          <h1>input and button</h1>
          <Input type="text" value={value} onChange={onChange} />
          <Button onClick={onClick} text="click alert" />
        </Layout>
      </Container>
    </div>
  );
}

export default App;
