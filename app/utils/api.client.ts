const API_BASE_URL = typeof window !== 'undefined' 
  ? import.meta.env.VITE_API_BASE_URL 
  : process.env.VITE_API_BASE_URL || 'api-antivirus-eagrg3h5ecf0c0gw.canadacentral-01.azurewebsites.net';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
}

export interface CreateProductoDto {
  nombre: string;
  precio: number;
  descripcion: string;
}

export class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
    console.log('API Client initialized with base URL:', this.baseUrl);
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
      mode: 'cors',
      ...options,
    };

    console.log(`Making ${config.method || 'GET'} request to:`, url);
    console.log('Request config:', config);

    try {
      const response = await fetch(url, config);
      
      console.log('Response status:', response.status);
      console.log('Response headers:', [...response.headers.entries()]);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Métodos HTTP básicos
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T, D = unknown>(endpoint: string, data: D): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T, D = unknown>(endpoint: string, data: D): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Métodos específicos para la API
  async ping(): Promise<ApiResponse<string>> {
    return this.get<ApiResponse<string>>('/api/test/ping');
  }

  async getHealth(): Promise<ApiResponse<string>> {
    return this.get<ApiResponse<string>>('/api/test/health');
  }

  async getProductos(): Promise<{ data: Producto[]; total: number }> {
    return this.get('/api/productos');
  }

  async getProducto(id: number): Promise<Producto> {
    return this.get(`/api/productos/${id}`);
  }

  async createProducto(producto: CreateProductoDto): Promise<Producto> {
    return this.post('/api/productos', producto);
  }

  async updateProducto(id: number, producto: CreateProductoDto): Promise<Producto> {
    return this.put(`/api/productos/${id}`, producto);
  }

  async deleteProducto(id: number): Promise<void> {
    return this.delete(`/api/productos/${id}`);
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.ping();
      return true;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
}

// Instancia singleton del cliente
export const apiClient = new ApiClient();

// Hook personalizado para usar en componentes
export function useApi() {
  return {
    client: apiClient,
    baseUrl: API_BASE_URL,
  };
}