import React from 'react';
import MarqueeItem from './MarqueeItem';

const images = [
  { src: '/images/mob1.jpg', title: 'Premium Smartphones' },
  { src: '/images/mob2.jpg', title: 'Wireless Headphones' },
  { src: '/images/mob3.jpg', title: 'Gaming Laptops' },
  { src: '/images/mob5.jpg', title: 'Smart Watches' },
  { src: '/images/mob6.jpg', title: 'Bluetooth Speakers' },
  { src: '/images/fest2.jpg', title: 'Tablet Collection' },
  { src: '/images/mob8.jpg', title: 'iPhone Series' },
  { src: '/images/mob9.jpg', title: 'Android Phones' },
  { src: '/images/fest3.jpg', title: 'Gaming Accessories' },
  { src: '/images/mob11.jpg', title: 'Power Banks' },
  { src: '/images/fest11.jpg', title: 'Camera Gear' },
  { src: '/images/fest12.jpg', title: 'Festival Electronics' },
];

const InfiniteMarquee = () => {
  return (
    <div className="w-full overflow-hidden" style={{background: "black"}}>
      <div className="w-full">
        {/* Marquee Container with Enhanced Fade Borders */}
        <div className="w-screen relative h-[24rem] sm:h-[30rem] lg:h-[36rem] overflow-hidden shadow-2xl backdrop-blur-sm border border-gray-700/30 " style={{background: "rgb(37,37,37)"}}>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-gray-100 via-white to-gray-300 bg-clip-text text-transparent tracking-tight pt-4">
            Mobile & Electronics Gallery
          </h2>
          
          {/* Left Fade Border - Enhanced Vignette */}
          {/* Right Fade Border - Enhanced Vignette */}
          <div className="flex absolute left-0 top-20 sm:top-12 lg:top-4 h-full items-center">
            <div className="marquee-animation flex">
              {/* First set of items */}
              {images.map((item, index) => (
                <MarqueeItem 
                  key={`first-${item.src}-${index}`} 
                  image={item.src} 
                  title={item.title}
                  isLast={false}
                />
              ))}
              {/* Duplicate set for seamless loop */}
              {images.map((item, index) => (
                <MarqueeItem 
                  key={`second-${item.src}-${index}`} 
                  image={item.src} 
                  title={item.title}
                  isLast={index === images.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Subtitle */}
      </div>

      {/* Pure Tailwind CSS Animation using @keyframes in style tag */}
           <style>{`
        .marquee-animation {
          animation: marquee 45s linear infinite;
          width: calc(${images.length * 20}rem * 2);
        }
        /* Pause marquee animation when hovering a card */
        .marquee-animation:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        /* Tailwind responsive animations */
        @media (max-width: 640px) {
          .marquee-animation {
            animation-duration: 35s;
          }
        }
        @media (min-width: 1024px) {
          .marquee-animation {
            animation-duration: 55s;
          }
        }
        /* Touch device optimization */
        @media (hover: none) and (pointer: coarse) {
          .pause-animation:hover {
            animation-play-state: running;
          }
        }
      `}</style>
    </div>
  );
};

export default InfiniteMarquee;