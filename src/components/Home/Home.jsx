import React from 'react'
import AboutUs from './AboutUs'
import BestSellingCakes from './BestSellingCakes'
import CakeCategoryTabs from './CakeCategoryTabs'
import Hero from './hero'
import NewsletterSignup from './NewsletterSignup'
import OurServices from './OurServices'
import WhyChooseUsCake from './WhyChooseUsCake'

function Home() {
  return (
    <div>
        <Hero/>
        <CakeCategoryTabs/>
        <AboutUs/>
        <OurServices/>
        <BestSellingCakes/>
        <WhyChooseUsCake/>
        <NewsletterSignup/>
    </div>
  )
}

export default Home