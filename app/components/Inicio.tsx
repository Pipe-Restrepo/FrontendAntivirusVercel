import casa from "/assets/inicio/casa.svg"

export default function Inicio() {
    return (
        <div className="pt-40">
            <div className="flex pt-10">
                <div className="w-7/12 flex justify-center items-center">
                    <div className="w-5/6">
                        <div>
                            <h1 className="text-[85px] font-bold text-[#1D1856] pb-5">¡Tu futuro inicia aquí!</h1>
                        </div>
                        <div>
                            <p className="text-justify text-3xl font-normal">En la Fundación Antivirus para la Deserción creemos que cada persona merece acceso a las mejores oportunidades. Por eso, ofrecemos una plataforma personalizada donde puedes explorar becas, cursos y programas adaptados a tus intereses y necesidades.</p>
                        </div>
                        <div className="flex gap-5 pt-8">
                            <button className="text-[28px] bg-[#FAA307] text-white py-2 px-3 rounded-md">Contactános</button>
                            <p className="text-[26px] text-[#29282C] pt-3">o</p>
                            <button className="text-[26px] underline text-[#29282C] text-start pt-3">conoce sobre <br /> nosotros</button>
                        </div>
                    </div>

                </div>
                <div className="w-5/12 pt-5">
                    <img src={casa} alt="casa" />
                </div>
            </div>
        </div>
    )
}