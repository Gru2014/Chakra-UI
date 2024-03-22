import React from 'react';
import MainTab from './components/MainTab';
import { ChakraProvider } from '@chakra-ui/react'
function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <header className="App-header">
          <MainTab />
        </header>

      </ChakraProvider>
    </div>
  );
}

export default App;
