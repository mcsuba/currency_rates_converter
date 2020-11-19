import Configuration from '../conf/Configuration'
class RatesAPIClient {

    constructor(){
        this.config = new Configuration();
    }

     async getConversionRate(baseCurrency,quoteCurrency) {
        var converstiourl = this.config.BASE_URL + 'base=' + baseCurrency+'&symbols='+quoteCurrency
        return fetch(converstiourl)
        .then(response => {
            if (!response.ok) {
                this.handleAPIResponseError(response);
            }
            return response.json();
        })
        .then(json => {
            console.log("Retrieved items:");
            console.log(json);
            console.log(json.rates[quoteCurrency]);
            return json.rates[quoteCurrency];
        })
        .catch(error => {
            this.handleExceptions(error);
        });
    }


    handleAPIResponseError(response) {
        throw new Error("HTTP error, status = " + response.status);     
    }

    handleExceptions(error) {
        console.log(error.message);
    }

}

export default RatesAPIClient;