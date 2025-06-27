// app/routes/test.tsx
import { useState, useEffect } from 'react';
import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useFetcher } from '@remix-run/react';
import { apiClient } from '../utils/api.client';
import { handleApiError, getErrorMessage } from '~/utils/error-handler';

// Loader para probar la conexión desde el servidor
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    console.log('Testing API connection from server...');
    const response = await apiClient.ping();
    return json({ 
      serverTest: { success: true, data: response },
      apiUrl: apiClient['baseUrl']
    });
  } catch (error) {
    console.error('Server-side API test failed:', error);
    return json({ 
      serverTest: { success: false, error: getErrorMessage(error) },
      apiUrl: apiClient['baseUrl']
    });
  }
}

export default function TestPage() {
  const { serverTest, apiUrl } = useLoaderData<typeof loader>();
  const [clientTest, setClientTest] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const fetcher = useFetcher();

  // Prueba desde el cliente
  const testClientConnection = async () => {
    setLoading(true);
    try {
      console.log('Testing API connection from client...');
      const response = await apiClient.ping();
      setClientTest({ success: true, data: response });
    } catch (error) {
      console.error('Client-side API test failed:', error);
      const apiError = handleApiError(error);
      setClientTest({ success: false, error: apiError.message, details: apiError });
    } finally {
      setLoading(false);
    }
  };

  const testHealth = async () => {
    try {
      const response = await apiClient.getHealth();
      alert(`Health Check: ${JSON.stringify(response, null, 2)}`);
    } catch (error) {
      alert(`Health Check Failed: ${getErrorMessage(error)}`);
    }
  };

  useEffect(() => {
    // Probar conexión automáticamente al cargar
    testClientConnection();
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Prueba de Integración Backend-Frontend</h1>
      
      {/* Información de configuración */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Configuración</h2>
        <p><strong>API URL:</strong> {apiUrl}</p>
        <p><strong>Entorno:</strong> {typeof window !== 'undefined' ? 'Cliente (Browser)' : 'Servidor (SSR)'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Prueba desde el servidor (SSR) */}
        <div className="bg-white border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Prueba desde Servidor (SSR)</h2>
          {serverTest.success ? (
            <div className="text-green-600">
              <p className="font-semibold">✅ Conexión exitosa</p>
              <pre className="bg-gray-100 p-2 rounded mt-2 text-sm overflow-auto">
                {serverTest && 'data' in serverTest ? JSON.stringify(serverTest.data, null, 2) : null}
              </pre>
            </div>
          ) : (
            <div className="text-red-600">
              <p className="font-semibold">❌ Error de conexión</p>
              <p className="text-sm mt-1">{serverTest && 'error' in serverTest ? serverTest.error : 'Error desconocido'}</p>
            </div>
          )}
        </div>

        {/* Prueba desde el cliente */}
        <div className="bg-white border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Prueba desde Cliente (Browser)</h2>
          {loading ? (
            <p>🔄 Probando conexión...</p>
          ) : clientTest ? (
            clientTest.success ? (
              <div className="text-green-600">
                <p className="font-semibold">✅ Conexión exitosa</p>
                <pre className="bg-gray-100 p-2 rounded mt-2 text-sm overflow-auto">
                  {JSON.stringify(clientTest.data, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="text-red-600">
                <p className="font-semibold">❌ Error de conexión</p>
                <p className="text-sm mt-1">{clientTest.error}</p>
                {clientTest.details && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm">Ver detalles</summary>
                    <pre className="bg-gray-100 p-2 rounded mt-1 text-xs overflow-auto">
                      {JSON.stringify(clientTest.details, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            )
          ) : (
            <p>Iniciando prueba...</p>
          )}
        </div>
      </div>

      {/* Botones de prueba */}
      <div className="mt-6 space-x-4">
        <button
          onClick={testClientConnection}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          🔄 Probar Conexión
        </button>
        
        <button
          onClick={testHealth}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          🏥 Health Check
        </button>
      </div>

      {/* Información de debugging */}
      <div className="mt-6 bg-gray-50 border rounded-lg p-4">
        <h3 className="font-semibold mb-2">Información de Debugging</h3>
        <ul className="text-sm space-y-1">
          <li><strong>User Agent:</strong> {typeof window !== 'undefined' ? window.navigator.userAgent : 'N/A'}</li>
        </ul>
      </div>
    </div>