import React from 'react';
import logo from '../logo.svg';

class CurrencyConverterHeader  extends React.Component {

    render(){
        return(
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Currency Rates and Converter</h1>
            </header>
        );
    }
  }

  export default CurrencyConverterHeader;