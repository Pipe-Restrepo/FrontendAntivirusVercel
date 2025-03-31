import React from "react";

const OurTeam: React.FC = () => {
    // Datos del equipo
    const teamMembers = [
        { url: "/assets/ourteam/1.png", name: "CARLOS VASQUÉZ RESTREPO", role: "Presidente" },
        { url: "/assets/ourteam/2.png", name: "ASTRID FRANCO", role: "Coordinadora Área Social" },
        { url: "/assets/ourteam/3.png", name: "LUIS FERNANDO SANCHEZ", role: "Director" },
        { url: "/assets/ourteam/4.png", name: "KAREN GONZÁLEZ", role: "Coordinadora Área Evaluacion y Datos" },
        { url: "/assets/ourteam/5.png", name: "VÍCTOR MANUEL VALENCIA", role: "Subdirector" },
        { url: "/assets/ourteam/6.png", name: "JAZMÍN ALZATE", role: "Coordinadora Alianzas y Cooperación" },
        { url: "/assets/ourteam/7.png", name: "DAVID SANTIAGO BOTERO", role: "Coordinador Área Legal" },
        { url: "/assets/ourteam/8.png", name: "DANIELA CORREA", role: "Coordinadora Área Comunicaciones" },
        { url: "/assets/ourteam/9.png", name: "LUIS FERNANDO GONZÁLEZ", role: "Coordinador Área Administrativa y Financiera" }
    ];

    return (
        <section className="bg-slate-200 py-20 mt-16">
            <div className="max-w-4xl mx-auto px-5 text-center">
                <h2 className="text-4xl font-bold text-[#FDC80A] mb-4">
                    ¿QUIÉNES SOMOS?
                </h2>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                    SOMOS UNA ORGANIZACIÓN SIN ÁNIMO DE LUCRO QUE
                </h3>
            </div>
            <p className="text-sm text-gray-700 text-center mx-auto whitespace-nowrap">
                Busca disminuir los niveles de deserción estudiantil en Colombia, mejorar los niveles de permanencia y de graduación, siendo esta nuestra manera de aportar al logro de un país con más educación y, consecuentemente, con más desarrollo.
            </p>

            {/* Grid de imágenes con animación hover de izquierda a derecha */}
            <div className="flex justify-center mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-5">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="relative group overflow-hidden rounded-xl">
                            {/* Imagen */}
                            <img src={member.url} alt={member.name} className="w-80 h-160 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105" />
                            
                            {/* Capa de fondo con animación */}
                            <div className="absolute inset-0 bg-yellow-400/70 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100">
                            </div>

                            {/* Texto sobre la imagen */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <h4 className="text-2xl font-bold">{member.name}</h4>
                                <p className="text-lg font-normal">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-12 dark:bg-[#0a0f1b] mt-16">
                <div className="column1">
                    <div className="section mb-8">
                        <h2 className="text-2xl font-bold text-[#1D1856] mb-4 dark:text-[#12a6e8]">TEORÍA DEL CAMBIO</h2>
                        <p className="text-gray-700 dark:text-[#a8afc4]">Identificar estudiantes con vulnerabilidades y acompañarlos integralmente, a través de un ecosistema de estrategias centrado en lo académico, económico y socioemocional para la permanencia.</p>
                    </div>
                    <div className="section mb-8">
                        <h2 className="text-2xl font-bold text-[#1D1856] mb-4 dark:text-[#12a6e8]">MISIÓN</h2>
                        <p className="text-gray-700 dark:text-[#a8afc4]">Aumentar las tasas de graduación de estudiantes de carreras y programas en áreas de tecnología, a través de estrategias de promoción de la permanencia y prevención de la deserción.</p>
                    </div>
                    <div className="section mb-8">
                        <h2 className="text-2xl font-bold text-[#1D1856] mb-4 dark:text-[#12a6e8]">VISIÓN</h2>
                        <p className="text-gray-700 dark:text-[#a8afc4]">En 5 años vamos a tener presencia a nivel nacional, en las 10 mejores universidades del país, donde habremos disminuido la tasa de deserción en 10 puntos porcentuales (del 50 al 40%). Además, vamos a estar replicando un modelo que es referente, cuyo éxito se puede medir cualitativa y cuantitativamente.</p></div>
                    </div>
                    <div className="column1"><div _ngcontent-ng-c3234427010="" className="section mb-8">
                        <h2 className="text-2xl font-bold text-[#1D1856] mb-4 dark:text-[#12a6e8]">VALORES</h2>
                        <p className="text-gray-700 dark:text-[#a8afc4]">En la Fundación Antivirus para la Deserción hacemos nuestro trabajo de forma colaborativa, con pasión, integridad, autonomía, empatía, compromiso y compañerismo. Somos solidarios e innovadores y tenemos una gran vocación de servicio.</p>
                    </div>
                    <div className="section mb-8">
                        <h2 className="text-2xl font-bold text-[#1D1856] mb-4 dark:text-[#12a6e8]">PROPÓSITO</h2>
                        <p className="text-gray-700 dark:text-[#a8afc4]">Construir un país próspero, pacífico, armonioso, tecnológico y competitivo, en el cual todos los jóvenes tienen acceso a la educación y son buenos seres humanos, con metas y empoderados de sus vidas. Gracias a esto, lograremos superar la pobreza y nos convertiremos en un referente de desarrollo.</p>
                    </div>
                    <div className="section mb-8">
                        <h2 className="text-2xl font-bold text-[#1D1856] mb-4 dark:text-[#12a6e8]">PÚBLICO OBJETIVO</h2>
                        <p className="text-gray-700 dark:text-[#a8afc4]">Trabajamos con estudiantes de carreras y programas TI de Educación Media y Postsecundaria. Enfocamos nuestra intervención en estudiantes vulnerables a la deserción.</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-12 dark:bg-[#0a0f1b]">
                {/* Columna de texto */}
                <div className="column1">
                    <div className="section mb-8">
                        <h2 className="text-2xl font-bold text-[#1D1856] mb-4 dark:text-[#12a6e8]">
                            PRIORIDADES
                        </h2>
                        <ul className="list-disc ml-5 text-gray-700 dark:text-[#a8afc4]">
                            <li>Consolidar un modelo con procesos de identificación de vulnerabilidades, intervención e indicadores de resultados.</li>
                            <li>Explorar modelos de intervención desde los colegios para aportar a reducir la deserción en educación superior.</li>
                            <li>Conocer e involucrar a otros actores en el trabajo por la permanencia (Rectores, Decanos, MEN, Empresas, entre otros).</li>
                            <li>Ayudar a reducir la deserción en otras universidades y programas para afinar nuestro modelo y generar ingresos que aporten a la sostenibilidad de la Fundación Antivirus.</li>
                        </ul>
                    </div>
                </div>

                {/* Columna de imagen */}
                <div className="column1">
                    <div className="side">
                        <img
                            src="/assets/ourteam/image.jpeg"
                            alt="Content Image"
                            className="w-full rounded-lg shadow-lg mb-12"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurTeam;
