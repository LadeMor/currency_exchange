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
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getAllSymbols()
            .then(result => setAllSymbols(result.symbols))
    },[])

    const exchangeRateConverterFirst = () => {
        setIsLoading(true);
       try{
           getCurrencyValue(
               currencyExchangeValues.secondCurrency,
               currencyExchangeValues.firstCurrency,
               currencyExchangeValues.firstCurrencyValue)
               .then(res => {
                   setCurrencyExchangeValues(currencyExchangeValues => ({
                       ...currencyExchangeValues, result: res.result, secondCurrencyValue: res.result
                   }))
                   setIsLoading(false);
               })
       }catch (error){
           setIsLoading(false);
           console.error("Error occurred in exchangeRateConverterFirst: ", error);
       }
    }

    const exchangeRateConverterSecond = () => {
        setIsLoading(true);
        try{
            getCurrencyValue(
                currencyExchangeValues.firstCurrency,
                currencyExchangeValues.secondCurrency,
                currencyExchangeValues.secondCurrencyValue)
                .then(res => {setCurrencyExchangeValues(currencyExchangeValues => ({
                    ...currencyExchangeValues, result: res.result, firstCurrencyValue: res.result
                }))
                    setIsLoading(false);
                })
        }catch (error){
            setIsLoading(false);
            console.error("Error occurred in exchangeRateConverterSecond: ", error);
        }
    }

    useEffect(() => {
        exchangeRateConverterFirst();
    }, [])

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

    const options = Object.keys(allSymbols).map((currencyCode) => (
        <option key={currencyCode} value={currencyCode}>
            {`${currencyCode} ${allSymbols[currencyCode]}`}
        </option>
    ));

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
                               disabled={isLoading}
                               value={currencyExchangeValues.firstCurrencyValue}
                               onChange={handleFirstValueChange}/>
                        <select onChange={handleFirstCurrencyChange}
                                disabled={isLoading}>
                            {options}
                        </select>
                    </div>
                </div>
                <div className='currency_selector'>
                    <p>To:</p>
                    <div className='currency_selector__inputs'>
                        <input type='number'
                               min='0'
                               disabled={isLoading}
                               value={currencyExchangeValues.secondCurrencyValue}
                               onChange={handleSecondValueChange}/>
                        <select onChange={handleSecondCurrencyChange}
                                defaultValue='UAH'
                                disabled={isLoading}>
                            {options}
                        </select>
                    </div>
                </div>
                <button onClick={currencyExchangeValues.lastChangedValue === 1 ?
                    exchangeRateConverterFirst : exchangeRateConverterSecond}
                className={`currency_convert_button ${isLoading ? 'disabled_button' : null} `} disabled={isLoading}
                >Convert</button>
            </div>
        </div>
    );
}

export default ExchangeRateCalculation;