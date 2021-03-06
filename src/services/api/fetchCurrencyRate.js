import axios from 'axios';

async function fetchCurrencyRate() {
    const CURRENCY_URL = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
  try {
    const fetchData = await axios(CURRENCY_URL)
      .then(res => res.data.filter(item => (item.ccy === 'USD' || item.ccy === 'EUR')))
      .then(items => items.map(item => {
        // return
        const data = {
          ccy: item.ccy,
          base_ccy: item.base_ccy,
          normalizedBuyValue: Number(item.buy).toFixed(2),
          normalizedSaleValue: Number(item.sale).toFixed(2),
        }
        return data;
      }));
    return fetchData;

  } catch (error) {
    console.error(error);
  }
};

export default fetchCurrencyRate;