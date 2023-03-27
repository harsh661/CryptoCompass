import React, { useContext } from 'react'
import { ShowContext } from '../../context/ShowContext'

const Loader = () => {
    const {dark} = useContext(ShowContext)
  return (
    <div className={`${dark && 'bg-main-bg'} md:min-h-body-min min-h-body-small w-screen flex items-center justify-center`}>
        <div className="lds-roller z-50">
            <div className={`${dark ? 'after:bg-dark-text': 'after:bg-light-text'}`}></div>
            <div className={`${dark ? 'after:bg-dark-text': 'after:bg-light-text'}`}></div>
            <div className={`${dark ? 'after:bg-dark-text': 'after:bg-light-text'}`}></div>
            <div className={`${dark ? 'after:bg-dark-text': 'after:bg-light-text'}`}></div>
            <div className={`${dark ? 'after:bg-dark-text': 'after:bg-light-text'}`}></div>
            <div className={`${dark ? 'after:bg-dark-text': 'after:bg-light-text'}`}></div>
            <div className={`${dark ? 'after:bg-dark-text': 'after:bg-light-text'}`}></div>
            <div className={`${dark ? 'after:bg-dark-text': 'after:bg-light-text'}`}></div>
        </div>
    </div>
  )
}

export default Loader