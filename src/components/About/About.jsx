import React from 'react';
import HeroBanner from './HeroBanner';
import IngredientsAndDelivery from './IngredientsAndDelivery';
import MeetOurBakers from './MeetOurBakers';
import OurJourney from './OurJourney';
import WhatWeOffer from './WhatWeOffer';

const AboutUs = () => {
  return (
    <div className="text-gray-800">
        <HeroBanner/>
     

     
      
      <WhatWeOffer/>

        <OurJourney/>
        <MeetOurBakers/>
        <IngredientsAndDelivery/>

    

        {/* Meet Our Bakers */}
        <section>
          <h3 className="text-xl font-semibold mb-2">👨‍🍳 Meet Our Bakers</h3>
          <p>
            Our team of passionate bakers and decorators come from professional culinary backgrounds and bring creativity to every order.
          </p>
        </section>

        {/* Ingredients Section */}
        <section>
          <h3 className="text-xl font-semibold mb-2">🌿 Ingredients You Can Trust</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Organic dairy and eggs</li>
            <li>Locally sourced fruits</li>
            <li>Premium chocolate and vanilla</li>
            <li>No artificial preservatives</li>
          </ul>
        </section>

        {/* Delivery Section */}
        <section>
          <h3 className="text-xl font-semibold mb-2">🚚 Delivery & Service Areas</h3>
          <p>
            We proudly deliver across [Your City] and nearby areas. Our reliable delivery service ensures your cake arrives fresh and on time.
          </p>
        </section>

        {/* Testimonials */}
        <section>
          <h3 className="text-xl font-semibold mb-2">⭐ Customer Testimonials</h3>
          <blockquote className="italic border-l-4 border-pink-400 pl-4 mb-2">
            “Absolutely the best cake I’ve ever had! Beautifully designed and so delicious!” – Sarah A.
          </blockquote>
          <blockquote className="italic border-l-4 border-pink-400 pl-4">
            “Fast delivery, perfect flavor, and wonderful service. I’ll order again for sure!” – Jake M.
          </blockquote>
        </section>

        {/* Social Media */}
        <section>
          <h3 className="text-xl font-semibold mb-2">📸 Behind the Scenes</h3>
          <p>
            Follow us on Instagram <strong>@sweetwhisk</strong> to see behind-the-scenes content, new designs, and baking magic.
          </p>
        </section>

        {/* Collaboration */}
        <section>
          <h3 className="text-xl font-semibold mb-2">🤝 Collaborate With Us</h3>
          <p>
            Hosting a party or event? We offer bulk and custom cake orders tailored for your occasion. Let's create something special together!
          </p>
        </section>

        {/* Contact Info */}
        <section>
          <h3 className="text-xl font-semibold mb-2">📬 Get in Touch</h3>
          <p>
            Have a question or a custom request? <br />
            Email us at <a href="mailto:hello@sweetwhisk.com" className="text-pink-600 font-semibold">hello@sweetwhisk.com</a>
          </p>
        </section>
      </div>
    
  );
};

export default AboutUs;
