import React from 'react'
import Banner from '../../components/Banner'
import Categories from './Categories'
import SpecialDishes from './SpecialDishes'

const home = () => {
  return (
    <div>
      <Banner></Banner>
      <Categories></Categories>
      <SpecialDishes/>
    </div>
  )
}

export default home
