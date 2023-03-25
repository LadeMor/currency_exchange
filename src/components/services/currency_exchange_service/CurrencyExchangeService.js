const _apiKey = 'WsMR5fjXdmAvETtVaBV5YoHDXiZVI0Sd';
const _apiBase = 'https://api.apilayer.com/exchangerates_data/';

export const getCurrencyValue = async (to, from, amount) => {

    let myHeaders = new Headers();
    myHeaders.append("apikey", _apiKey);

    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    let res;
    await fetch(`${_apiBase}convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)
        .then(response => response.json())
        .then(result => res = result)
        .catch(error => console.log('error', error));

    return res;
}

export const getAllSymbols = async () => {
    let res;

    let myHeaders = new Headers();
    myHeaders.append("apikey", _apiKey);

    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    await fetch(`${_apiBase}symbols`, requestOptions)
            .then(response => response.json())
            .then(result => res = result)
            .catch(error => console.log('error', error));

    return res;
}