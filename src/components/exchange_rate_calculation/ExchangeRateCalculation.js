import React, {useEffect, useState} from 'react';
import {getCurrencyValue, getAllSymbols} from "../services/currency_exchange_service/CurrencyExchangeService";
import './ExchangeRateCalculation.css';

const ExchangeRateCalculation = () => {

    const [currencyExchangeValues, setCurrencyExchangeValues] = useState({
        firstCurrency: 'USD',
        secondCurrency: 'UAH',
        firstCurrencyValue: 1,
        secondCurrencyValue: 0,
        lastChangedValue: 1,
        result: 0
    });

    const [allSymbols, setAllSymbols] = useState({
        USD: 'U.S. Dollar',
        EUR: 'Euro',
        UAH: 'Ukrainian Hryvnia',
    });

    useEffect(() => {
        getAllSymbols()
            .then(result => setAllSymbols(result.symbols))
    },[])

    const exchangeRateConverterFirst = () => {
        getCurrencyValue(
            currencyExchangeValues.secondCurrency,
            currencyExchangeValues.firstCurrency,
            currencyExchangeValues.firstCurrencyValue)
            .then(res => setCurrencyExchangeValues(currencyExchangeValues => ({
                ...currencyExchangeValues, result: res.result, secondCurrencyValue: res.result
            })))
    }

    const exchangeRateConverterSecond = () => {
        getCurrencyValue(
            currencyExchangeValues.firstCurrency,
            currencyExchangeValues.secondCurrency,
            currencyExchangeValues.secondCurrencyValue)
            .then(res => setCurrencyExchangeValues(currencyExchangeValues => ({
                ...currencyExchangeValues, result: res.result, firstCurrencyValue: res.result
            })))
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
            ({...currencyExchangeValues, firstCurrencyValue: e.target.value, lastChangedValue: 1}));
    }

    const handleSecondValueChange = (e) => {
        setCurrencyExchangeValues(currencyExchangeValues =>
            ({...currencyExchangeValues, secondCurrencyValue: e.target.value, lastChangedValue: 2}));
    }

    const handleSecondCurrencyChange = (e) => {
        if(e.target.value !== currencyExchangeValues.firstCurrency){
            setCurrencyExchangeValues(currencyExchangeValues =>
                ({...currencyExchangeValues, secondCurrency: e.target.value}));
        }
    }

    const handleFirstCurrencyChange = (e) => {
        if(e.target.value !== currencyExchangeValues.secondCurrency){
            setCurrencyExchangeValues(currencyExchangeValues =>
                ({...currencyExchangeValues, firstCurrency: e.target.value}));
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
                        <input type='number'
                               min='0'
                               value={currencyExchangeValues.firstCurrencyValue}
                               onChange={handleFirstValueChange}/>
                        <select onChange={handleFirstCurrencyChange} >
                            {options}
                        </select>
                    </div>
                </div>
                <div className='currency_selector'>
                    <p>To:</p>
                    <div className='currency_selector__inputs'>
                        <input type='number'
                               min='0'
                               value={currencyExchangeValues.secondCurrencyValue}
                               onChange={handleSecondValueChange}/>
                        <select onChange={handleSecondCurrencyChange} defaultValue='UAH'>
                            {options}
                        </select>
                    </div>
                </div>
                <button onClick={currencyExchangeValues.lastChangedValue === 1 ?
                    exchangeRateConverterFirst : exchangeRateConverterSecond}
                className='currency_convert_button'>Convert</button>
            </div>
        </div>
    );
}

export default ExchangeRateCalculation;