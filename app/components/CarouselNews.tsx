import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/css/effect-coverflow';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";

export default function Carousel() {
  type Item = {
    name: string;
    img: string;
  };

  const items: Item[] = [
    { name: "Comfama", img: "/assets/carousel/comfama.png" },
    { name: "Eafit", img: "/assets/carousel/eafit.JPG" },
    { name: "UDA", img: "/assets/carousel/UDA.png" },
    { name: "Antivirus", img: "/assets/carousel/logo.png" },
    { name: "Universidad Pontificia Bolivariana", img: "/assets/carousel/Bolivariana.jpg" },
    { name: "Carlos Slim", img: "/assets/carousel/carlosSlim.jpg" },
  ];
  return (
    
    <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
      
      slidesPerView={"auto"}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      effect="coverflow"
      grabCursor={true}
        centeredSlides={true}
        
        coverflowEffect={{
          rotate: 20,
          stretch: 800,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
        
    >
      {items.map((Item, index) => (
        <SwiperSlide key={index} >
          <div className=" flex h-full justify-center rounded-xl">
          <img src={Item.img} alt={`Slide ${index + 1}`} className=" w-auto h-full rounded-2xl object-fill" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
