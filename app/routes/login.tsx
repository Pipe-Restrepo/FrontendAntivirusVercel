import { useActionData, useNavigation, Form } from "@remix-run/react";
import Header from "../components/Header";
import { json, LoaderFunction, redirect } from "@remix-run/node";
import { FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { useState, useEffect  } from "react";
import Swal from "sweetalert2";
import { loginUser } from "~/utils/auth";
import { getCookie } from "~/utils/cookies";


export const action = async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await loginUser(email, password);

    return json({
        error: result.error ?? null,
        success: result.error ? false : true,
        token: result.token ?? null,
    }, {
        status: result.error ? 401 : 200,
        headers: result.token 
            ? { "Set-Cookie": `token=${result.token}; HttpOnly; Path=/;` } 
            : {},
    });
};

// Saber si esta logueado o no
export const loader: LoaderFunction = async ({ request }) => {
    const token = await getCookie(request, "token");

    if (token) {
        return redirect("/novedades");
    }

    return null;
};

export default function Login (){

    const actionData= useActionData<typeof action>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    // Mostrar Contraseña
    const [showPassword, setShowPassword] = useState(false);

    // Efecto de Swal
    useEffect(() => {
        if (actionData?.error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: actionData.error,
            });
        } else if (actionData?.success) {
            window.location.href = "/novedades";
        }
    }, [actionData]);
    
    return(
        <div>
            <Header></Header>     
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="flex w-full max-w-4xl bg-white overflow-hidden -translate-y-10">
                    {/* Sección de la imagen */}
                    <div className="hidden md:flex items-center justify-center bg-[#f3f4f6] w-1/2">
                    <img
                        src="/assets/login/mascota.png"
                        alt="Robot ilustración"
                        className="h-[32rem] max-h-full w-auto object-contain"
                    />
                    </div>

                    {/* Sección del formulario */}
                    <div className="w-full md:w-1/2 p-8 shadow-md rounded-lg">
                    <h2 className="text-2xl font-semibold text-gray-700">
                        Bienvenido a tu
                    </h2>
                    <h2 className="text-3xl font-black text-[#00266b]">
                        Banco de oportunidades
                    </h2>

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

                    <Form method="post" className="mt-4 space-y-4">
                        <div className="flex flex-col w-full">
                            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-full relative h-12">
                                <div className="bg-gray-100 p-2 rounded-lg">
                                    <IoMdMail className="h-5 w-5 text-black" />
                                </div>
                                <label className="absolute left-16 top-2 text-gray-500 text-[10px]">
                                    Email
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="example@gmail.com"
                                    className="ml-4 w-full bg-transparent text-gray-900 font-semibold focus:outline-none text-sm mt-3"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col w-full">
                            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-full relative h-12">
                                <div className="bg-gray-100 p-2 rounded-lg">
                                    <FaKey className="h-5 w-5 text-black" />
                                </div>
                                <label className="absolute left-16 top-2 text-gray-500 text-[10px]">
                                    Contraseña
                                </label>
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="********"
                                    className="ml-4 w-full bg-transparent text-gray-900 font-semibold focus:outline-none text-sm mt-4"
                                />
                                <button className="absolute right-3 text-gray-500" onClick={() => setShowPassword(!showPassword)} type="button">
                                    {showPassword ? <FaEyeSlash className="h-5 w-5 text-black" /> : <FaEye className="h-5 w-5 text-black" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="appearance-none w-4 h-4 border border-gray-300 rounded-md bg-gray-100 checked:bg-[#faa307] checked:border-[#faa307] checked:ring-2 checked:ring-[#faa307] focus:outline-none relative flex items-center justify-center 
                                before:content-['✔'] before:absolute before:text-white before:text-xs before:font-bold before:opacity-0 checked:before:opacity-100"
                            />
                            <span className="text-black text-sm">Recordarme</span>
                        </label>
                        <a href="#" className="text-[#faa307] text-sm">Olvidé mi contraseña</a>
                        </div>

                        <button className="w-full bg-[#faa307] font-black text-white p-2 rounded-lg font-bold hover:bg-yellow-600" disabled={isSubmitting}>
                            {isSubmitting ? "Cargando..." : "Login"}
                        </button>
                    </Form>

                    <p className="mt-4 text-center text-gray-600 text-sm">
                        ¿No tienes una cuenta?{" "}
                        <a href="#" className="text-[#faa307]">Regístrate</a>
                    </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
