import React from 'react'
import Banner from '../../components/Banner'
import Categories from './Categories'
import SpecialDishes from './SpecialDishes'
import Testimonials from './Testimonials'
import OurServices from './OurServices'
import Footer from '../../components/Footer'

const home = () => {
  return (
    <div>
      <Banner></Banner>
      <Categories></Categories>
      <SpecialDishes/>
      <Testimonials/>
      <OurServices/>
      <Footer/>
    </div>
  )
}

export default home
