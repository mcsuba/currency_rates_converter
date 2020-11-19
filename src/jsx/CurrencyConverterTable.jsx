import React from 'react';
import {CurrencyList} from '../conf/CurrencyMaster';
import RatesAPIClient from '../services/RatesAPIClient';             

class CurrencyConverterTable  extends React.Component {

    constructor(props){
        super(props);
        this.ratesAPIClient = new RatesAPIClient();
        this.state = {
            baseCurrencyCode:"-1",
            quoteCurrencyCode:"-1",
            baseCurrencyValue:"1",
            quoteCurrencyValue:"",
            conversionRate:"-1",
            whatChanged:""
        };

        this.handleChangeBaseCurrency = this.handleChangeBaseCurrency.bind(this);
        this.handleChangeQuoteCurrency = this.handleChangeQuoteCurrency.bind(this);

        this.handleInputChangeBaseCurrencyValue = this.handleInputChangeBaseCurrencyValue.bind(this);
        this.handleInputChangeQuoteCurrencyValue = this.handleInputChangeQuoteCurrencyValue.bind(this);
    }

    handleChangeBaseCurrency(event) {
        this.setState({baseCurrencyCode: event.target.value});
        this.setState({whatChanged: 'BaseCurrency'});
        this.setConversionRate(event.target.value,this.state.baseCurrencyCode);

    }

    handleChangeQuoteCurrency(event) {
        this.setState({quoteCurrencyCode: event.target.value});
        this.setState({whatChanged: 'QuoteCurrency'});
        this.setConversionRate(this.state.baseCurrencyCode,event.target.value);
        
    }

    handleInputChangeBaseCurrencyValue(event){
        this.setState({baseCurrencyValue: event.target.value});
        this.setState({whatChanged: 'BaseCurrencyValue'});
        
    }

    handleInputChangeQuoteCurrencyValue(event){
        this.setState({quoteCurrencyValue: event.target.value});
        this.setState({whatChanged: 'QuoteCurrencyValue'});
        
    }


    setConversionRate(baseCurrency, quoteCurrency){
       
        if(baseCurrency !== '-1' && quoteCurrency !== '-1'){
            this.ratesAPIClient.getConversionRate(baseCurrency,quoteCurrency)
            .then(convRate => {this.setState({conversionRate:convRate})}); 
        }
        
        console.log("Conversion rate in state" + this.state.conversionRate);
    
    }

   
    setQuoteAmount(){
        const conversionRate = this.state.conversionRate;
        let quoteCcyValue = "";
        if(conversionRate !== '-1'){
            const givenBaseCurrencyValue = this.state.baseCurrencyValue;

            if(!isNaN(givenBaseCurrencyValue) ){
                quoteCcyValue = parseFloat(givenBaseCurrencyValue) * parseFloat(conversionRate); 
            }
        }else{
            console.log("Conversion rate -1");
        }
        return quoteCcyValue;
    }

    setBaseAmount(){
        const conversionRate = this.state.conversionRate;
        let baseCcyValue ="";
        if(conversionRate !== '-1'){
           
            const givenQuoteCurrencyValue = this.state.quoteCurrencyValue;

            if( !isNaN(givenQuoteCurrencyValue)){
                baseCcyValue = parseFloat(givenQuoteCurrencyValue) * (parseFloat("1")/parseFloat(conversionRate)) ; 
            }
        }else{
            console.log("Conversion rate -1");
        }

        return baseCcyValue;
    }


    render(){

        const whatChanged = this.state.whatChanged;
        
        let baseCurrencyValue = this.state.baseCurrencyValue;
        let quoteCurrencyValue = this.state.quoteCurrencyValue;

        if(whatChanged === 'BaseCurrency' || whatChanged === 'QuoteCurrency' || whatChanged === 'BaseCurrencyValue'){
            quoteCurrencyValue = this.setQuoteAmount();
        } else if(whatChanged === 'QuoteCurrencyValue'){
            baseCurrencyValue = this.setBaseAmount();
        }

        return(
            
            <div id="currencyconvertertabel">
                <table>
                    <tbody>
                        <tr>
                            <td><input id="baseCurrency" value={baseCurrencyValue} onChange={this.handleInputChangeBaseCurrencyValue} /></td>
                            <td></td>
                            <td>
                                <div>
                                    <select id="baseCurrencies" value={this.state.baseCurrencyCode} onChange={this.handleChangeBaseCurrency}>
                                    <option value="-1">Select Currency</option>
                                    {
                                        CurrencyList.map(currency => (
                                        <option value={currency.code} key={currency.code}>
                                            {currency.name}
                                        </option>
                                        ))
                                    }
                                    </select>
                                    
                                </div>
                            </td>
                        </tr>
                        <tr></tr>
                        <tr>
                            <td><input id="quoteCurrency" value={quoteCurrencyValue}  onChange={this.handleInputChangeQuoteCurrencyValue} /></td>
                            <td></td>
                            <td>
                                <div>
                                    <select id="quoteCurrencies" value={this.state.quoteCurrencyCode} onChange={this.handleChangeQuoteCurrency}>
                                    <option value="-1">Select Currency</option>
                                    {
                                        CurrencyList.map(currency => (
                                        <option value={currency.code} key={currency.code}>
                                            {currency.name}
                                        </option>
                                        ))
                                    }
                                    </select>
                                    
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
  }

  export default CurrencyConverterTable;