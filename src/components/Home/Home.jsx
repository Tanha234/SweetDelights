import React from 'react'
import AboutUs from './AboutUs'
import BestSellingCakes from './BestSellingCakes'
import CakeCategoryTabs from './CakeCategoryTabs'
import CustomerTestimonials from './CustomerTestimonials'
import Hero from './hero'
import NewsletterSignup from './NewsletterSignup'
import OurServices from './OurServices'
import WhyChooseUsCake from './WhyChooseUsCake'

function Home() {
  return (
    <div>
        <Hero/>
        <CakeCategoryTabs/>
        <BestSellingCakes/>
        <AboutUs/>
        <OurServices/>
        
        <WhyChooseUsCake/>
        <CustomerTestimonials/>
        <NewsletterSignup/>
    </div>
  )
}

export default Home