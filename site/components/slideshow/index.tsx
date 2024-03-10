import { useState, useEffect } from 'react';

interface SlideShowProps {
  images: string[];
}

const SlideShow: React.FC<SlideShowProps> = ({ images }) => {
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
    <section className="w-[100%] rounded-lg h-[450px] bg-black relative">
      <div className=" absolute w-full h-full">
        {images.map((img, index) => (
          <img 
            key={index} 
            src={img} 
            alt={`Slide ${index + 1}`}
            className={`rounded-lg  absolute w-[100%] h-[450px] object-cover transition-opacity duration-1000 ${curSlide !== index && 'opacity-0'}`}
          />
        ))}
      </div>

      {/*<div className="absolute bottom-[-46px] left-1/2 transform -translate-x-1/2 z-5 flex space-x-2.5">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurSlide(index)}
            className={`w-4 h-4 rounded-full cursor-pointer ${curSlide === index ? 'bg-gray-400' : 'bg-gray-700 hover:border-gray-700 hover:bg-transparent border'}`}
          ></span>
        ))}
      </div> */}
    </section>
  );
}

export default SlideShow;
