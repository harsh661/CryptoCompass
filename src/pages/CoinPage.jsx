import React, { useContext, useEffect } from 'react'
import { ShowContext } from '../../context/ShowContext'
import { useParams } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Loader from '../components/Loader';


const CoinPage = () => {

  const params = useParams()

  const {fetchData, graphData, data, setCurrency, currency, days, setDays, dark} = useContext(ShowContext)

  useEffect(() => {
    fetchData(params.id)
  }, [currency, days])

  if(!data) return <Loader />

  return (
    <div className={`w-full min-h-screen ${dark ? 'bg-main-bg': 'bg-white'}`}>
      <div className='flex flex-col max-w-5xl mx-auto px-5'>
        <header className='flex flex-col w-full items-center'>
          <span className='flex items-center gap-2 py-5'>
              <h2 className={`text-2xl ${dark ? 'text-dark-text': 'text-light-text'} font-semibold`}>#{data.market_cap_rank}</h2>
            <h2 className={`text-3xl ${dark ? 'text-white': 'text-light-text'} font-semibold `}>{data.name}({data.symbol})</h2>
            <select className='p-1 text-sm ml-5' name="currency" id="currency" value={currency} onChange={(e)=>setCurrency(e.target.value)}>
              <option value='inr'>INR</option>
              <option value="usd">USD</option>
            </select>
          </span>
          <div className='flex flex-col md:flex-row w-full justify-between items-center gap-5 py-5'>
            <img src={data.image.large} alt="image" className='w-40'/>
            <div className='lext-lg md:text-xl w-full md:w-auto flex flex-col gap-3'>
              <div className='flex gap-5 justify-between'>
                <span className={`${dark ? 'text-dark-text': 'text-light-text'}`}>24 hr High ({currency == 'inr'? "₹": "$"}): </span>
                <span className={`${dark ? 'text-white': 'text-light-text'}`}>{currency == 'inr' ? data.market_data.high_24h.inr : data.market_data.high_24h.usd}</span>
              </div>
              <div className='flex gap-5 justify-between'>
                <span className={`${dark ? 'text-dark-text': 'text-light-text'}`}>24 hr Low ({currency == 'inr'? "₹": "$"}): </span>
                <span className={`${dark ? 'text-white': 'text-light-text'}`}>{currency == 'inr' ? data.market_data.low_24h.inr : data.market_data.low_24h.usd}</span>
              </div>
              <div className='flex gap-5 justify-between'>
                <span className={`${dark ? 'text-dark-text': 'text-light-text'}`}>Change 24 hr  : </span>
                <span className={`${data.market_data.price_change_percentage_24h_in_currency.inr > 0 ? 'text-green-500': 'text-red-500'}`}>{currency == 'inr' ? data.market_data.price_change_percentage_24h_in_currency.inr : data.market_data.price_change_percentage_24h_in_currency.usd} %</span>
              </div>
              <div className='flex gap-5 justify-between'>
                <span className={`${dark ? 'text-dark-text': 'text-light-text'}`}>Market Cap  ({currency == 'inr'? "₹": "$"}): </span>
                <span className={`${dark ? 'text-white': 'text-light-text'}`}>{currency == 'inr' ? data.market_data.market_cap.inr : data.market_data.market_cap.usd}</span>
              </div>
              <div className='flex gap-5 justify-between'>
                <span className={`${dark ? 'text-dark-text': 'text-light-text'}`}>Total Supply : </span>
                <span className={`${dark ? 'text-white': 'text-light-text'}`}>{data.market_data.total_supply}</span>
              </div>
              <div className='flex gap-5 justify-between'>
                <span className={`${dark ? 'text-dark-text': 'text-light-text'}`}>Market Cap  ({currency == 'inr'? "₹": "$"}): </span>
                <span className={`${dark ? 'text-white': 'text-light-text'}`}>{data.market_data.circulating_supply}</span>
              </div>
              
            </div>
          </div>
        </header>
        <div className='flex w-full gap-5 py-10 px-20 justify-between'>
          <div className='flex items-center gap-3 w-full justify-between flex-col md:flex-row'>
              <div className='flex flex-col gap-1'>
                <span className={`${dark ? 'text-dark-text': 'text-light-text'}`}>Price</span>
                <span className={`${dark ? 'text-white': 'text-light-text'} text-4xl`}>{currency == 'inr'? "₹": "$"}{currency == 'inr' ? data.market_data.current_price.inr : data.market_data.current_price.usd}</span>
              </div>
            <div onChange={(e)=>setDays(e.target.value)}>
              <label htmlFor="day" className={`py-1 px-2 ${dark ? 'bg-main-box': 'bg-light-b'} ${days == '1'?'text-accent-blue':'text-dark-text'} rounded-md mr-3`}>1D</label>
              <input type="radio" name="time" id="day" value={1} className='hidden'/>
              <label htmlFor="week" className={`py-1 px-2 ${dark ? 'bg-main-box': 'bg-light-b'} ${days == '7'?'text-accent-blue':'text-dark-text'} rounded-md mr-3`}>1W</label>
              <input type="radio" name="time" id="week" value={7} className='hidden'/>
              <label htmlFor="month" className={`py-1 px-2 ${dark ? 'bg-main-box': 'bg-light-b'} ${days == '30'?'text-accent-blue':'text-dark-text'} rounded-md mr-3`}>1M</label>
              <input type="radio" name="time" id="month" value={30} className='hidden'/>
              <label htmlFor="year" className={`py-1 px-2 ${dark ? 'bg-main-box': 'bg-light-b'} ${days == '365'?'text-accent-blue':'text-dark-text'} rounded-md mr-3`}>1Y</label>
              <input type="radio" name="time" id="year" value={365} className='hidden'/>
              <label htmlFor="all" className={`py-1 px-2 ${dark ? 'bg-main-box': 'bg-light-b'} ${days == 'max'?'text-accent-blue':'text-dark-text'} rounded-md mr-3`}>ALL</label>
              <input type="radio" name="time" id="all" value={'max'} className='hidden'/>
            </div>
          </div>
        </div>
        <div className='w-full h-[500px] pb-5'>
          <ResponsiveContainer width="100%" height="100%">
          <AreaChart
              width={500}
              height={400}
              data={graphData}
              margin={{
                top: 0,
                right: 0,
                left: 20,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="Price" stroke="#bd34fe" fill="#646cff" />
            </AreaChart>
            </ResponsiveContainer>
        </div>
        <h2 className={`text-3xl w-full py-5 font-bold ${dark ? 'text-white': 'text-light-text'} text-center`}>About</h2>
        <div className={`${dark ? 'text-dark-text': 'text-light-text'} text-center pb-10`}>
          {data.description.en}
        </div>
      </div>
    </div>
  )
}

export default CoinPage