import React from 'react'
import Banner from '../../components/Banner'
import Categories from './Categories'
import SpecialDishes from './SpecialDishes'
import Testimonials from './Testimonials'

const home = () => {
  return (
    <div>
      <Banner></Banner>
      <Categories></Categories>
      <SpecialDishes/>
      <Testimonials/>
    </div>
  )
}

export default home
