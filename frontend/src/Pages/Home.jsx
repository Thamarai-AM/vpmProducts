import React from 'react'
import Banner from '../Components/Banner/Banner'
import Recommand from '../Components/Recommend/Recommand'
import RecommendStat from '../Components/RecommendStat/RecommendStat'
import RecommendHerbal from '../Components/RecommendHerbal/RecommendHerbal'
import HomeCategory from '../Components/HomeCategory/HomeCategory'
import Testimonial from '../Components/Testimonials/Testimonial'
import Available from '../Components/Available/Available'

const Home = () => {
  return (
    <div>
      <Banner/>
      <Recommand />
      <HomeCategory />
      <RecommendStat />
      <RecommendHerbal />
      <Testimonial />
      <Available />
    </div>
  )
}

export default Home
