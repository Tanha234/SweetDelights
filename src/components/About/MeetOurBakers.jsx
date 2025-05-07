import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const bakers = [
  {
    name: "Emma Rose",
    role: "Cake Artist",
    image:
      "https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Liam Walker",
    role: "Pastry Chef",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Sophia Lane",
    role: "Sugar Craft Specialist",
    image:
      "https://images.unsplash.com/photo-1589571894960-20bbe2828acb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Oliver Brooks",
    role: "Chocolate Expert",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 640,
      settings: { slidesToShow: 1 },
    },
  ],
};

const MeetOurBakers = () => {
  return (
    <section className="py-16 px-4 md:px-44 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-berryPink mb-10">
        👨‍🍳 Meet Our Bakers
      </h2>

      <Slider {...sliderSettings}>
        {bakers.map((baker, index) => (
          <div key={index} className="px-4">
            <div className="bg-yellow-50 p-6 rounded-xl shadow-md flex flex-col items-center justify-center hover:bg-pink-100 transition duration-300">
              <img
                src={baker.image}
                alt={baker.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{baker.name}</h3>
              <p className="text-sm text-gray-500">{baker.role}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default MeetOurBakers;
