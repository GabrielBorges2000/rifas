import { useState, useEffect } from 'react';

interface SlideShowProps {
  images: string[];
}

const BannerMobile: React.FC<SlideShowProps> = ({ images }) => {
  const [curSlide, setCurSlide] = useState(0);
  const maxSlide = images.length - 1;
  const delay = 2000;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurSlide((prevSlide) => (prevSlide < maxSlide ? prevSlide + 1 : 0));
    }, delay);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-[100%] h-[500px]  bg-black relative">
      <div className=" absolute w-full h-full">
        {images.map((img, index) => (
          <img 
            key={index} 
            src={img} 
            alt={`Slide ${index + 1}`}
            className={`absolute w-[100%] h-[500px]  transition-opacity duration-1000 ${curSlide !== index && 'opacity-0'}`}
          />
        ))}
      </div>
    </section>
  );
}

export default BannerMobile;
