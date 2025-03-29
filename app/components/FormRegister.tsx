import { useState } from "react";
import { useActionData, useNavigation, Form } from "@remix-run/react";
const imagerocket="/assets/register/images/imagerocket.svg";
const name="/assets/register/icons/name.svg";
const lastname= "/assets/register/icons/lastname.svg";
const birthday= "/assets/register/icons/birthday.svg";
const email= "/assets/register/icons/email.svg";
const password="/assets/register/icons/password.svg";
import { registerUser } from "~/utils/register";
import Swal from "sweetalert2";

export default function FormRegister() {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        password_confirm: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.lastname || !formData.email || !formData.password || !formData.password_confirm) {
            Swal.fire("Error", "Todos los campos son obligatorios", "error");
            return;
        }
        if (formData.password !== formData.password_confirm) {
            Swal.fire("Error", "Las contraseñas no coinciden", "error");
            return;
        }

        const payload = {
            name: `${formData.name} ${formData.lastname}`,
            email: formData.email,
            rol: "user",
            password: formData.password
        };

        try {
            const response = await fetch("http://localhost:5282/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                Swal.fire({
                    title: "Éxito",
                    text: "Cuenta creada correctamente",
                    icon: "success",
                    timer: 3000,
                    showConfirmButton: false
                }).then(() => {
                    window.location.href = "/login";
                });
            } else {
                Swal.fire("Error", result.message || "Error al registrar", "error");
            }
        } catch (error) {
            Swal.fire("Error", "No se pudo conectar con el servidor", "error");
        }
    };

    // const isSubmitting = navigation.state === "submitting";
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

                    <Form onSubmit={handleSubmit}>
                        <div className={styleinput}>
                            <img src={name} alt="name" />
                            <div className={styleform}>
                                <label htmlFor="Nombre"> Nombre</label>
                                <input 
                                type="text"
                                name="name"
                                className={changeinput}
                                placeholder="Nombre" 
                                value={formData.name}
                                onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className={styleinput}>
                            <img src={lastname} alt="lastname" />
                            <div className={styleform}>
                                <label htmlFor="Apellido"> Apellido</label>
                                <input 
                                type="text"
                                name="lastname"
                                className={changeinput}
                                placeholder="Apellido" 
                                value={formData.lastname}
                                onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className={styleinput}>
                            <img src={birthday} alt="birthday" />
                            <div className={styleform}>
                                <label htmlFor="Dia de nacimiento">Dia de nacimiento</label>
                                <input 
                                type="date"
                                className={changeinput}
                                placeholder="DD/MM/AAAA" 
                                />
                            </div>
                        </div>
                        <div className={styleinput}>
                            <img src={email} alt="email" />
                            <div className={styleform}>
                                <label htmlFor="Email"> Email</label>
                                <input 
                                type="email"
                                name="email"
                                className={changeinput}
                                placeholder="example@gmail.com" 
                                value={formData.email}
                                onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className={styleinput}>
                            <img src={password} alt="password" />
                            <div className={styleform}>
                                <label htmlFor="Contraseña"> Contraseña</label>
                                <input 
                                type="password"
                                name="password"
                                className={changeinput}
                                placeholder="******" 
                                value={formData.password}
                                onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className={styleinput}>
                            <img src={password} alt="password" />
                            <div className={styleform}>
                                <label htmlFor="Confirma tu contraseña"> Confirma tu contraseña</label>
                                <input 
                                type="password"
                                name="password_confirm"
                                className={changeinput}
                                placeholder="******" 
                                value={formData.password_confirm}
                                onChange={handleChange}
                                />
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