import React from "react";
import Header from "./components/header/Header";
import ExchangeRateCalculation from "./components/exchange_rate_calculation/ExchangeRateCalculation";

const App = () => {
    return(
        <div>
            <header>
                <Header/>
            </header>
            <ExchangeRateCalculation/>
        </div>
    );
}

export default App;