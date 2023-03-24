import React, {useEffect, useState} from "react";
import './Header.css';

const Header = () => {

    const [currencyValue, setCurrencyValue] = useState({
        USD: 0,
        EUR: 0
    });

    let myHeaders = new Headers();
    myHeaders.append("apikey", "SWtWHgQFwT6UNEzYBhsEAuqKUP6dfyxK");

    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };


    // useEffect(() => {
    //     fetch("https://api.apilayer.com/exchangerates_data/convert?to=UAH&from=EUR&amount=1", requestOptions)
    //         .then(response => response.json())
    //         .then(result => setCurrencyValue(currencyValue => ({...currencyValue, EUR: result.result})))
    //         .catch(error => console.log('error', error));
    //
    //     fetch("https://api.apilayer.com/exchangerates_data/convert?to=UAH&from=USD&amount=1", requestOptions)
    //         .then(response => response.json())
    //         .then(result => setCurrencyValue(currencyValue => ({...currencyValue, USD: result.result})))
    //         .catch(error => console.log('error', error));
    // }, [])


    return(
        <React.Fragment>
            <div className="header">
                <div className='header__title'>
                    <h3>Currency Rate</h3>
                </div>
                <div className='header__currency'>
                    <div className='header__currency__rate'>
                        <p>USD: {currencyValue.USD.toFixed(2)}</p>
                    </div>
                    <div className='header__currency__rate'>
                        <p>EUR: {currencyValue.EUR.toFixed(2)}</p>
                    </div>

                </div>
            </div>
        </React.Fragment>
    );
}

export default Header;