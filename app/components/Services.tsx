import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import vocation from '/assets/inicio/vocation.svg'
import pedagogy from '/assets/inicio/pedagogy.svg'
import test from '/assets/inicio/testVocational.svg'

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
    <div className="w-11/12">
        <h2 className="text-3xl text-[#1D1856] text-center font-bold pb-10">Servicios</h2>
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
              <div className='flex justify-center py-10'>
                <a className='py-2 px-6 border rounded-lg border-[#FAA307] text-[#FAA307] hover:bg-yellow-200' href={data.url}>LO QUIERO</a>
              </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}