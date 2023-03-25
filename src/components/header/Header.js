import React, {useEffect, useState} from "react";
import {getCurrencyValue} from "../services/currency_exchange_service/CurrencyExchangeService";
import './Header.css';

const Header = () => {

    const [currencyValue, setCurrencyValue] = useState({
        USD: 0,
        EUR: 0
    });

    const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     Promise.all([
    //         getCurrencyValue('UAH', 'EUR', 1),
    //         getCurrencyValue('UAH', 'USD', 1)
    //     ])
    //         .then(results => {
    //             setCurrencyValue({
    //                 EUR: results[0].result,
    //                 USD: results[1].result
    //             });
    //             setIsLoading(false);
    //         })
    // }, [])

    return(
        <React.Fragment>
            <div className="header">
                <div className='header__title'>
                    <h3>Currency Rate</h3>
                </div>
                {isLoading ?
                    <div className='header__currency'>
                        <h3>Loading...</h3>
                    </div>
                :
                    <div className='header__currency'>
                        <div className='header__currency__rate'>
                            <p>USD: {currencyValue.USD.toFixed(2)}</p>
                        </div>
                        <div className='header__currency__rate'>
                            <p>EUR: {currencyValue.EUR.toFixed(2)}</p>
                        </div>
                    </div>}
            </div>
        </React.Fragment>
    );
}

export default Header;