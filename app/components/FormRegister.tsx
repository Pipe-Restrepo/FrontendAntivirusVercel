import { useActionData, useNavigation, Form } from "@remix-run/react";
const imagerocket="/assets/register/images/imagerocket.svg";
const name="/assets/register/icons/name.svg";
const lastname= "/assets/register/icons/lastname.svg";
const birthday= "/assets/register/icons/birthday.svg";
const email= "/assets/register/icons/email.svg";
const password="/assets/register/icons/password.svg";

export default function FormRegister() {
    const isSubmitting = navigation.state === "submitting";

    const styleinput="flex mb-3 bg-[#ECECEC] p-2 gap-4 rounded-lg"  
    const styleform="flex flex-col" 
    const changeinput="bg-transparent text-black placeholder-black font-bold focus:outline-none"
    return (

        <div className="pt-10">
            <div className="flex px-10 lg:px-60 pt-20">
                <div className="shadow-2xl px-12 py-1 w-full lg:w-3/5">

                    <div className="font-poppins">
                        <h2 className="text-2xl py-4">¿Preparado para encontrar tu próxima <span className="text-4xl font-bold text-[#00266B]">oportunidad? 👋</span></h2>

                    </div>
                    <div className="mt-6 space-y-4">
                        <button className="w-full flex items-center justify-center space-x-2 p-2 rounded-lg text-black hover:bg-gray-200 shadow-md">
                        <img src="/assets/login/google.png" alt="Google" className="h-5 w-5" />
                        <span>Ingresa con Google</span>
                        </button>

                        <button className="w-full flex items-center justify-center space-x-2 p-2 rounded-lg text-black hover:bg-gray-200 shadow-md">
                        <img src="/assets/login/facebook.png" alt="Google" className="h-5 w-5" />
                        <span>Ingresa con Facebook</span>
                        </button>
                    </div>

                    <div className="flex items-center mt-4">
                        <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-4 text-gray-500">o</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <Form>
                        <div className={styleinput}>
                            <img src={name} alt="name" />
                            <div className={styleform}>
                                <label htmlFor="Nombre"> Nombre</label>
                                <input type="text"
                                className={changeinput}
                                    placeholder="Nombre" />
                            </div>
                        </div>
                        <div className={styleinput}>
                            <img src={lastname} alt="lastname" />
                            <div className={styleform}>
                                <label htmlFor="Apellido"> Apellido</label>
                                <input type="text"
                                className={changeinput}
                                    placeholder="Apellido" />
                            </div>
                        </div>
                        <div className={styleinput}>
                            <img src={birthday} alt="birthday" />
                            <div className={styleform}>
                                <label htmlFor="Dia de nacimiento">Dia de nacimiento</label>
                                <input type="date"
                                className={changeinput}
                                    placeholder="DD/MM/AAAA" />
                            </div>
                        </div>
                        <div className={styleinput}>
                            <img src={email} alt="email" />
                            <div className={styleform}>
                                <label htmlFor="Email"> Email</label>
                                <input type="email"
                                className={changeinput}
                                    placeholder="example@gmail.com" />
                            </div>
                        </div>
                        <div className={styleinput}>
                            <img src={password} alt="password" />
                            <div className={styleform}>
                                <label htmlFor="Contraseña"> Contraseña</label>
                                <input type="password"
                                className={changeinput}
                                    placeholder="******" />
                            </div>
                        </div>
                        <div className={styleinput}>
                            <img src={password} alt="password" />
                            <div className={styleform}>
                                <label htmlFor="Confirma tu contraseña"> Confirma tu contraseña</label>
                                <input type="password"
                                className={changeinput}
                                    placeholder="******" />
                            </div>
                        </div>
                        <button className="w-full bg-[#faa307] font-black text-white p-2 rounded-lg font-bold hover:bg-yellow-600 mt-4" disabled={isSubmitting}>
                            {isSubmitting ? "Cargando..." : "Crear Cuenta"}
                        </button>

                    </Form>
                </div>
                <div className="w-6/12 pt-20 hidden lg:flex">
                    <img src={imagerocket} alt="imagerocket" />
                </div>
            </div>
        </div>)
}