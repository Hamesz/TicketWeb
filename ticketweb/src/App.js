import { AppWrap } from './App.styles';
import React from 'react';
import Header from "./Components/Header/Header"
import Content from './Components/Content/Content';
import { Button } from './Components/Button.styles';

function App() {
  return (
      <AppWrap>
         <Header />
        <Content />
      </AppWrap>
  );
}

export default App;
