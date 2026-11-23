import * as SecureStore from "expo-secure-store";



// Dirección de nuestra API
const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Token de la aplicación
const APP_TOKEN = process.env.EXPO_PUBLIC_API_APP_TOKEN;

// Obtener el token JWT del usuario
async function obtenerToken() {
    return await SecureStore.getItemAsync("user_jwt_token");
}

// Cliente HTTP genérico

export async function apiFetch(
    endpoint: string,
    options: RequestInit = {}
) {
    const token = await obtenerToken();

    const headers = {
        "Content-Type": "application/json",
        "x-api-token": APP_TOKEN || "",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    try {
        const respuesta = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
        });

        // Manejo de errores HTTP
        if (!respuesta.ok) {
            if (respuesta.status === 401) {
                await SecureStore.deleteItemAsync("user_jwt_token");
                throw new Error("Tu sesión ha expirado. Inicia sesión nuevamente.");
            }

            if (respuesta.status === 403) {
                throw new Error("No tienes permiso para realizar esta acción.");
            }

            if (respuesta.status === 404) {
                throw new Error("No se encontró la información solicitada.");
            }

            if (respuesta.status >= 500) {
                throw new Error("Error interno del servidor.");
            }

            throw new Error("Ocurrió un error en la solicitud.");
        }

        // Respuesta sin contenido
        if (respuesta.status === 204) {
            return null;
        }

        // Convertir respuesta a JSON
        return await respuesta.json();

    } catch (error) {
        if (error instanceof Error && error.message !== "Failed to fetch") {
            throw error;
        }

        throw new Error("No se pudo conectar con el servidor.");
    }
}
