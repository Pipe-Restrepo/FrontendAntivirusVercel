import {useRef, useState} from "react"
import {Swiper, SwiperSlide} from "swiper/react"
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from "swiper/modules";
import nodo from "/assets/inicio/nodo.svg"
import velez from "/assets/inicio/velez.svg"
import comfama from "/assets/inicio/comfama.svg"

export default function Oportunity(){
        const SimulationBD=[
            {
                id:1,
                title:"Nodo EAFIT",
                description:"Participa en programas de formación y talleres en la Universidad EAFIT en la era de la tecnología para potenciar tus habilidades y conocimientos. ¡Inscríbete hoy!",
                image: nodo,
            },
            {
                id:2,
                title:"Becas vélezreyes+",
                description:"Ofrecen apoyo financiero a estudiantes destacados. Solicita tu beca y alcanza tus metas educativas.",
                image: velez,
            },
            {
                id:3,
                title:"Comfama",
                description:"Accede a programas educativos y recreativos con Comfama. Encuentra la oportunidad perfecta para tu crecimiento personal y profesional.",
                image: comfama,
            },
            {
                id:4,
                title:"Nodo EAFIT",
                description:"Participa en programas de formación y talleres en la Universidad EAFIT en la era de la tecnología para potenciar tus habilidades y conocimientos. ¡Inscríbete hoy!",
                image: nodo,
            },
            {
                id:5,
                title:"Becas vélezreyes+",
                description:"Ofrecen apoyo financiero a estudiantes destacados. Solicita tu beca y alcanza tus metas educativas.",
                image: velez,
            },
            {
                id:6,
                title:"Comfama",
                description:"Accede a programas educativos y recreativos con Comfama. Encuentra la oportunidad perfecta para tu crecimiento personal y profesional.",
                image: comfama,
            }, 
        ]
    return (
        <div className="w-11/12">
            <h2 className="text-[52px] text-[#1D1856] text-center font-bold py-20">¡Mira estás oportunidades! </h2>
            <Swiper 
                slidesPerView={3}
                spaceBetween={10}
                freeMode={true}
                pagination={{
                    clickable:true
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper h-full"    
            >
               {SimulationBD.map((data)=>(
                <SwiperSlide key={data.id} className="ps-10">
                    <div>
                        <img src={data.image} alt={data.title} className="h-[400px] pb-6"/>
                    </div>
                    <div>
                        <h4 className="font-semibold text-3xl">{data.title}</h4>
                        <p className="text-base">{data.description}</p>
                    </div>

                </SwiperSlide>
               ))} 
            </Swiper>
        </div>
    )
}