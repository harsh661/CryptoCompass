import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { ShowContext } from '../../context/ShowContext'

const Home = () => {

  const{query, setQuery, term} = useContext(AppContext)
  const{dark} = useContext(ShowContext)
  const {trendingCoins, trending, searchCoin} = useContext(AppContext)

  useEffect(() => {
    trending()
  }, [])

  const handleSearch = (e) => {
    setQuery(e.target.value)
    searchCoin()
  }

  return (
    <div className={`w-full h-full ${dark ? 'bg-main-bg': 'bg-white'}`}>
    <div className='flex flex-col items-center max-w-4xl mx-auto p-5 min-h-screen'>
    <h2 className={`text-3xl w-full py-5 font-bold ${dark ? 'text-white': 'text-light-text'}`}>Search for assets</h2>
      <input 
        type="text" 
        name="search" 
        value={query} 
        onChange={handleSearch}
        className={`flex items-center mb-5 p-2 outline-none border-dark-text border-2 w-full ${dark ? 'bg-main-box text-white': 'bg-main-box-light text-light-text'}`}
        placeholder='Enter your search'
      />
      <h2 className={`text-3xl w-full py-3 font-bold ${dark ? 'text-white': 'text-light-text'}`}>{term}</h2>
      {trendingCoins.map(coin => {
        return(
          <div key={coin.id} className='m-2 w-full'>
            <Link to={`/${coin.id}`} className={`flex items-center py-2 px-5 ${dark ? 'bg-main-box': 'bg-main-box-light border border-light-b'}`}>
                <div className='flex items-center w-14'>
                  <img src={coin.image} alt="" />
                </div>
                <div className='flex flex-col sm:flex-row sm:items-center justify-between w-full pl-5'>
                  <h2 className={`${dark ? 'text-dark-text': 'text-light-text'} text-xl font-bold`}>{coin.name}</h2>
                  <span className='text-md text-accent-blue'>BTC: {coin.priceBtc}</span>
                </div>
            </Link>
          </div>
        )
      })}
    </div>
    </div>
  )
}

export default Home