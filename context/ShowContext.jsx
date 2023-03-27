import axios from "axios";
import { createContext, useState } from "react";

export const ShowContext = createContext([])

const ShowContextProvider = ({children}) => {

  const[dark, setDark] = useState(true)
  const[graphData, setGraphData] = useState([])
  const[data, setData] = useState(null)
  const[currency, setCurrency] = useState('inr')
  const[days, setDays] = useState(1)

  const fetchData = async (id) => {

    const[graphRes, dataRes] = await Promise.all([
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`),
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true`),
    ])

    const graphdata = graphRes.data.prices.map(price => {
        const [timestamp, p] = price
        const date = new Date(timestamp).toLocaleDateString("en-us")
        return {
            Date: date,
            Price: p,
        }
    })
    setData(dataRes.data)

    setGraphData(graphdata)
  }


  return (
    <ShowContext.Provider value={{fetchData, graphData, data, currency, setCurrency, days, setDays, dark, setDark}}>
        {children}
    </ShowContext.Provider>
  )
}

export default ShowContextProvider