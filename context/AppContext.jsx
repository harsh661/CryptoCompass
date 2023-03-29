import axios from "axios";
import { createContext, useState } from "react";
import debounce from "../src/helpers/debounce";

export const AppContext = createContext(null)

const AppContextProvider = ({children}) => {

  const[trendingCoins, setTrendingCoins] = useState([])
  const[coin,setCoin] = useState([])  //Backup state for trending coins
  const[term, setTerm] = useState('Trending Now')
  const[query, setQuery] = useState('')


  const trending = async () => {
    const res = await axios.get("https://api.coingecko.com/api/v3/search/trending")
    const trendCoins = res.data.coins.map(coin => {
      return{
        name: coin.item.name,
        image: coin.item.large,
        id: coin.item.id,
        priceBtc: parseFloat(coin.item.price_btc).toFixed(15),
      }
    })
    setTrendingCoins(trendCoins)
    setCoin(trendCoins)
  }

  const searchCoin = debounce(async () => {
    if(query.length >= 3) {
    const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`)
    
    const coins = res.data.coins.map(coin => {
      return{
        name:coin.name,
        image:coin.large,
        id: coin.id,
        priceBtc: parseFloat(coin.price_btc).toFixed(15),
      }
    })
    setTrendingCoins(coins)
    setTerm('Search Results')
  } else {
    setTrendingCoins(coin)
    setTerm('Trending Now')
  }

  }, 500)

  return (
    <AppContext.Provider value={{trendingCoins, query, setQuery, setTrendingCoins, searchCoin, trending, term}}>
        {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider