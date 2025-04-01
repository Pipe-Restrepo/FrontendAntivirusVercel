import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

const API_BASE_URL = "http://localhost:5282/api";

async function uploadLogo(file) {
    const logoUploadUrl = `${API_BASE_URL}/LogoUpload`;

    const formData = new FormData();
    formData.append("logo", file);

    const response = await fetch(logoUploadUrl, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Error al cargar el logo");
    }

    const data = await response.json();
    return data.LogoUrl;
}

export default function CreateOpportunity() {
    const [opportunity, setOpportunity] = useState({
        name: "",
        observation: "",
        type: "",
        description: "",
        requires: "",
        guide: "",
        adicional_dates: "",
        service_channels: "",
        manager: "",
        modality: "",
        categoryId: 0,
        institutionId: 0,
        institution: {
            name: "",
            logo: "",
            ubication: "",
            url_generalidades: "",
            url_oferta_academica: "",
            url_bienestar: "",
            url_admision: "",
        },
    });

    const [categories, setCategories] = useState([]);
    const [institutions, setInstitutions] = useState([]);

    const fetchData = async (url: string, options: RequestInit = {}) => {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const defaultOptions = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await fetch(url, { ...defaultOptions, ...options });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error("Fetch error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al comunicarse con el servidor.',
            });
            throw error;
        }
    };

    useEffect(() => {
        const fetchCategoriesAndInstitutions = async () => {
            try {
                const categoriesData = await fetchData(`${API_BASE_URL}/Categories`);
                setCategories(categoriesData);

                const institutionsData = await fetchData(`${API_BASE_URL}/Institutions`);
                setInstitutions(institutionsData);
            } catch (error) {
                console.error("Error cargando categorías e instituciones:", error);
            }
        };

        fetchCategoriesAndInstitutions();
    }, []);

    const handleChange = (e) => {
        const value = e.target.type === "number" ? parseInt(e.target.value, 10) : e.target.value;
        setOpportunity({ ...opportunity, [e.target.name]: value });
    };

    const handleSubmit = async () => {
        try {
            let logoUrl = opportunity.institution.logo;

            const logoFile = document.getElementById("institutionLogo").files[0];
            if (logoFile) {
                logoUrl = await uploadLogo(logoFile);
            }

            const institutionData = {
                name: opportunity.institution.name,
                logo: logoUrl,
                ubication: opportunity.institution.ubication,
                url_generalidades: opportunity.institution.url_generalidades,
                url_oferta_academica: opportunity.institution.url_oferta_academica,
                url_bienestar: opportunity.institution.url_bienestar,
                url_admision: opportunity.institution.url_admision,
            };

            const institutionResponse = await fetchData(`${API_BASE_URL}/Institutions`, {
                method: "POST",
                body: JSON.stringify(institutionData),
            });

            const opportunityData = {
                ...opportunity,
                institutionId: institutionResponse.id,
            };

            await fetchData(`${API_BASE_URL}/Opportunities`, {
                method: "POST",
                body: JSON.stringify(opportunityData),
            });

            Swal.fire({
                icon: 'success',
                title: 'Oportunidad creada',
                text: 'La oportunidad ha sido creada con éxito.',
            });

            setOpportunity({
                name: "",
                observation: "",
                type: "",
                description: "",
                requires: "",
                guide: "",
                adicional_dates: "",
                service_channels: "",
                manager: "",
                modality: "",
                categoryId: 0,
                institutionId: 0,
                institution: {
                    name: "",
                    logo: "",
                    ubication: "",
                    url_generalidades: "",
                    url_oferta_academica: "",
                    url_bienestar: "",
                    url_admision: "",
                },
            });
        } catch (error) {
            console.error("Error al crear la oportunidad:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo crear la oportunidad.',
            });
        }
    };
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-16">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Crear Nueva Oportunidad</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                    <label htmlFor="name" className="block text-gray-700 text-sm font-medium">Nombre</label>
                    <input id="name" type="text" name="name" className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="observation" className="block text-gray-700 text-sm font-medium">Observación</label>
                    <input id="observation" type="text" name="observation" className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="type" className="block text-gray-700 text-sm font-medium">Tipo</label>
                    <input id="type" type="text" name="type" className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="description" className="block text-gray-700 text-sm font-medium">Descripción</label>
                    <textarea id="description" name="description" className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500" onChange={handleChange}></textarea>
                </div>

                <div>
                    <label htmlFor="requires" className="block text-gray-700 text-sm font-medium">Requisitos</label>
                    <input id="requires" type="text" name="requires" className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="guide" className="block text-gray-700 text-sm font-medium">Guía</label>
                    <input id="guide" type="text" name="guide" className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="adicional_dates" className="block text-gray-700 text-sm font-medium">Fechas Adicionales</label>
                    <input id="adicional_dates" type="text" name="adicional_dates" className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="service_channels" className="block text-gray-700 text-sm font-medium">Canales de Servicio</label>
                    <input id="service_channels" type="text" name="service_channels" className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="manager" className="block text-gray-700 text-sm font-medium">Responsable</label>
                    <input id="manager" type="text" name="manager" className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="modality" className="block text-gray-700 text-sm font-medium">Modalidad</label>
                    <input id="modality" type="text" name="modality" className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                </div>

                {/* Selección de Categoría */}
                <div>
                    <label htmlFor="categoryId" className="block text-gray-700 text-sm font-medium">Categoría</label>
                    <select id="categoryId" name="categoryId" className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500" onChange={handleChange} value={opportunity.categoryId}>
                        <option value={0}>Seleccione una categoría</option>
                        {categories.map((category: any) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Selección de Institución */}
                <div>
                    <label htmlFor="institutionId" className="block text-gray-700 text-sm font-medium">Institución</label>
                    <select id="institutionId" name="institutionId" className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500" onChange={handleChange} value={opportunity.institutionId}>
                        <option value={0}>Seleccione una institución</option>
                        {institutions.map((institution: any) => (
                            <option key={institution.id} value={institution.id}>
                                {institution.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Campos de Institución */}
                <div>
                    <label htmlFor="institutionName" className="block text-gray-700 text-sm font-medium">Nombre de la Institución</label>
                    <input id="institutionName" type="text" name="institution.name" className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="institutionLogo" className="block text-gray-700 text-sm font-medium">Logo de la Institución</label>
                    <input
                        id="institutionLogo"
                        type="file"
                        className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                </div>



                <div>
                    <label htmlFor="institutionUbication" className="block text-gray-700 text-sm font-medium">Ubicación de la Institución</label>
                    <input id="institutionUbication" type="text" name="institution.ubication" className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="institutionUrlGeneralidades" className="block text-gray-700 text-sm font-medium">URL Generalidades</label>
                    <input id="institutionUrlGeneralidades" type="text" name="institution.url_generalidades" className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                </div>
            </div>

            <button className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 rounded-md shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500" onClick={handleSubmit}>
                Crear Oportunidad
            </button>
        </div>

    );
}
