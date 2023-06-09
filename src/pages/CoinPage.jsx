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

  const key = `${dark ? 'text-dark-text': 'text-dark-text'} font-semibold`
  const value = `${dark ? 'text-white': 'text-light-text'} font-semibold`
  const key2 = `py-1 px-2 ${dark ? 'bg-main-box': 'bg-light-b'} font-semibold rounded-md mr-3`

  if(!data) return <Loader />

  return (
    <div className={`w-full min-h-screen ${dark ? 'bg-main-bg': 'bg-white'} overflow-hidden`}>
      <div className='flex flex-col max-w-5xl mx-auto px-5'>
        <header className='flex flex-col w-full items-center'>
          <span className='flex items-center justify-between py-5 gap-2'>
              <h2 className={`text-xl md:text-2xl ${dark ? 'text-dark-text': 'text-light-text'} font-semibold`}>#{data.market_cap_rank}</h2>
              <h2 className={`text-2xl md:text-3xl ${dark ? 'text-white': 'text-light-text'} font-semibold `}>{data.name}({data.symbol})</h2>
          </span>
          <div className='flex flex-col md:flex-row w-full justify-between items-center gap-5 py-5'>
            <img src={data.image.large} alt="image" className='w-40'/>
            <div className='lext-lg md:text-xl w-full md:w-auto flex flex-col gap-3'>
              <div className='flex w-full justify-center'>
                <select className='p-1 text-sm' name="currency" id="currency" value={currency} onChange={(e)=>setCurrency(e.target.value)}>
                  <option value='inr'>INR</option>
                  <option value="usd">USD</option>
                </select>
              </div>
              <div className='flex gap-5 justify-between'>
                <span className={key}>24 hr High ({currency == 'inr'? "₹": "$"}): </span>
                <span className={value}>{currency == 'inr' ? data.market_data.high_24h.inr : data.market_data.high_24h.usd}</span>
              </div>
              <div className='flex gap-5 justify-between'>
                <span className={key}>24 hr Low ({currency == 'inr'? "₹": "$"}): </span>
                <span className={value}>{currency == 'inr' ? data.market_data.low_24h.inr : data.market_data.low_24h.usd}</span>
              </div>
              <div className='flex gap-5 justify-between'>
                <span className={key}>Change 24 hr  : </span>
                <span className={`${data.market_data.price_change_percentage_24h_in_currency.inr > 0 ? 'text-green-500': 'text-red-500'}`}>{currency == 'inr' ? data.market_data.price_change_percentage_24h_in_currency.inr : data.market_data.price_change_percentage_24h_in_currency.usd} %</span>
              </div>
              <div className='flex gap-5 justify-between'>
                <span className={key}>Market Cap  ({currency == 'inr'? "₹": "$"}): </span>
                <span className={value}>{currency == 'inr' ? data.market_data.market_cap.inr : data.market_data.market_cap.usd}</span>
              </div>
              <div className='flex gap-5 justify-between'>
                <span className={key}>Total Supply : </span>
                <span className={value}>{data.market_data.total_supply}</span>
              </div>
              <div className='flex gap-5 justify-between'>
                <span className={key}>Market Cap  ({currency == 'inr'? "₹": "$"}): </span>
                <span className={value}>{data.market_data.circulating_supply}</span>
              </div>
              
            </div>
          </div>
        </header>
        <div className='flex w-full gap-5 py-10 px-20 justify-between'>
          <div className='flex items-center gap-3 w-full justify-between flex-col md:flex-row'>
              <div className='flex flex-col gap-1'>
                <span className={`${dark ? 'text-dark-text': 'text-light-text'} font-semibold`}>Price</span>
                <span className={`${dark ? 'text-white': 'text-light-text'} text-4xl font-semibold`}>{currency == 'inr'? "₹": "$"}{currency == 'inr' ? data.market_data.current_price.inr : data.market_data.current_price.usd}</span>
              </div>
            <div onChange={(e)=>setDays(e.target.value)}>
              <label htmlFor="day" className={`${key2} ${days == '1'?'text-accent-blue':'text-dark-text'}`}>1D</label>
              <input type="radio" name="time" id="day" value={1} className='hidden'/>
              <label htmlFor="week" className={`${key2} ${days == '7'?'text-accent-blue':'text-dark-text'}`}>1W</label>
              <input type="radio" name="time" id="week" value={7} className='hidden'/>
              <label htmlFor="month" className={`${key2} ${days == '30'?'text-accent-blue':'text-dark-text'}`}>1M</label>
              <input type="radio" name="time" id="month" value={30} className='hidden'/>
              <label htmlFor="year" className={`${key2} ${days == '365'?'text-accent-blue':'text-dark-text'}`}>1Y</label>
              <input type="radio" name="time" id="year" value={365} className='hidden'/>
              <label htmlFor="all" className={`${key2} ${days == 'max'?'text-accent-blue':'text-dark-text'}`}>ALL</label>
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
        <div dangerouslySetInnerHTML={{__html:data.description.en}} className={`${dark ? 'text-dark-text': 'text-light-text'} text-center pb-10`}/>
      </div>
    </div>
  )
}

export default CoinPage