import React from 'react';
import CurrencyConverterTable from './CurrencyConverterTable';

class CurrencyConverterBody  extends React.Component {
  
    render(){
        
        return(
            <div className="App-Body">
            <CurrencyConverterTable />
            </div>
        );
        
    }
  }

  export default CurrencyConverterBody;