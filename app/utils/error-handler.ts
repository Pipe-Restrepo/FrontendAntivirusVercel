// app/utils/error-handler.ts

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
}

export class AppError extends Error {
  public status: number;
  public code: string;
  public details: unknown;

  constructor(message: string, status = 500, code = 'UNKNOWN_ERROR', details?: unknown) {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function handleApiError(error: unknown): ApiError {
  console.error('Handling API error:', error);

  // Error de red o conexión
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return {
      message: 'Error de conexión. Verifica tu conexión a internet y que el servidor esté disponible.',
      status: 0,
      code: 'NETWORK_ERROR',
      details: error.message
    };
  }

  // Error HTTP
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string' &&
    (error as Record<string, unknown>).message &&
    typeof (error as Record<string, unknown>).message === 'string' &&
    ((error as Record<string, unknown>).message as string).includes('HTTP')
  ) {
    const errMsg = (error as Record<string, unknown>).message as string;
    const statusMatch = errMsg.match(/HTTP (\d+)/);
    const status = statusMatch ? parseInt(statusMatch[1]) : 500;
    
    let message = 'Error del servidor';
    let code = 'SERVER_ERROR';

    switch (status) {
      case 400:
        message = 'Solicitud inválida. Verifica los datos enviados.';
        code = 'BAD_REQUEST';
        break;
      case 401:
        message = 'No autorizado. Necesitas iniciar sesión.';
        code = 'UNAUTHORIZED';
        break;
      case 403:
        message = 'Acceso denegado. No tienes permisos para esta acción.';
        code = 'FORBIDDEN';
        break;
      case 404:
        message = 'Recurso no encontrado.';
        code = 'NOT_FOUND';
        break;
      case 422:
        message = 'Datos de entrada inválidos.';
        code = 'VALIDATION_ERROR';
        break;
      case 500:
        message = 'Error interno del servidor.';
        code = 'INTERNAL_SERVER_ERROR';
        break;
    }

    return {
      message,
      status,
      code,
      details: errMsg
    };
  }

  // Error CORS
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string' &&
    ((error as Record<string, unknown>).message as string).includes('CORS')
  ) {
    return {
      message: 'Error de CORS. El servidor no permite solicitudes desde este dominio.',
      status: 0,
      code: 'CORS_ERROR',
      details: (error as Record<string, unknown>).message
    };
  }

  // Error genérico
  return {
    message: typeof error === 'object' && error !== null && 'message' in error && typeof (error as Record<string, unknown>).message === 'string'
      ? (error as Record<string, unknown>).message as string
      : 'Ha ocurrido un error inesperado',
    status: 500,
    code: 'UNKNOWN_ERROR',
    details: error
  };
}

export function getErrorMessage(error: unknown): string {
  const apiError = handleApiError(error);
  return apiError.message;
}

export function isNetworkError(error: unknown): boolean {
  const apiError = handleApiError(error);
  return apiError.code === 'NETWORK_ERROR' || apiError.status === 0;
}

export function shouldRetry(error: unknown): boolean {
  const apiError = handleApiError(error);
  return isNetworkError(error) || apiError.status === 500 || apiError.status === 502 || apiError.status === 503;
}