import React, { useState } from 'react';
import { Input } from './components/common/Input';
import { Button } from './components/common/Button';
import styled from 'styled-components';
import Layout from './components/layout/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Board from './pages/Board';

const Wrapper = styled.div`
    max-width: 900px;
    margin: 0 auto;
    padding: 10px;

    ${({ theme }) => theme.media.desktop`
      border: 2px solid blue;
    `}
    ${({ theme }) => theme.media.tablet`
      border: 2px solid yellow;
    `}
        ${({ theme }) => theme.media.mobile`
      border: 2px solid purple;
    `};
`;

function App() {
    /* const [value, setValue] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const onClick = (): void => {
    alert(`${value} 입력값을 입력받았습니다.`);
  }; */

    return (
        <div className="App">
            <Wrapper>
                <Layout>
                    <h1>input and button</h1>
                    {/*     <Input type="text" value={value} onChange={onChange} />
                    <Button onClick={onClick} text="click alert" /> */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/boards" element={<Board />} />
                    </Routes>
                </Layout>
            </Wrapper>
        </div>
    );
}

export default App;
