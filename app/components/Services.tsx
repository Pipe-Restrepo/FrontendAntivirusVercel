import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import vocation from '/assets/inicio/vocation.svg'
import pedagogy from '/assets/inicio/pedagogy.svg'
import test from '/assets/inicio/testVocational.svg'
import { RiServiceFill } from "react-icons/ri";
import 'swiper/css';
import 'swiper/css/pagination';


export const Services = () => {
    const slideServices=[
        {
            id:1,
            title:'Pro-vocación',
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
            url:'*',
            image:vocation
        },
        {
            id:2,
            title:'Asesoria sociopedagógica',
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
            url:'*',
            image:pedagogy
        },
        {
            id:3,
            title:'Test sociovocacional ',
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
            url:'*',
            image:test
        },
        {
            id:4,
            title:'Pro-vocación',
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
            url:'*',
            image:vocation
        },
        {
            id:5,
            title:'Asesoria sociopedagógica',
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
            url:'*',
            image:pedagogy
        },
        {
            id:6,
            title:'Test sociovocacional ',
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
            url:'*',
            image:test
        }
    ]

  return (
    <div className="w-full">
        <div className="flex items-center justify-center space-x-4">
            <RiServiceFill size={48} className="text-[#2C395B]" />
            <h2 className="text-[52px] text-[#1D1856] text-center font-bold py-20">Servicios </h2>
        </div>
        <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="flex w-11/12 mb-14"
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 }, 
          640: { slidesPerView: 2, spaceBetween: 20 }, 
          1024: { slidesPerView: 3, spaceBetween: 30 }, 
        }}
      >
        {slideServices.map((data)=>(
          <SwiperSlide key={data.id} className='flex flex-col justify-between border border-black rounded-lg'>
              <img className='rounded-lg w-full h-auto' src={data.image} alt={data.title} />
              <div className='h-60 w-5/6 ps-5'>
                  <h3 className='py-5 text-3xl font-bold'>{data.title}</h3>
                  <p>{data.description}</p>
              </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}