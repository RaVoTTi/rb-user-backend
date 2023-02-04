import axios from 'axios';
import { COIN_MARKET_CAP_KEY } from '../config';



export const getCryptoPrice =  (crypto: string) => {
        let response
        try {
            response =  axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${crypto}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`);

        } catch (ex) {
            // error
            console.log(ex);
            return ;

        }
        if (response) {
            // success
            const json = response;
            return json;
        }

    }