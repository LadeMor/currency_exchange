import React, {useEffect, useState} from 'react';
import './ExchangeRateCalculation.css'

const ExchangeRateCalculation = () => {

    const [currencyExchangeValues, setCurrencyExchangeValues] = useState({
        firstCurrency: 'USD',
        secondCurrency: 'UAH',
        firstCurrencyValue: 1,
        secondCurrencyValue: 0,
        result: 0
    });

    const [allSymbols, setAllSymbols] = useState({
        USD: 'U.S. Dollar',
        EUR: 'Euro',
        UAH: 'Ukrainian Hryvnia',
    });

    let myHeaders = new Headers();
    myHeaders.append("apikey", "SWtWHgQFwT6UNEzYBhsEAuqKUP6dfyxK");

    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    // useEffect(() => {
    //     fetch("https://api.apilayer.com/fixer/symbols", requestOptions)
    //         .then(response => response.json())
    //         .then(result => setAllSymbols(result.symbols))
    //         .catch(error => console.log('error', error));
    // },[])

    const exchangeRateConverterFirst = () => {
        setTimeout(() => {
            fetch(`https://api.apilayer.com/exchangerates_data/convert?to=` +
                `${currencyExchangeValues.secondCurrency}&from=` +
                `${currencyExchangeValues.firstCurrency}&amount=` +
                `${currencyExchangeValues.firstCurrencyValue}`, requestOptions)
                .then(response => response.json())
                .then(res => setCurrencyExchangeValues(currencyExchangeValues => ({
                    ...currencyExchangeValues, result: res.result, secondCurrencyValue: res.result
                })))
                .catch(error => console.log('error', error));
        }, 500)
    }

    const exchangeRateConverterSecond = () => {
        setTimeout(() => {
            fetch(`https://api.apilayer.com/exchangerates_data/convert?to=` +
                `${currencyExchangeValues.secondCurrency}&from=` +
                `${currencyExchangeValues.firstCurrency}&amount=` +
                `${currencyExchangeValues.secondCurrencyValue}`, requestOptions)
                .then(response => response.json())
                .then(res => setCurrencyExchangeValues(currencyExchangeValues => ({
                    ...currencyExchangeValues, result: res.result, firstCurrencyValue: res.result
                })))
                .catch(error => console.log('error', error));
        }, 500)
    }

    useEffect(() => {
        exchangeRateConverterFirst();
    }, [])

    useEffect(() => {
        console.log(currencyExchangeValues);
    },[currencyExchangeValues]);

    const options = Object.keys(allSymbols).map((currencyCode) => (
        <option key={currencyCode} value={currencyCode}>
            {`${currencyCode} ${allSymbols[currencyCode]}`}
        </option>
    ));

    const handleFirstValueChange = (e) => {
        setCurrencyExchangeValues(currencyExchangeValues =>
            ({...currencyExchangeValues, firstCurrencyValue: e.target.value}));
        setTimeout(() => {
            exchangeRateConverterFirst();
        }, 500);

    }

    const handleSecondValueChange = (e) => {
        setCurrencyExchangeValues(currencyExchangeValues =>
            ({...currencyExchangeValues, secondCurrencyValue: e.target.value}));
        exchangeRateConverterSecond();
    }

    const handleSecondCurrencyChange = (e) => {
        if(e.target.value !== currencyExchangeValues.firstCurrency){
            setCurrencyExchangeValues(currencyExchangeValues =>
                ({...currencyExchangeValues, secondCurrency: e.target.value}));
            exchangeRateConverterFirst();
        }
    }

    const handleFirstCurrencyChange = (e) => {
        if(e.target.value !== currencyExchangeValues.secondCurrency){
            setCurrencyExchangeValues(currencyExchangeValues =>
                ({...currencyExchangeValues, firstCurrency: e.target.value}));
            exchangeRateConverterFirst();
        }
    }

    return(
        <div className='container'>
            <div className='box'>
                <p className='currency_value_display'>
                    {currencyExchangeValues.result} {currencyExchangeValues.secondCurrency}
                </p>
                <div className='currency_selector'>
                    <p>From:</p>
                    <div className='currency_selector__inputs'>
                        <input type='number' min='0'
                               value={currencyExchangeValues.firstCurrencyValue}
                               onChange={handleFirstValueChange}/>
                        <select onChange={handleFirstCurrencyChange}>
                            {options}
                        </select>
                    </div>
                </div>
                <div className='currency_selector'>
                    <p>To:</p>
                    <div className='currency_selector__inputs'>
                        <input type='number' min='0'
                               value={currencyExchangeValues.secondCurrencyValue}
                               onChange={handleSecondValueChange}/>
                        <select onChange={handleSecondCurrencyChange} defaultValue='UAH Ukrainian Hryvnia'>
                            {options}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExchangeRateCalculation;