import React from 'react';

import './App.css';
import CurrencyConverterHeader from './jsx/CurrencyConverterHeader';
import CurrencyConverterBody from './jsx/CurrencyConverterBody';
import CurrencyConverterFooter from './jsx/CurrencyConverterFooter';

function App() {
  return (
    <div className="App">
      <CurrencyConverterHeader/>
      <CurrencyConverterBody/>
      <CurrencyConverterFooter/>
    </div>
  );
}

export default App;
